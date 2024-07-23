import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { useNavigate } from 'react-router-dom';

const ScheduleAdd = () => {
    const [data, setData] = useState({
        DentistID: "",
        DayOfWeek: "",
        StartTime: "",
        EndTime: ""
    });

    const [dentist, setDentist] = useState([]);
    const [fileName, setFileName] = useState('Choose file');
    const Navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((values) => ({
            ...values,
            [name]: value
        }));
    };

    const getDentist = () => {
        const url = "http://localhost:8000/dentist";
        axios.get(url)
            .then(response => {
                const record = response.data;
                if (Array.isArray(record)) {
                    setDentist(record);
                }
            })
            .catch(error => {
                console.error("There was an error fetching the dentist data!", error);
            });
    };

    useEffect(() => {
        getDentist();
    }, []);

    const check = (event) => {
        event.preventDefault();

        // Basic validation
        if (!data.DentistID || !data.DayOfWeek || !data.StartTime || !data.EndTime) {
            alert('Please fill out all required fields.');
            return;
        }

        axios.post("http://localhost:8000/schedules", data)
            .then(res => {
                alert('Schedule added successfully!');
                Navigate('/ScheduleShow');
            })
            .catch(error => {
                if (error.response) {
                    console.error('Server responded with an error:', error.response.data);
                    alert(`Error: ${error.response.data.message}`);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    alert('Error: No response received from the server');
                } else {
                    console.error('Error setting up request:', error.message);
                    alert(`Error: ${error.message}`);
                }
            });
    };

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
                        <form encType="multipart/form-data" onSubmit={check}>
                            <div className="form-group">
                                <label>Dentist Name :</label>
                                <select value={data.DentistID} name="DentistID" id="DentistID" onChange={handleChange} className="form-control">
                                    <option value="">select dentist</option>
                                    {dentist.map((dent, index) => (
                                        <option key={index} value={dent.DentistID}>{dent.FirstName + " " + dent.LastName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
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
};

export default ScheduleAdd;
