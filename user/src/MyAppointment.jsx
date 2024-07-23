import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserFooter from './UserFooter';
import UserHeader from './UserHeader';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyAppointment = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const userId = sessionStorage.getItem('UserID');
            try {
                const response = await axios.get(`http://localhost:8000/appointments/user/${userId}`);
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const cancelAppointment = async (appointmentId) => {
        try {
            await axios.put(`http://localhost:8000/appointments/cancel/${appointmentId}`);
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.AppointmentID === appointmentId
                        ? { ...appointment, Status: 'Cancelled' }
                        : appointment
                )
            );
        } catch (error) {
            console.error('Error cancelling appointment:', error);
        }
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('en-GB', options);
    };

    return (
        <div>
            <UserHeader />
            <div className="container mt-4 mb-4">
                {appointments.length > 0 ? (
                    <>
                        <h2 className="mb-4">My Appointments</h2>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                    <th>Notes</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(appointment => (
                                    <tr key={appointment.AppointmentID}>
                                        <td>{formatDate(appointment.AppointmentDate)}</td>
                                        <td>{appointment.StartTime}</td>
                                        <td>{appointment.EndTime}</td>
                                        <td>{appointment.Status}</td>
                                        <td>{appointment.ProblemDescription}</td>
                                        <td>{appointment.Notes}</td>
                                        <td>
                                            {appointment.Status === 'pending' && (
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => cancelAppointment(appointment.AppointmentID)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <h2>No Appointments</h2>
                )}
            </div>
            <UserFooter />
        </div>
    );
};

export default MyAppointment;
