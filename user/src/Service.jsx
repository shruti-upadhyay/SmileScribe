import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';
import './Service.css';

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/charge');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <UserHeader />
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-md-7 text-center heading-section">
              <h2>Our Service Keeps You Smiling</h2>
              <p>Your dental health is our priority, because a healthy smile is a happy smile.</p>
            </div>
          </div>
          <div className="row">
            {services.length > 0 ? (
              services.map((service) => (
                <div className="col-md-4 mb-4" key={service.chargeID}>
                  <Link to={`/ServiceDetail/${service.chargeID}`} className="card-link">
                    <div className="card h-100 service-card">
                      <img
                        src={`http://localhost:8000/images/${service.ServiceImage}`}
                        alt={service.chargeName}
                        className="card-img-top"
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">{service.chargeName}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-md-12 text-center">
                <p>No services available</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <UserFooter />
    </div>
  );
};

export default Service;
