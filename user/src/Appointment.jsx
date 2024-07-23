import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';
import './Appointment.css';

const Appointment = () => {
  const { dentistID, chargeID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [appointmentData, setAppointmentData] = useState({
    FirstName: '',
    LastName: '',
    Password: '',
    DateOfBirth: '',
    Gender: '',
    Address: '',
    PhoneNumber: '',
    Email: '',
    EmergencyContact: '',
    DentistID: dentistID || '',
    AppointmentDate: '',
    StartTime: '',
    EndTime: '',
    ProblemDescription: '',
    Notes: '',
    chargeID: chargeID || '',
  });

  const [dentists, setDentists] = useState([]);
  const [charges, setCharges] = useState([]);
  const [filteredDentists, setFilteredDentists] = useState([]);
  const [filteredCharges, setFilteredCharges] = useState([]);

  useEffect(() => {
    const fetchDentistsAndCharges = async () => {
      try {
        const dentistResponse = await axios.get('http://localhost:8000/dentist');
        const chargeResponse = await axios.get('http://localhost:8000/charge');
        setDentists(dentistResponse.data);
        setCharges(chargeResponse.data);

        if (location.pathname.includes('/appointment/charge/')) {
          const filteredCharge = chargeResponse.data.find(charge => charge.chargeID === parseInt(chargeID));
          setFilteredCharges(filteredCharge ? [filteredCharge] : []);
          setAppointmentData(prevData => ({
            ...prevData,
            chargeID: filteredCharge ? filteredCharge.chargeID.toString() : '',
          }));
          setFilteredDentists(dentistResponse.data);
        } else if (location.pathname.includes('/appointment/')) {
          const filteredDentist = dentistResponse.data.find(dentist => dentist.DentistID === parseInt(dentistID));
          setFilteredDentists(filteredDentist ? [filteredDentist] : []);
          setAppointmentData(prevData => ({
            ...prevData,
            DentistID: filteredDentist ? filteredDentist.DentistID.toString() : '',
          }));
          setFilteredCharges(chargeResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchDentistsAndCharges();
  }, [dentistID, chargeID, location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/appointment', appointmentData);
      console.log('Appointment created:', response.data);
      alert("Appointment Succeed");
      navigate('/');
      // navigate('/success'); // Example: navigating to a success page
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const validateForm = () => {
    const {
      FirstName,
      LastName,
      Password,
      DateOfBirth,
      Gender,
      Address,
      PhoneNumber,
      Email,
      EmergencyContact,
      DentistID,
      chargeID,
      AppointmentDate,
      StartTime,
      EndTime,
      ProblemDescription,
    } = appointmentData;

    if (!FirstName || !LastName || !Password || !DateOfBirth || !Gender || !Address || !PhoneNumber || !Email || !EmergencyContact || !DentistID || !chargeID || !AppointmentDate || !StartTime || !EndTime || !ProblemDescription) {
      alert('Please fill out all fields.');
      return false;
    }

    // Additional validation as needed (e.g., email format, phone number format)

    return true;
  };

  //const today = new Date().toISOString().split('T')[0];

  const today = new Date();
  today.setDate(today.getDate() + 1); // Set to tomorrow's date to ensure today isn't selectable

  const formattedToday = today.toISOString().split('T')[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1); // Set to yesterday's date

  const formattedYesterday = yesterday.toISOString().split('T')[0]; // Get yesterday's date in YYYY-MM-DD format

  const isValidTime = (time) => {
    const startTime = '10:00';
    const endTime = '18:00';
    return time >= startTime && time <= endTime;
  };

  return (
    <div>
      <UserHeader />
      <section className="ftco-section contact-section ftco-degree-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-12 mb-4">
                    <h2 className="h4">Appointment Form</h2>
                  </div>
                  <div className="w-100"></div>
                  <div className="col-md-12">
                    <label htmlFor="FirstName" className="form-label">First Name:</label>
                    <input type="text" name="FirstName" id="FirstName" className="form-control" value={appointmentData.FirstName} onChange={handleChange} required />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="LastName" className="form-label">Last Name:</label>
                    <input type="text" name="LastName" id="LastName" className="form-control" value={appointmentData.LastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="Password" className="form-label">Password:</label>
                    <input type="password" name="Password" id="Password" className="form-control" value={appointmentData.Password} onChange={handleChange} required />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="DateOfBirth" className="form-label">Date of Birth:</label>
                    <input type="date" name="DateOfBirth" id="DateOfBirth" className="form-control" value={appointmentData.DateOfBirth} onChange={handleChange} max={formattedYesterday} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Gender:</label>
                    <div className="form-check">
                      <input type="radio" name="Gender" id="GenderMale" value="male" className="form-check-input" checked={appointmentData.Gender === 'male'} onChange={handleChange} />
                      <label className="form-check-label" htmlFor="GenderMale">Male</label>
                    </div>
                    <div className="form-check">
                      <input type="radio" name="Gender" id="GenderFemale" value="female" className="form-check-input" checked={appointmentData.Gender === 'female'} onChange={handleChange} />
                      <label className="form-check-label" htmlFor="GenderFemale">Female</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="Address" className="form-label">Address:</label>
                    <input type="text" name="Address" id="Address" className="form-control" value={appointmentData.Address} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="PhoneNumber" className="form-label">Phone Number:</label>
                    <input type="text" name="PhoneNumber" id="PhoneNumber" className="form-control" value={appointmentData.PhoneNumber} onChange={handleChange} required />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="Email" className="form-label">Email:</label>
                    <input type="email" name="Email" id="Email" className="form-control" value={appointmentData.Email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="EmergencyContact" className="form-label">Emergency Contact:</label>
                    <input type="text" name="EmergencyContact" id="EmergencyContact" className="form-control" value={appointmentData.EmergencyContact} onChange={handleChange} required />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="DentistID" className="form-label">Dentist:</label>
                    <select name="DentistID" id="DentistID" className="form-control" value={appointmentData.DentistID} onChange={handleChange} required>
                      <option value="">Select Dentist</option>
                      {dentists.map((dentist) => (
                        <option key={dentist.DentistID} value={dentist.DentistID}>
                          {dentist.FirstName} {dentist.LastName} - {dentist.Specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="chargeID" className="form-label">Service:</label>
                    <select name="chargeID" id="chargeID" className="form-control" value={appointmentData.chargeID} onChange={handleChange} required>
                      <option value="">Select Service</option>
                      {charges.map((charge) => (
                        <option key={charge.chargeID} value={charge.chargeID}>
                          {charge.chargeName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="AppointmentDate" className="form-label">Appointment Date:</label>
                    <input type="date" name="AppointmentDate" id="AppointmentDate" className="form-control" value={appointmentData.AppointmentDate} onChange={handleChange} min={formattedToday} required />
                  </div>
                </div>
                <div className="row mb-3">
                <div className="col-md-6">
            <label htmlFor="StartTime" className="form-label">Start Time:</label>
            <input
              type="time"
              name="StartTime"
              id="StartTime"
              className="form-control"
              value={appointmentData.StartTime}
              onChange={handleChange}
              required
              // Disable times outside allowed range
              min="10:00"
              max="18:00"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="EndTime" className="form-label">End Time:</label>
            <input
              type="time"
              name="EndTime"
              id="EndTime"
              className="form-control"
              value={appointmentData.EndTime}
              onChange={handleChange}
              required
              // Disable times outside allowed range
              min="10:00"
              max="18:00"
            />
          </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="ProblemDescription" className="form-label">Problem Description:</label>
                    <textarea name="ProblemDescription" id="ProblemDescription" className="form-control" value={appointmentData.ProblemDescription} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="Notes" className="form-label">Notes:</label>
                    <textarea name="Notes" id="Notes" className="form-control" value={appointmentData.Notes} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">Submit Appointment</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4">
  <div className="sidebar">
    <h3 className="sidebar-title">About Us</h3>

    {/* Combined Additional Information and Why Choose Us */}
    <div className="additional-info-why-choose">
      {/* Carousel with Dental Care Images */}
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/image_1.jpg" className="d-block w-100" alt="Dental Care Image 1" />
          </div>
          <div className="carousel-item">
            <img src="/images/image_2.jpg" className="d-block w-100" alt="Dental Care Image 2" />
          </div>
          <div className="carousel-item">
            <img src="/images/image_3.jpg" className="d-block w-100" alt="Dental Care Image 3" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      {/* Why Choose Us Section with Animated Bullets */}
<div className="why-choose-us">
  <h4 className="sidebar-subtitle">Why Choose Us</h4>
  <ul className="animated-bullets">
    <li className="highlight-point">
      <span className="bullet-icon"><i className="fas fa-check-circle"></i></span>
      <div className="point-content">
        <h5 className="point-title">Comprehensive Care</h5>
        <p>From routine check-ups to advanced treatments, we offer a full spectrum of dental services tailored to your needs.</p>
      </div>
    </li>
    <li className="highlight-point">
      <span className="bullet-icon"><i className="fas fa-check-circle"></i></span>
      <div className="point-content">
        <h5 className="point-title">Experienced Team</h5>
        <p>Our skilled dentists and hygienists provide gentle care in a comfortable environment.</p>
      </div>
    </li>
    <li className="highlight-point">
      <span className="bullet-icon"><i className="fas fa-check-circle"></i></span>
      <div className="point-content">
        <h5 className="point-title">Advanced Technology</h5>
        <p>We use state-of-the-art equipment for precise diagnostics and effective treatments.</p>
      </div>
    </li>
    <li className="highlight-point">
      <span className="bullet-icon"><i className="fas fa-check-circle"></i></span>
      <div className="point-content">
        <h5 className="point-title">Personalized Approach</h5>
        <p>Your comfort and satisfaction are our priorities. We listen to your concerns and personalize treatment plans.</p>
      </div>
    </li>
    <li className="highlight-point">
      <span className="bullet-icon"><i className="fas fa-check-circle"></i></span>
      <div className="point-content">
        <h5 className="point-title">Patient-Centered Care</h5>
        <p>We strive to build long-term relationships with our patients based on trust and excellent service.</p>
      </div>
    </li>
  </ul>
</div>

    </div>

    {/* FAQs Section */}
    <div className="faqs">
      <h4 className="sidebar-subtitle">Frequently Asked Questions</h4>
      <div id="accordionExample" className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              What should I expect during my first dental appointment?
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="accordion-body">
              During your first appointment, our dentist will review your dental and medical history, conduct a comprehensive oral examination, and discuss any concerns or treatment options you may need.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              How often should I schedule dental check-ups?
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div className="accordion-body">
              It's generally recommended to visit the dentist every six months for routine check-ups and cleanings. However, your dentist may suggest more frequent visits based on your oral health needs.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              What can I do to maintain good oral hygiene between dental visits?
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div className="accordion-body">
              Brushing twice a day with fluoride toothpaste, flossing daily, and eating a balanced diet low in sugary snacks can help maintain good oral hygiene. Additionally, using mouthwash and visiting your dentist regularly for cleanings are essential.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button className="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              What dental services do you offer at DentalCare Experts?
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
            <div className="accordion-body">
              We offer a wide range of services, including preventive care (cleanings, exams), restorative dentistry (fillings, crowns), cosmetic treatments (teeth whitening, veneers), orthodontics (braces, Invisalign), and more. Our goal is to provide comprehensive care tailored to your needs.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button className="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
              How can I schedule an appointment at DentalCare Experts?
            </button>
          </h2>
          <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
            <div className="accordion-body">
              You can easily schedule an appointment by calling our office at [phone number] or using our online appointment booking system on our website. Our friendly staff will assist you in finding a convenient time for your visit.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>
      <UserFooter />
    </div>
  );
};

export default Appointment;
