import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import DoctorHeader from './DoctorHeader';
import './App.css'; // Adjust as per your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

const DentistAppointmentShow = () => {
    const [appointments, setAppointments] = useState([]);
    const tableRef = useRef(null);
    const userID = sessionStorage.getItem('UserID');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/appointments/dentist/${userID}`);
                console.log('Appointments data:', response.data);
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [userID]);

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

    const handleDone = async (appointmentId, chargeName, cost) => {
        try {
            // Optimistically update state
            const updatedAppointments = appointments.map(appointment => {
                if (appointment.AppointmentID === appointmentId) {
                    return { ...appointment, Status: 'done' };
                }
                return appointment;
            });
            setAppointments(updatedAppointments);

            // Make API call
            await axios.put(`http://localhost:8000/appointment/${appointmentId}/done`);
            console.log('Appointment marked as done:', appointmentId);

            // Navigate to treatment page
            navigate(`/treatment/${appointmentId}`, { state: { appointmentId, chargeName, cost } });
        } catch (error) {
            console.error('Error marking appointment as done:', error);
        }
    };

    useEffect(() => {
        if (appointments.length > 0) {
            const dataTable = $(tableRef.current).DataTable({
                responsive: true,
                lengthChange: false,
                autoWidth: false,
                buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
                destroy: true, // Ensure DataTable is re-initialized correctly
            });

            // Cleanup function to destroy DataTables instance on component unmount
            return () => {
                if (dataTable) dataTable.destroy();
            };
        }
    }, [appointments]);

    return (
        <div className="wrapper">
            <DoctorHeader />
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Appointments List</h3>
                                    </div>
                                    <div className="card-body">
                                        <table ref={tableRef} id="example1" className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Patient Name</th>
                                                    <th>Service</th>
                                                    <th>Cost</th>
                                                    <th>Date</th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    <th>Status</th>
                                                    <th>Description</th>
                                                    <th>Notes</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {appointments.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="10" className="text-center">No data available</td>
                                                    </tr>
                                                ) : (
                                                    appointments.map(appointment => (
                                                        <tr key={appointment.AppointmentID}>
                                                            <td>{appointment.FirstName} {appointment.LastName}</td>
                                                            <td>{appointment.chargeName}</td>
                                                            <td>{appointment.Cost}</td>
                                                            <td>{formatDate(appointment.AppointmentDate)}</td>
                                                            <td>{appointment.StartTime}</td>
                                                            <td>{appointment.EndTime}</td>
                                                            <td>{appointment.Status}</td>
                                                            <td>{appointment.ProblemDescription}</td>
                                                            <td>{appointment.Notes}</td>
                                                            <td>
                                                                {appointment.Status === 'pending' && (
                                                                    <div className="btn-group">
                                                                        <button className="btn btn-danger" onClick={() => handleCancel(appointment.AppointmentID)}>
                                                                            <FontAwesomeIcon icon={faTimes} />
                                                                        </button>
                                                                        <button className="btn btn-success" onClick={() => handleDone(appointment.AppointmentID, appointment.chargeName, appointment.Cost)}>
                                                                            <FontAwesomeIcon icon={faCheck} />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
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

export default DentistAppointmentShow;
