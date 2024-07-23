import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Abcd.css'; // Import your CSS file for additional styles
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';

const Slider = () => {
  return (
    <div>
        <UserHeader></UserHeader>
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      showThumbs={false}
      className="carousel-wrapper"
    >
      <div className="slider-item" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/wallpaper.png)` }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row slider-text align-items-center">
            <div className="col-md-6 col-sm-12 ftco-animate">
              <h1 className="mb-4">Modern Dentistry in a Calm and Relaxed Environment</h1>
              <p className="mb-4">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#" className="btn btn-primary px-4 py-3">Make an Appointment</a></p>
            </div>
          </div>
        </div>
      </div>

      <div className="slider-item" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg_2.jpg)` }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row slider-text align-items-center">
            <div className="col-md-6 col-sm-12 ftco-animate">
              <h1 className="mb-4">Modern Achieve Your Desired Perfect Smile</h1>
              <p className="mb-4">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#" className="btn btn-primary px-4 py-3">Make an Appointment</a></p>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
    </div>
  );
};

export default Slider;
