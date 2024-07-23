import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function DoctorHeader() {
  const name = sessionStorage.getItem('username');
  const navigate = useNavigate();
  const [isDentistOpen, setIsDentistOpen] = useState(false);

  const toggleDentist = () => {
    setIsDentistOpen(!isDentistOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
      </nav>

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="/DentistAppointmentShow" className="brand-link">
          <img src="../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
          <span className="brand-text font-weight-light">SmileScribe</span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="/DentistAppointmentShow" className="d-block">{name}</a>
            </div>
          </div>

          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <a href="/patient-history" className="nav-link" onClick={toggleDentist}>
                  <i className="nav-icon fas fa-tooth"></i>
                  <p>Patient History</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout}>
                  <i className="nav-icon fas fa-sign-out-alt"></i>
                  <p>Logout</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
