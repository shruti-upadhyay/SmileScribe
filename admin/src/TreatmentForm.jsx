import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import DoctorHeader from './DoctorHeader';
import './TreatmentForm.css';

const TreatmentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { appointmentId, chargeName, cost } = location.state || {};
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Client-side validation
        if (!description || !duration) {
            setValidationError('All fields are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/treatments', {
                AppointmentID: appointmentId,
                TreatmentName: chargeName,
                Description: description,
                Cost: cost,
                Duration: duration
            });

            console.log('Treatment added:', response.data);
            navigate('/DentistAppointmentShow');
        } catch (error) {
            console.error('Error adding treatment:', error);
            setError('Failed to add treatment. Please try again.');
        }
    };

    return (
        <div className="wrapper">
            <DoctorHeader />
            <br />
            <div className="content-wrapper">
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">TREATMENT FORM</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {validationError && <div className="alert alert-danger">{validationError}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            
                            <div className="form-group">
                                <label>Appointment ID</label>
                                <input type="text" className="form-control" value={appointmentId} readOnly />
                            </div>

                            <div className="form-group">
                                <label>Treatment Name</label>
                                <input type="text" className="form-control" value={chargeName} readOnly />
                            </div>

                            <div className="form-group">
                                <label>Cost</label>
                                <input type="text" className="form-control" value={cost} readOnly />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Duration</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    required
                                />
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
};

export default TreatmentForm;
