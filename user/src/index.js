import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';
import Slider from './Slider';
import Service from './Service';
import ServiceDetail from './ServiceDetail';
import Dentist from './Dentist';
import Schedule from './Schedule';
import Appointment from './Appointment';
import Login from './Login';
import MyAppointment from './MyAppointment';

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/UserHeader' element={<UserHeader />} />
        <Route path='/UserFooter' element={<UserFooter />} />
        <Route path='/Slider' element={<Slider />} />
        <Route path='/Service' element={<Service />} />
        <Route path='/ServiceDetail/:id' element={<ServiceDetail />} />
        <Route path='/Dentist' element={<Dentist />} />
        <Route path='/Schedule/:DentistID' element={<Schedule />} /> 
        <Route path="/appointment/:dentistID" element={<Appointment />} />
        <Route path="/appointment/charge/:chargeID" element={<Appointment />} />
        <Route path='/Appointment' element={<Appointment />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/MyAppointment' element={<MyAppointment />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  root
);

reportWebVitals();
