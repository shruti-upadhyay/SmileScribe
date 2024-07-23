import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AdminHeader from './AdminHeader';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import DentistAdd from './DentistAdd';
import DentistShow from './DentistShow';
import DentistUpdate from './DentistUpdate';
import Table from './Table';
import ChargeAdd from './ChargeAdd';
import ChargeShow from './ChargeShow';
import ChargeUpdate from './ChargeUpdate';
import ScheduleAdd from './ScheduleAdd';
import ScheduleShow from './ScheduleShow';
import ScheduleUpdate from './ScheduleUpdate';
import Login from './Login';
import DoctorHeader from './DoctorHeader';
import Home from './Home';
import AppointmentShow from './AppointmentShow';
import AppointmentToday from './AppointmentToday';
import TreatmentForm from './TreatmentForm';
import DentistAppointmentShow from './DentistAppointmentShow';
import PatientHistory from './PatientHistory';
// In App.js or index.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/DentistAdd' element={<DentistAdd />} />
        <Route path='/DentistShow' element={<DentistShow />} />
        <Route path='/DentistUpdate/:id' element={<DentistUpdate />} />
        <Route path='/Table' element={<Table />} />
        <Route path='/ChargeAdd' element={<ChargeAdd />} />
        <Route path='/ChargeShow' element={<ChargeShow />} />
        <Route path='/ChargeUpdate/:id' element={<ChargeUpdate />} />
        <Route path='ScheduleAdd' element={<ScheduleAdd />} />
        <Route path='/ScheduleShow' element={<ScheduleShow />} />
        <Route path='/ScheduleUpdate/:id' element={<ScheduleUpdate />} />
        <Route path='/AdminHeader' element={<AdminHeader />} />
        <Route path='/DoctorHeader' element={<DoctorHeader />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/AppointmentShow' element={<AppointmentShow />} />
        <Route path="/AppointmentToday/today" element={<AppointmentToday />} />
        <Route path="/treatment/:appointmentId" element={<TreatmentForm />} />
        <Route path='/DentistAppointmentShow' element={<DentistAppointmentShow />} />
        <Route path="/patient-history" element={<PatientHistory />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const wrapper = document.getElementById('wrapper');
  // menuToggle.addEventListener('click', function () {
  //   wrapper.classList.toggle('toggled');
  // });
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
