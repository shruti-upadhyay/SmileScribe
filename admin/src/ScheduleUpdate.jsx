import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { useLocation, useNavigate } from 'react-router-dom';

const ScheduleUpdate = () => {
  const { pathname } = useLocation();
  const id = pathname.replace("/ScheduleUpdate/", "");
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  const [data, setData] = useState({
    DentistID: "",
    DayOfWeek: "",
    StartTime: "",
    EndTime: ""
  });

  const [dentist, setDentist] = useState([]);

  // Fetch schedule data by ID
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/schedules/${id}`);
      const record = response.data;
      if (record) {
        setData(record);
      } else {
        console.error("No record found!");
        alert("No record found!");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data!", error);
      alert("Error fetching data!");
      setLoading(false);
    }
  };

  // Fetch list of dentists
  const getDentist = async () => {
    try {
      const response = await axios.get("http://localhost:8000/dentist");
      const record = response.data;
      if (Array.isArray(record)) {
        setDentist(record);
        console.log(record);
      }
    } catch (error) {
      console.error("Error fetching dentist data!", error);
    }
  };

  useEffect(() => {
    getData();
    getDentist();
  }, []);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((values) => ({
      ...values,
      [name]: value
    }));
  };

  // Submit updated schedule data
  const submitStateRecord = async (event) => {
    event.preventDefault();
    if (!data.DentistID || !data.DayOfWeek || !data.StartTime || !data.EndTime) {
      alert('Please fill out all required fields.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8000/schedules/${id}`, {
        DentistID: data.DentistID,
        DayOfWeek: data.DayOfWeek,
        StartTime: data.StartTime,
        EndTime: data.EndTime
      });
      console.log(response); // Log the response from the backend
      if (response.status === 200 || response.status === 201) {
        alert('Schedule updated successfully');
        Navigate('/ScheduleShow');
      } else {
        alert('Failed to update the schedule');
      }
    } catch (error) {
      console.error("Error updating schedule!", error);
      alert("Error updating schedule!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper">
      <AdminHeader/>
      <br />
      <div className="content-wrapper">
        <div className="col-md-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">SCHEDULE FORM</h3>
            </div>
            <form encType="multipart/form-data" onSubmit={submitStateRecord}>
              <div>
                <label>Dentist Name :</label>
                <select value={data.DentistID} name="DentistID" id="DentistID" onChange={handleChange} className="form-control">
                  <option value="">select dentist</option>
                  {dentist.map((dent, index) => (
                    <option key={index} value={dent.DentistID}>{dent.FirstName + " " + dent.LastName}</option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label>Day :</label>
                <select value={data.DayOfWeek} name="DayOfWeek" id="DayOfWeek" onChange={handleChange} className="form-control">
                  <option value="">Select Day</option>
                  <option value="Monday">Monday </option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday </option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="form-group">
                <label>Start Time: </label>
                <input type="time" name="StartTime" id="StartTime" className="form-control" value={data.StartTime} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>End Time: </label>
                <input type="time" name="EndTime" id="EndTime" className="form-control" value={data.EndTime} onChange={handleChange} />
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleUpdate;
