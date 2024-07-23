const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/images",express.static(__dirname+"/upload"));

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

var multer = require('multer');

//DentistID	UserID	FirstName	LastName	Specialty	PhoneNumber	Email	Gender	ProfileImage	Qualifications	
app.get('/dentist', (req, res) => {
    const query = 'SELECT * FROM dentists';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Server error');
      } else {
        res.status(200).json(results);
      }
    });
  });


app.get('/dentist/:DentistID', (req, res) => {
    const { DentistID } = req.params;
    const query = 'SELECT * FROM dentists WHERE DentistID = ?';
    connection.query(query, [DentistID], (err, results) => {
      if (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Server error');
      } else if (results.length === 0) {
        res.status(404).send('dentist not found');
      } else {
        res.status(200).json(results[0]);
      }
    });
});


app.delete('/dentist/:DentistID', (req, res) => {
    const { DentistID } = req.params;
    const query = 'DELETE FROM dentists WHERE DentistID = ?';
    connection.query(query, [DentistID], (err, results) => {
      if (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Server error');
      } else if (results.affectedRows === 0) {
        res.status(404).send('dentist not found');
      } else {
        res.status(200).send('dentist deleted');
      }
    });
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      console.log(file);
     // cb(null, file.fieldname + '-' + Date.now())
     cb(null, file.originalname)
    }
  })

var upload = multer({ storage: storage })

app.post('/dentist', upload.single('ProfileImage'), (req, res, next) => {
    var file = req.file;
    if (!file) {
        var error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    console.log(req.body);
    const { DentistID, FirstName, LastName, Password, Specialty, PhoneNumber, Email, Gender, Qualifications } = req.body;
    const ProfileImage = req.file.filename;
    const username = FirstName + " " + LastName;
    const Role = "Dentist";

    // First query to insert into users table
    const query1 = 'INSERT INTO users (UserID, username, Password, Role) VALUES (0, ?, ?, ?)';
    connection.query(query1, [username, Password, Role], (err, result) => {
        if (err) {
            console.error("Error while inserting into users:", err);
            return res.status(500).send('Server error');
        }

        // Extract the insertId from the result
        const uid = result.insertId;

        // Second query to insert into dentists table
        const query2 = 'INSERT INTO dentists (DentistID, UserID, FirstName, LastName, Specialty, PhoneNumber, Email, Gender, ProfileImage, Qualifications) VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(query2, [uid, FirstName, LastName, Specialty, PhoneNumber, Email, Gender, ProfileImage, Qualifications], (err, result) => {
            if (err) {
                console.error("Error while inserting into dentists:", err);
                return res.status(500).send('Server error');
            }

            // Successful insertion into both tables
            res.status(201).send('Dentist created');
        });
    });
});


  //http://localhost:8000/productupdate
  app.post('/dentistUpdate', upload.single('ProfileImage'), (req, res, next) => {
    //console.log("hello"+id);
   // const { id } = req.params;
    const { DentistID, FirstName, LastName, Specialty, PhoneNumber, Email, Gender, Qualifications} = req.body;
    const ProfileImage = req.file ? req.file.filename : null;

    // Fetch existing product details
    const fetchQuery = 'SELECT * FROM dentists WHERE DentistID = ?';
    connection.query(fetchQuery, [DentistID], (err, results) => {
        if (err) {
            console.error('Error fetching dentist details', err);
            res.status(500).send('Server error');
            return;
        }
        
        if (results.length === 0) {
            res.status(404).send('Dentist not found');
            return;
        }

        const existingdentist = results[0];

        // Use existing values if new values are not provided
        //const updatedUserID = UserID || existingdentist.UserID;
        const updatedFirstName = FirstName || existingdentist.FirstName;
        const updatedLastName = LastName || existingdentist.LastName;
        const updatedSpecialty = Specialty || existingdentist.Specialty;
        const updatedPhoneNumber = PhoneNumber || existingdentist.PhoneNumber;
        const updatedEmail = Email || existingdentist.Email;
        const updatedProfileImage = ProfileImage || existingdentist.ProfileImage;
        const updatedGender = Gender || existingdentist.Gender;
        const updatedQualifications = Qualifications || existingdentist.Qualifications;
        

        // Update product details
        const updateQuery = 'UPDATE dentists SET  FirstName = ?, LastName = ?, Specialty = ?,  PhoneNumber = ?, Email = ?, ProfileImage = ?, Gender = ?, Qualifications = ? WHERE DentistID = ?';
        connection.query(updateQuery, [updatedFirstName, updatedLastName, updatedSpecialty, updatedPhoneNumber, updatedEmail, updatedProfileImage, updatedGender,  updatedQualifications, DentistID], (err, result) => {
            
          console.log(updateQuery);
          console.log(updatedFirstName+" " +updatedLastName +" " + updatedSpecialty);
          
          if (err) {
                console.error('Error while updating', err);
                res.status(500).send('Server error');
                return;
            }
            
            if (result.affectedRows === 0) {
                res.status(404).send('dentist not found');
            } else {
                res.status(200).send('dentist updated successfully');
            }
        });
    });
});

app.post('/charge', upload.single('ServiceImage'), (req, res, next) => {
  var file = req.file;
  if (!file) {
      var error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
  }
  console.log(req.body);
  const { chargeName, Cost, Description } = req.body;
  const ServiceImage = req.file.filename;
      const query2 = 'INSERT INTO charges (chargeID, chargeName, Cost,Description, ServiceImage) VALUES (0, ?, ?, ?, ?)';
      connection.query(query2, [chargeName, Cost, Description , ServiceImage], (err, result) => {
          if (err) {
              console.error("Error while inserting into service:", err);
              return res.status(500).send('Server error');
          }

          // Successful insertion into both tables
          res.status(201).send('Service created');
      });
});

app.get('/charge', (req,res) => {
  const query = 'select * from charges';
  connection.query(query, (err,result) => {
      if(err) {
          console.error('error while fetching', err);
          res.status(500).send('server error');
      }
      else
      {
          res.status(200).json(result);
      }
  });
});

app.get('/charge/:id', (req,res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM charges WHERE chargeID = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('error while fetching', err);
      res.status(500).send('server error');
    } else if (result.length === 0) {
      res.status(404).send('Charge not found');
    } else {
      res.status(200).json(result[0]); // Return the first element of the array
    }
  });
});


app.post('/chargeUpdate', upload.single('ServiceImage'), (req, res, next) => {
  const { chargeID, chargeName, Cost, Description } = req.body;
  const ServiceImage = req.file ? req.file.filename : null;

  // Ensure chargeID is provided
  if (!chargeID) {
    res.status(400).send({ message: 'chargeID is required' });
    return;
  }

  // Fetch existing product details
  const fetchQuery = 'SELECT * FROM charges WHERE chargeID = ?';
  connection.query(fetchQuery, [chargeID], (err, results) => {
    if (err) {
      console.error('Error fetching service details', err);
      res.status(500).send({ message: 'Server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).send({ message: 'Service not found' });
      return;
    }

    const existingService = results[0];

    // Use existing values if new values are not provided
    const updatedchargeName = chargeName || existingService.chargeName;
    const updatedCost = Cost || existingService.Cost;
    const updatedDescription = Description || existingService.Description;
    const updatedServiceImage = ServiceImage || existingService.ServiceImage;

    // Update service details
    const updateQuery = 'UPDATE charges SET chargeName = ?, Cost = ?, ServiceImage = ?, Description = ? WHERE chargeID = ?';
    connection.query(updateQuery, [updatedchargeName, updatedCost, updatedServiceImage, updatedDescription, chargeID], (err, result) => {
      console.log(updateQuery);
      console.log(updatedchargeName + " " + updatedCost + " " + chargeID);

      if (err) {
        console.error('Error while updating', err);
        res.status(500).send({ message: 'Server error' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).send({ message: 'Service not found' });
      } else {
        res.status(200).send({ message: 'Service updated successfully' });
      }
    });
  });
});


app.delete('/charge/:id', (req,res) => {
  const {id} = req.params;
  const query = 'delete from charges where chargeID = ?';
  connection.query(query, [id] , (err,result) => {
      if(err) {
          console.error('error while deleting', err);
          res.status(500).send('server error');
      }
      else if(result.affectedRows === 0)
      {
          res.status(404).send('Charge not found');
      }
      else
      {
          res.status(201).send('deleted');
      }
  });
});

//ScheduleID	DentistID	DayOfWeek	StartTime	EndTime
app.post('/schedules', (req, res) => {
  //console.log(req.body.ScheduleID);
  const {DentistID, DayOfWeek, StartTime, EndTime} = req.body;
  console.log(req.body.DentistID + " " + req.body.DayOfWeek + " " + req.body.StartTime + " " + req.body.EndTime);
  const query = 'INSERT INTO schedules (ScheduleID, DentistID, DayOfWeek, StartTime,EndTime) VALUES (0,?,?,?,?)';
  console.log("created");
  connection.query(query,[DentistID, DayOfWeek, StartTime,EndTime], (err, result) => {
      if(err) {
          console.error("error while fetching:",err);
          res.status(500).send('server.error');
      } else {
          res.status(201).send('schedule created');
      }
  });
});



app.get('/schedules', (req, res) => {
  const query = 'SELECT s.ScheduleID,s.DayOfWeek,s.StartTime,s.EndTime,d.FirstName,d.LastName FROM schedules s, dentists d where s.DentistID = d.DentistID';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching schedules:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
});


app.get('/schedules/:ScheduleID', (req, res) => {
  const { ScheduleID } = req.params;
  const query = 'SELECT * FROM schedules WHERE ScheduleID = ?';
  connection.query(query, [ScheduleID], (err, results) => {
    if (err) {
      console.error('Error fetching schedules:', err);
      res.status(500).send('Server error');
    } else if (results.length === 0) {
      res.status(404).send('user not found');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

app.get('/doctorSchedule/:DentistID', (req, res) => {
  const { DentistID } = req.params;
  const query = 'SELECT * FROM schedules WHERE DentistID = ?';
  connection.query(query, [DentistID], (err, results) => {
    if (err) {
      console.error('Error fetching schedules:', err);
      res.status(500).send('Server error');
    } else if (results.length === 0) {
      res.status(404).send('Schedule not found');
    } else {
      res.status(200).json(results);
    }
  });
});


app.delete('/schedules/:ScheduleID', (req, res) => {
  const { ScheduleID } = req.params;
  const query = 'DELETE FROM schedules WHERE ScheduleID = ?';
  connection.query(query, [ScheduleID], (err, results) => {
    if (err) {
      console.error('Error deleting item:', err);
      res.status(500).send('Server error');
    } else if (results.affectedRows === 0) {
      res.status(404).send('item not found');
    } else {
      res.status(200).send('item deleted');
    }
  });
});

app.put('/schedules/:id', (req, res) => {
  const { id } = req.params;
  const { DentistID, DayOfWeek, StartTime, EndTime } = req.body;
  const query = 'UPDATE schedules SET DentistID = ?, DayOfWeek = ?, StartTime = ?, EndTime = ? WHERE ScheduleID = ?';
  connection.query(query, [DentistID, DayOfWeek, StartTime, EndTime, id], (err, result) => {
    if (err) {
      console.error('Error while updating', err);
      res.status(500).send('Server error');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Schedule not found');
    } else {
      res.status(201).send('Updated');
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error while fetching', err);
      res.status(500).send('Server error');
    } else if (result.length === 0) {
      res.status(404).send('Invalid username and password');
    } else {
      const user = result[0];
      console.log(user.Role);
      res.status(200).json({ message: 'Welcome', Role: user.Role, UserID: user.UserID });
    }
  });
});


app.post('/appointment', (req, res) => {
  console.log('Received appointment data:', req.body);
  const { FirstName, LastName, Password, DateOfBirth, Gender, Address, PhoneNumber, Email, EmergencyContact, DentistID, AppointmentDate, StartTime, EndTime, ProblemDescription, Notes, chargeID } = req.body;
  const username = `${FirstName} ${LastName}`;
  const uRole = "Patient";
  const Status = "pending";

  console.log(uRole);

  // First query to insert into users table
  const query1 = 'INSERT INTO users (UserID, username, Password, Role) VALUES (0, ?, ?, ?)';
  connection.query(query1, [username, Password, uRole], (err, result) => {
    if (err) {
      console.error("Error while inserting into users:", err);
      if (!res.headersSent) {
        return res.status(500).send('Server error');
      }
    }

    // Extract the insertId from the result
    const uid = result.insertId;

    // Second query to insert into patients table
    const query2 = 'INSERT INTO patients (PatientID, UserID, FirstName, LastName, DateOfBirth, Gender, Address, PhoneNumber, Email, EmergencyContact) VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query2, [uid, FirstName, LastName, DateOfBirth, Gender, Address, PhoneNumber, Email, EmergencyContact], (err, result) => {
      if (err) {
        console.error("Error while inserting into patients:", err);
        if (!res.headersSent) {
          return res.status(500).send('Server error');
        }
      }

      const pid = result.insertId;

      // Third query to insert into appointments table
      const query3 = 'INSERT INTO appointments (AppointmentID, PatientID, DentistID, chargeID, AppointmentDate, StartTime, EndTime, Status, ProblemDescription, Notes) VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(query3, [pid, DentistID, chargeID, AppointmentDate, StartTime, EndTime, Status, ProblemDescription, Notes], (err, result) => {
        if (err) {
          console.error("Error while inserting into appointments:", err);
          if (!res.headersSent) {
            return res.status(500).send('Server error');
          }
        }

        if (!res.headersSent) {
          return res.status(201).send('Appointment succeeded');
        }
      });
    });
  });
});

app.get('/appointments', (req, res) => {
  const query = 'SELECT p.FirstName AS PatientFirstName, p.LastName AS PatientLastName, d.FirstName AS DentistFirstName, d.LastName AS DentistLastName, c.chargeName,a.AppointmentID, a.AppointmentDate, a.StartTime, a.EndTime, a.Status, a.ProblemDescription, a.Notes FROM appointments a JOIN patients p ON a.PatientID = p.PatientID JOIN dentists d ON a.DentistID = d.DentistID JOIN charges c ON a.chargeID = c.chargeID;';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching schedules:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/appointments/:dentistID', (req, res) => {
  const dentistID = parseInt(req.params.dentistID, 10);
  const query = 'SELECT p.FirstName AS PatientFirstName, p.LastName AS PatientLastName, d.FirstName AS DentistFirstName, d.LastName AS DentistLastName, c.chargeName,a.AppointmentID, a.AppointmentDate, a.StartTime, a.EndTime, a.Status, a.ProblemDescription, a.Notes FROM appointments a JOIN patients p ON a.PatientID = p.PatientID JOIN dentists d ON a.DentistID = d.DentistID JOIN charges c ON a.chargeID = c.chargeID WHERE a.DentistID = ? AND a.Status = "pending"';
  connection.query(query, [dentistID], (error, results) => {
      if (error) {
          res.status(500).json({ message: 'Error fetching appointments', error });
      } else if (results.length > 0) {
          res.status(200).json(results);
      } else {
          res.status(404).json({ message: 'No appointments found for this dentist' });
      }
  });
});

app.put('/appointment/:id/cancel', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query = 'UPDATE appointments SET Status = "Cancelled" WHERE AppointmentID = ?';
  connection.query(query, [id], (err, result) => {
      if (err) {
          console.error('Error updating status:', err);
          return res.status(500).send('Server error');
      }
      res.status(200).send('Appointment Cancelled successfully');
  });
});


app.put('/appointment/:id/done', (req, res) => {
  const { id } = req.params;

  const query = 'UPDATE appointments SET Status = "done" WHERE AppointmentID = ?';
  connection.query(query, [id], (err, result) => {
      if (err) {
          console.error('Error updating status:', err);
          return res.status(500).send('Server error');
      }
      res.status(200).send('Appointment marked as done successfully');
  });
});

app.get('/totalappointemntcount', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM appointments';
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error fetching total appointments count:', error);
          res.status(500).json({ error: 'Error fetching data' });
          return;
      }
      res.json(results[0]); // Assuming there's only one row returned
  });
});

app.get('/appointmentstoday/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT p.FirstName AS PatientFirstName, p.LastName AS PatientLastName, d.FirstName AS DentistFirstName, 
           d.LastName AS DentistLastName, c.chargeName,a.AppointmentID, a.AppointmentDate, a.StartTime, a.EndTime, 
           a.Status, a.ProblemDescription, a.Notes 
    FROM appointments a 
    JOIN patients p ON a.PatientID = p.PatientID 
    JOIN dentists d ON a.DentistID = d.DentistID 
    JOIN charges c ON a.chargeID = c.chargeID 
    WHERE DATE(a.AppointmentDate) = ?;
  `;
  connection.query(query, [today], (err, results) => {
    if (err) {
      console.error('Error fetching today\'s appointments:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
});



// GET today's appointments count
app.get('/appointments/today/count', (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Today's date in 'YYYY-MM-DD' format
  const query = `SELECT COUNT(*) AS count FROM appointments WHERE DATE(AppointmentDate) = '${today}'`;
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error fetching today\'s appointments count:', error);
          res.status(500).json({ error: 'Error fetching data' });
          return;
      }
      res.json(results[0]); // Assuming there's only one row returned
  });
});


app.get('/appointments/dentist/:userID', (req, res) => {
  const userID = req.params.userID;
  const query = `
    SELECT 
      a.AppointmentID, 
      p.FirstName, 
      p.LastName, 
      a.AppointmentDate, 
      a.StartTime, 
      a.EndTime, 
      a.Status, 
      a.ProblemDescription, 
      a.Notes, 
      c.chargeName,
      c.Cost
    FROM 
      dentists d
    JOIN 
      appointments a ON a.DentistID = d.DentistID
    JOIN 
      patients p ON a.PatientID = p.PatientID
    JOIN 
      charges c ON a.chargeID = c.chargeID
    WHERE 
      d.UserID = ? AND a.Status = "pending"
  `;
  connection.query(query, [userID], (error, results) => {
    if (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Error fetching appointments', error });
      return;
    }
    res.json(results);
  });
});

app.post('/treatments', (req, res) => {
  const { AppointmentID, TreatmentName, Description, Cost, Duration } = req.body;

  // Insert treatment into database
  const sql = 'INSERT INTO treatments (TreatmentID, AppointmentID, TreatmentName, Description, Cost, Duration) VALUES (0, ?, ?, ?, ?, ?)';
  connection.query(sql, [AppointmentID, TreatmentName, Description, Cost, Duration], (err, result) => {
    if (err) {
      console.error('Error inserting treatment:', err);
      res.status(500).json({ error: 'Error inserting treatment' });
    } else {
      console.log('Treatment inserted successfully');
      res.status(200).json({ message: 'Treatment inserted successfully', treatmentId: result.insertId });
    }
  });
});

app.get('/patient-history/:userID', async (req, res) => {
  const userID = req.params.userID;

  const query = `
    SELECT 
      CONCAT(p.FirstName, ' ', p.LastName) AS PatientName,
      t.TreatmentName,
      t.Description,
      t.Cost,
      t.Duration
    FROM 
      treatments t
    JOIN 
      appointments a ON t.AppointmentID = a.AppointmentID
    JOIN 
      patients p ON a.PatientID = p.PatientID
    JOIN 
      dentists d ON a.DentistID = d.DentistID
    WHERE 
      d.UserID = ? AND a.Status = "done";
  `;

  connection.query(query, [userID], (error, results) => {
    if (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Error fetching appointments', error });
      return;
    }
    res.json(results);
  });
});

app.get('/appointments/user/:userID', (req, res) => {
  const userID = req.params.userID;
  const query = `
      SELECT 
          a.AppointmentID, 
          p.FirstName, 
          p.LastName, 
          a.AppointmentDate, 
          a.StartTime, 
          a.EndTime, 
          a.Status, 
          a.ProblemDescription, 
          a.Notes, 
          c.chargeName,
          c.Cost
      FROM 
          appointments a
      JOIN 
          patients p ON a.PatientID = p.PatientID
      JOIN 
          charges c ON a.chargeID = c.chargeID
      WHERE 
          p.UserID = ?
  `;
  connection.query(query, [userID], (error, results) => {
      if (error) {
          console.error('Error fetching appointments:', error);
          res.status(500).json({ message: 'Error fetching appointments', error });
          return;
      }
      res.json(results);
  });
});

app.put('/appointments/cancel/:appointmentId', (req, res) => {
  const appointmentId = req.params.appointmentId;
  const query = 'UPDATE appointments SET Status = "Cancelled" WHERE AppointmentID = ?';
  
  connection.query(query, [appointmentId], (error, results) => {
      if (error) {
          console.error('Error updating appointment status:', error);
          res.status(500).json({ message: 'Error updating appointment status', error });
          return;
      }
      res.json({ message: 'Appointment cancelled successfully' });
  });
});


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});