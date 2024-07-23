import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css'; // Ensure to import your CSS file

const Dentist = () => {
    const [staffMembers, setStaffMembers] = useState([]);
    const [selectedDentist, setSelectedDentist] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchDentist = async () => {
        try {
            const response = await axios.get('http://localhost:8000/dentist');
            console.log('API Response:', response.data);
            setStaffMembers(response.data);
        } catch (error) {
            console.error('Error fetching dentists', error);
        }
    };

    const fetchSchedule = async (dentistID) => {
        try {
            const response = await axios.get(`http://localhost:8000/doctorSchedule/${dentistID}`);
            console.log('Schedule Response:', response.data);
            setSchedule(response.data);
            setModalOpen(true); // Open modal after fetching schedule
        } catch (error) {
            console.error('Error fetching schedule', error);
        }
    };

    useEffect(() => {
        fetchDentist();
    }, []);

    const openScheduleModal = (dentist) => {
        setSelectedDentist(dentist);
        fetchSchedule(dentist.DentistID);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleMakeAppointment = (dentistID) => {
        navigate(`/appointment/${dentistID}`); // Redirect to the Appointment component with the dentist's ID
    };

    return (
        <div>
            <UserHeader />
            <div className={`container ${modalOpen ? 'blur-background' : ''}`}>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-7 text-center heading-section">
                                <h2 className="mb-3">Meet Our Experienced Dentists</h2>
                                <p className="mb-4">Experience the gentle touch of expert care for a brighter, healthier smile.</p>
                            </div>
                        </div>
                        <div className="row">
                            {staffMembers.length > 0 ? (
                                staffMembers.map((staff) => (
                                    <div className="col-lg-3 col-md-6 d-flex mb-4" key={staff.DentistID}>
                                        <div className="staff">
                                            <div className="img mb-4">
                                                <img
                                                    src={`http://localhost:8000/images/${staff.ProfileImage}`}
                                                    alt={`${staff.FirstName} ${staff.LastName}`}
                                                    className="profile-img"
                                                />
                                            </div>
                                            <div className="info text-center">
                                                <h3>{staff.FirstName} {staff.LastName}</h3>
                                                <span className="position">{staff.Specialty}</span>
                                                <div className="mt-3">
                                                    <button onClick={() => openScheduleModal(staff)} className="btn btn-primary">View Schedule</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No dentist available</p>
                            )}
                        </div>
                    </div>
                </section>
                <UserFooter />
            </div>

            {/* Modal Section */}
            {selectedDentist && (
                <div className={`modal fade ${modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="scheduleModalLabel" aria-hidden={!modalOpen}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="scheduleModalLabel">Schedule for {selectedDentist.FirstName} {selectedDentist.LastName}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {schedule.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Day of Week</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {schedule.map((slot) => (
                                                <tr key={slot.ScheduleID}>
                                                    <td>{slot.DayOfWeek}</td>
                                                    <td>{slot.StartTime}</td>
                                                    <td>{slot.EndTime}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No schedule available</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => handleMakeAppointment(selectedDentist.DentistID)}>Make Appointment</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dentist;
