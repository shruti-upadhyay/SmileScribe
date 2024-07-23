import axios from 'axios';
import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import { useNavigate } from 'react-router-dom';

const ChargeAdd = () => {
    const [data, setData] = useState({
        chargeName: "",
        Cost: "",
        ServiceImage: null,
        Description: ""
    });

    const [fileName, setFileName] = useState('Choose file');
    const Navigate = useNavigate();

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
                ServiceImage: file
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        if (!data.chargeName || !data.Cost || !data.ServiceImage || !data.Description) {
            alert('Please fill out all required fields.');
            return;
        }

        let formData = new FormData();
        formData.append('chargeName', data.chargeName);
        formData.append('Cost', data.Cost);
        formData.append('ServiceImage', data.ServiceImage);
        formData.append('Description', data.Description);

        axios.post("http://localhost:8000/charge", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        .then(res => {
            alert('Service added successfully!');
            Navigate('/ChargeShow');
            // handle the response as needed
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
                            <h3 className="card-title">SERVICE FORM</h3>
                        </div>
                        <form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Service Name: </label>
                                <input type="text" name="chargeName" id="chargeName" className="form-control" value={data.chargeName} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Cost: </label>
                                <input type="text" name="Cost" id="Cost" className="form-control" value={data.Cost} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputFile">Service Image: </label>
                                <div className="input-group">
                                    <div className="custom-file">
                                        <input type="file" name="ServiceImage" accept="image/*" className="custom-file-input" onChange={handleFileChange} />
                                        <label className="custom-file-label" htmlFor="exampleInputFile">{fileName}</label>
                                    </div>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Upload</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description:</label>
                                <input type="text" name="Description" id="Description" className="form-control" value={data.Description} onChange={handleChange} />
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

export default ChargeAdd;
