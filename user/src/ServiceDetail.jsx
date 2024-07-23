import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';
import './ServiceDetail.css'; // Import the custom CSS file

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        console.log(`Fetching service with ID: ${id}`);
        const response = await axios.get(`http://localhost:8000/charge/${id}`);
        console.log("Service Details: ", response.data);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service detail', error);
      }
    };

    fetchService();
  }, [id]);

  const handleMakeAppointment = () => {
    navigate(`/appointment/charge/${id}`);
  };

  if (!service) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <UserHeader />
      <section className="ftco-section">
        <Container>
          <Row>
            <Col md={8}>
              <Card className="mb-5">
                <Card.Img 
                  variant="top" 
                  src={`http://localhost:8000/images/${service.ServiceImage}`} 
                  alt={service.chargeName} 
                  style={{ height: '400px', width: '100%', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{service.chargeName}</Card.Title>
                  <Card.Text>{service.Description || 'No description available.'}</Card.Text>
                  <Card.Text><strong>Cost:</strong> ₹{service.Cost}</Card.Text>
                  <Button variant="primary" onClick={handleMakeAppointment}>
                    Make an Appointment
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="sidebar">
              <div className="sidebar-box">
                <div className="categories">
                  <h3>Dental Help Points</h3>
                  <ul>
                    <li>Brush twice daily</li>
                    <li>Floss regularly</li>
                    <li>Visit dentist biannually</li>
                    <li>Use fluoride toothpaste</li>
                    <li>Limit sugary foods</li>
                    <li>Drink plenty of water</li>
                    <li>Avoid tobacco products</li>
                  </ul>
                </div>
              </div>
              <div className="sidebar-box">
                <h3>Tip of the Day</h3>
                <Carousel className="carousel-custom">
                  <Carousel.Item>
                    <p>
                      Remember to replace your toothbrush every 3-4 months or sooner if the bristles are frayed.
                    </p>
                  </Carousel.Item>
                  <Carousel.Item>
                    <p>
                      Avoid brushing too hard to protect your gums and enamel.
                    </p>
                  </Carousel.Item>
                  <Carousel.Item>
                    <p>
                      Use a mouthguard if you grind your teeth at night.
                    </p>
                  </Carousel.Item>
                  <Carousel.Item>
                    <p>
                      Chew sugar-free gum to help stimulate saliva production.
                    </p>
                  </Carousel.Item>
                </Carousel>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <UserFooter />
    </div>
  );
};

export default ServiceDetail;
