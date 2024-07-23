import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const [isDentistOpen, setIsDentistOpen] = useState(false);
  const [isChargesOpen, setIsChargesOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const name = sessionStorage.getItem('username');
  const navigate = useNavigate();

  const toggleDentist = () => {
    setIsDentistOpen(!isDentistOpen);
  };

  const toggleCharges = () => {
    setIsChargesOpen(!isChargesOpen);
  };

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen);
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
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/Home" className="nav-link">Home</a>
          </li>
          {/* <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">Contact</a>
          </li> */}
        </ul>
        <ul className="navbar-nav ml-auto">
          
          
          <li className="nav-item">
            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          
        </ul>
      </nav>

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="/Home" className="brand-link">
          <img src="../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
          <span className="brand-text font-weight-light">SmileScribe</span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="/Home" className="d-block">{name}</a>
            </div>
          </div>
          {/* <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div> */}

          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={toggleDentist}>
                  <i className="nav-icon fas fa-tooth"></i>
                  <p>
                    Dentist
                    <i className={`right fas fa-angle-left ${isDentistOpen ? 'rotate-icon' : ''}`}></i>
                  </p>
                </a>
                <ul className={`nav nav-treeview ${isDentistOpen ? 'show' : ''}`} style={{ display: isDentistOpen ? 'block' : 'none' }}>
                  <li className="nav-item">
                    <a href="/DentistAdd" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Add</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/DentistShow" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Show</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={toggleCharges}>
                  <i className="nav-icon fas fa-money-bill"></i>
                  <p>
                    Service
                    <i className={`right fas fa-angle-left ${isChargesOpen ? 'rotate-icon' : ''}`}></i>
                  </p>
                </a>
                <ul className={`nav nav-treeview ${isChargesOpen ? 'show' : ''}`} style={{ display: isChargesOpen ? 'block' : 'none' }}>
                  <li className="nav-item">
                    <a href="/ChargeAdd" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Add</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/ChargeShow" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Show</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={toggleSchedule}>
                  <i className="nav-icon fas fa-calendar-alt"></i>
                  <p>
                    Schedule
                    <i className={`right fas fa-angle-left ${isScheduleOpen ? 'rotate-icon' : ''}`}></i>
                  </p>
                </a>
                <ul className={`nav nav-treeview ${isScheduleOpen ? 'show' : ''}`} style={{ display: isScheduleOpen ? 'block' : 'none' }}>
                  <li className="nav-item">
                    <a href="/ScheduleAdd" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Add</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/ScheduleShow" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Show</p>
                    </a>
                  </li>
                  
                </ul>
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
