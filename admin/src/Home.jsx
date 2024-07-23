import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS is included

const Home = () => {
    const [staffMembers, setStaffMembers] = useState([]);
    const [selectedDentist, setSelectedDentist] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
    const [appointmentsModalOpen, setAppointmentsModalOpen] = useState(false);
    const [allAppointmentsCount, setAllAppointmentsCount] = useState(0);
    const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const responseAll = await axios.get('http://localhost:8000/totalappointemntcount');
                setAllAppointmentsCount(responseAll.data.count);

                const responseToday = await axios.get('http://localhost:8000/appointments/today/count');
                setTodayAppointmentsCount(responseToday.data.count);
            } catch (error) {
                console.error('Error fetching appointment counts', error);
            }
        };

        const fetchDentists = async () => {
            try {
                const response = await axios.get('http://localhost:8000/dentist');
                setStaffMembers(response.data);
            } catch (error) {
                console.error('Error fetching dentists', error);
            }
        };

        fetchCounts();
        fetchDentists();
    }, []);

    const fetchSchedule = async (dentistID) => {
        try {
            const response = await axios.get(`http://localhost:8000/doctorSchedule/${dentistID}`);
            setSchedule(response.data);
            setScheduleModalOpen(true);
        } catch (error) {
            console.error('Error fetching schedule', error);
        }
    };

    const fetchAppointments = async (dentistID) => {
        try {
            const response = await axios.get(`http://localhost:8000/appointments/${dentistID}`);
            setAppointments(response.data);
            setAppointmentsModalOpen(true);
        } catch (error) {
            console.error('Error fetching appointments', error);
        }
    };

    const openScheduleModal = (dentist) => {
        setSelectedDentist(dentist);
        fetchSchedule(dentist.DentistID);
    };

    const openAppointmentsModal = (dentist) => {
        setSelectedDentist(dentist);
        fetchAppointments(dentist.DentistID);
    };

    const closeScheduleModal = () => {
        setScheduleModalOpen(false);
    };

    const closeAppointmentsModal = () => {
        setAppointmentsModalOpen(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA'); // Formats date as YYYY-MM-DD
    };

    const handleCancel = async (appointmentId) => {
        try {
            // Optimistically update state
            const updatedAppointments = appointments.map(appointment => {
                if (appointment.AppointmentID === appointmentId) {
                    return { ...appointment, Status: 'canceled' };
                }
                return appointment;
            });
            setAppointments(updatedAppointments);

            // Make API call
            await axios.put(`http://localhost:8000/appointment/${appointmentId}/cancel`);
            console.log('Appointment canceled:', appointmentId);
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };

    // const handleDone = async (appointmentId) => {
    //     try {
    //         // Optimistically update state
    //         const updatedAppointments = appointments.map(appointment => {
    //             if (appointment.AppointmentID === appointmentId) {
    //                 return { ...appointment, Status: 'done' };
    //             }
    //             return appointment;
    //         });
    //         setAppointments(updatedAppointments);

    //         // Make API call
    //         await axios.put(`http://localhost:8000/appointment/${appointmentId}/done`);
    //         console.log('Appointment marked as done:', appointmentId);
    //     } catch (error) {
    //         console.error('Error marking appointment as done:', error);
    //     }
    // };

    return (
        <div>
            <AdminHeader />
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-primary">
                                    <div className="inner">
                                        <h3>{allAppointmentsCount}</h3>
                                        <p>All Appointments</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <Link to="/AppointmentShow" className="small-box-footer">
                                        More info <FontAwesomeIcon icon={faArrowCircleRight} />
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-secondary">
                                    <div className="inner">
                                        <h3>{todayAppointmentsCount}</h3>
                                        <p>Today's Appointments</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <Link to="/AppointmentToday/today" className="small-box-footer">
                                        More info <FontAwesomeIcon icon={faArrowCircleRight} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className={`container ${scheduleModalOpen || appointmentsModalOpen ? 'blur-background' : ''}`}>
                    <section>
                        <div className="container">
                            <div className="row">
                                {staffMembers.length > 0 ? (
                                    staffMembers.map((staff) => (
                                        <div className="col-lg-3" key={staff.DentistID}>
                                            <div className="staff">
                                                <div className="img mb-4">
                                                    <img
                                                        src={`http://localhost:8000/images/${staff.ProfileImage}`}
                                                        alt={`${staff.FirstName} ${staff.LastName}`}
                                                        className="profile-img"
                                                    />
                                                </div>
                                                <div className="info  text-center">
                                                    <h3>{staff.FirstName} {staff.LastName}</h3>
                                                    <span className="position">{staff.Specialty}</span>
                                                    <div className="button-container">
                                                        <button onClick={() => openScheduleModal(staff)} className="btn btn-primary">View Schedule</button>
                                                        <button onClick={() => openAppointmentsModal(staff)} className="btn btn-secondary">View Appointments</button>
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
                </div>

                {/* Schedule Modal Section */}
                {selectedDentist && (
                    <div className={`modal ${scheduleModalOpen ? 'show' : ''}`} style={{ display: scheduleModalOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="scheduleModalLabel" aria-hidden={!scheduleModalOpen}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="scheduleModalLabel">Schedule for {selectedDentist.FirstName} {selectedDentist.LastName}</h5>
                                    <button type="button" className="close" aria-label="Close" onClick={closeScheduleModal}>
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
                                    <button type="button" className="btn btn-secondary" onClick={closeScheduleModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Appointments Modal Section */}
                {selectedDentist && (
                    <div className={`modal ${appointmentsModalOpen ? 'show' : ''}`} style={{ display: appointmentsModalOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="appointmentsModalLabel" aria-hidden={!appointmentsModalOpen}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="appointmentsModalLabel">Appointments for {selectedDentist.FirstName} {selectedDentist.LastName}</h5>
                                    <button type="button" className="close" aria-label="Close" onClick={closeAppointmentsModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {appointments.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Patient Name</th>
                                                        <th>Dentist</th>
                                                        <th>Charge</th>
                                                        <th>Date</th>
                                                        <th>Time</th>
                                                        <th>Status</th>
                                                        <th>Problem Description</th>
                                                        <th>Notes</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {appointments.map((appointment) => (
                                                        <tr key={appointment.AppointmentID}>
                                                            <td>{appointment.PatientFirstName} {appointment.PatientLastName}</td>
                                                            <td>{appointment.DentistFirstName} {appointment.DentistLastName}</td>
                                                            <td>{appointment.chargeName}</td>
                                                            <td>{formatDate(appointment.AppointmentDate)}</td>
                                                            <td>{appointment.StartTime} - {appointment.EndTime}</td>
                                                            <td>{appointment.Status}</td>
                                                            <td>{appointment.ProblemDescription}</td>
                                                            <td>{appointment.Notes}</td>
                                                            <td>
                                                                {appointment.Status === 'pending' && (
                                                                    <>
                                                                        <button className="btn btn-danger mr-2" onClick={() => handleCancel(appointment.AppointmentID)}>
                                                                            <FontAwesomeIcon icon={faTimes} />
                                                                        </button>
                                                                        {/* <button className="btn btn-success" onClick={() => handleDone(appointment.AppointmentID)}>
                                                                            <FontAwesomeIcon icon={faCheck} />
                                                                        </button> */}
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p>No appointments available</p>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeAppointmentsModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
