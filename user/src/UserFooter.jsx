import React from 'react';

const UserFooter = () => {
  return (
    <footer className="ftco-footer ftco-bg-dark ftco-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2 text-light">SmileScribe.</h2>
              <p className="text-light">
                At SmileScribe, we believe that every smile tells a story. Our dedicated team of dental professionals combines cutting-edge technology with personalized care to ensure your smile is healthy and radiant. Experience the perfect blend of comfort and expertise at SmileScribe, where your journey to a brighter smile begins.
              </p>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a></li>
                <li className="ftco-animate"><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2 text-light">Quick Links</h2>
              <ul className="list-unstyled">
                <li><a href="/Service" className="py-2 d-block text-light">Services</a></li>
                <li><a href="/Dentist" className="py-2 d-block text-light">Dentists</a></li>
                <li><a href="/Appointment" className="py-2 d-block text-light">Appointment</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2 text-light">Testimonials</h2>
              <div className="block-21 mb-4 d-flex align-items-start">
                <div className="text">
                  <p className="text-light">"The best dental care I've ever received! Highly recommend SmileScribe for their expertise and friendly service."</p>
                  <p><strong className="text-light">- Sarah J.</strong></p>
                </div>
              </div>
              <div className="block-21 mb-4 d-flex align-items-start">
                <div className="text">
                  <p className="text-light">"Wonderful experience! The staff at SmileScribe made me feel comfortable and well cared for throughout my visit."</p>
                  <p><strong className="text-light">- Devansh T.</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2 text-light">Dental Tips</h2>
              <ul className="list-unstyled" style={{ listStyleType: 'disc', paddingLeft: '1.5em' }}>
                <li className="text-light">Brush twice a day with fluoride toothpaste.</li>
                <li className="text-light">Floss daily to remove plaque between your teeth.</li>
                <li className="text-light">Visit your dentist regularly for check-ups and cleanings.</li>
                <li className="text-light">Limit sugary snacks and drinks to maintain oral health.</li>
                <li className="text-light">Replace your toothbrush every 3-4 months or sooner if the bristles are frayed.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
