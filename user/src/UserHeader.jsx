import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHeader = () => {
  const navigate = useNavigate();
  const userID = sessionStorage.getItem('UserID');
  const isLoggedIn = !!userID;

  const handleLogout = () => {
    sessionStorage.removeItem('UserID');
    sessionStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div className="container">
          <a className="navbar-brand" href="/">Smile<span>Scribe</span></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="oi oi-menu"></span> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active"><a href="/" className="nav-link">Home</a></li>
              {/* <li className="nav-item"><a href="/about.html" className="nav-link">About</a></li> */}
              <li className="nav-item"><a href="/Service" className="nav-link">Services</a></li>
              <li className="nav-item"><a href="/Dentist" className="nav-link">Doctors</a></li>
              {/* <li className="nav-item"><a href="/blog.html" className="nav-link">Blog</a></li>
              <li className="nav-item"><a href="/contact.html" className="nav-link">Contact</a></li> */}
              <li className="nav-item"><a href="/Appointment" className="nav-link"><span>Make an Appointment</span></a></li>
              {isLoggedIn ? (
                <li className="nav-item"><a href="/MyAppointment" className="nav-link"><span>My Appointment</span></a></li>
              ) : (
                <li className="nav-item"><a href="/login" className="nav-link"><span>Login</span></a></li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserHeader;
