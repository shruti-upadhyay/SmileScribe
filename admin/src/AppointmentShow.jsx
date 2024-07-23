import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

const AppointmentShow = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/appointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
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
                    return { ...appointment, Status: 'Cancelled' };
                }
                return appointment;
            });
            setAppointments(updatedAppointments);

            // Make API call
            await axios.put(`http://localhost:8000/appointment/${appointmentId}/cancel`);
            console.log('Appointment Cancelled:', appointmentId);
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
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Appointments</h3>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-bordered table-hover">
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
                                                {appointments.map(appointment => (
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AppointmentShow;
