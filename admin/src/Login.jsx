import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((values) => ({
            ...values,
            [name]: value
        }));
    };

    const check = async (event) => {
        event.preventDefault(); // Prevent form submission
        try {
            const response = await axios.post('http://localhost:8000/login', data);
            const record = response.data;
            console.log(record);
            if (record.message === "Welcome")
            {
                sessionStorage.setItem('UserID', record.UserID);
                sessionStorage.setItem('username', data.username);
                
                if(record.Role === "Dentist")
                {
                    navigate('/DentistAppointmentShow');
                }
                else if(record.Role === "Admin")
                {
                    navigate('/Home');
                }
            }
            else
                alert("Invalid username and password");
        } catch (error) {
            alert("Error occurred: " + error.message);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 col-sm-4">
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={check}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            name="username" 
                            value={data.username} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password" 
                            value={data.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
