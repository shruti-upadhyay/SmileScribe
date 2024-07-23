import axios from 'axios';
import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import { useNavigate } from 'react-router-dom';

const DentistAdd = () => {
    const [data, setData] = useState({
        FirstName: "",
        LastName: "",
        Password: "",
        Specialty: "",
        PhoneNumber: "",
        Email: "",
        Gender: "",
        ProfileImage: null,
        Qualifications: ""
    });
    const [fileName, setFileName] = useState('Choose file');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((values) => ({
            ...values,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setData((prevData) => ({
                ...prevData,
                ProfileImage: file
            }));
        }
    };

    const check = (event) => {
        event.preventDefault();

        // Basic validation
        if (!data.FirstName || !data.LastName || !data.Password || !data.Email || !data.PhoneNumber || !data.Specialty || !data.Gender || !data.Qualifications) {
            alert('Please fill out all required fields.');
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data.Email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Phone number validation (basic example for 10 digits)
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(data.PhoneNumber)) {
            alert('Please enter a valid phone number (10 digits).');
            return;
        }

        // Gender validation
        if (!['male', 'female'].includes(data.Gender)) {
            alert('Please select a valid gender.');
            return;
        }

        // Profile image validation
        if (!data.ProfileImage) {
            alert('Please upload a profile image.');
            return;
        }

        let formData = new FormData();
        formData.append('FirstName', data.FirstName);
        formData.append('LastName', data.LastName);
        formData.append('Password', data.Password);
        formData.append('Specialty', data.Specialty);
        formData.append('PhoneNumber', data.PhoneNumber);
        formData.append('Email', data.Email);
        formData.append('Gender', data.Gender);
        formData.append('ProfileImage', data.ProfileImage);
        formData.append('Qualifications', data.Qualifications);

        axios.post("http://localhost:8000/dentist", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        .then(res => {
            alert('Dentist added successfully!');
            navigate('/DentistShow');
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
            <AdminHeader />
            <br />
            <div className="content-wrapper">
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">DENTIST FORM</h3>
                        </div>
                        <form encType="multipart/form-data" onSubmit={check}>
                            <div className="form-group">
                                <label>First Name: </label>
                                <input type="text" name="FirstName" id="FirstName" className="form-control" value={data.FirstName} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Last Name: </label>
                                <input type="text" name="LastName" id="LastName" className="form-control" value={data.LastName} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Password: </label>
                                <input type="password" name="Password" id="Password" className="form-control" value={data.Password} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Specialty: </label>
                                <input type="text" name="Specialty" id="Specialty" className="form-control" value={data.Specialty} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Phone Number:</label>
                                <input type="text" name="PhoneNumber" id="PhoneNumber" className="form-control" value={data.PhoneNumber} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="Email" id="Email" className="form-control" value={data.Email} onChange={handleChange} required />
                            </div>

                            <div>
                                <label>Gender:</label>
                                <div className="form-check">
                                    <input type="radio" name="Gender" id="GenderMale" value="male" className="form-check-input" checked={data.Gender === "male"} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="GenderMale">Male</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="Gender" id="GenderFemale" value="female" className="form-check-input" checked={data.Gender === "female"} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="GenderFemale">Female</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputFile">Profile Image: </label>
                                <div className="input-group">
                                    <div className="custom-file">
                                        <input type="file" name="ProfileImage" accept="image/*" className="custom-file-input" onChange={handleFileChange} required />
                                        <label className="custom-file-label" htmlFor="exampleInputFile">{fileName}</label>
                                    </div>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Upload</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Qualifications:</label>
                                <input type="text" name="Qualifications" id="Qualifications" className="form-control" value={data.Qualifications} onChange={handleChange} required />
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

export default DentistAdd;
