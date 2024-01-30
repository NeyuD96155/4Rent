import React from 'react';
import '../styles/About.css';

const AboutUs = () => {
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col">
          <h1>About Us</h1>
          <p>Learn more about the 4Rent company and our mission.</p>
          <p>
            4Rent is a leading timeshare exchange platform, dedicated to providing
            exceptional vacation experiences across the globe. Our platform
            enables users to exchange their timeshare properties in a seamless and
            efficient manner, ensuring a hassle-free vacation planning experience.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h2>Our Vision</h2>
          <p>
            At 4Rent, our vision is to revolutionize the way people vacation. We
            strive to connect timeshare owners with a vast network of properties,
            enabling them to explore new destinations with ease and comfort.
          </p>
        </div>
        <div className="col-md-6">
          <img src="./assets/img/i2.jpg" alt="Vision" className="img-fluid" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img src="./assets/img/i1.jpg" alt="Mission" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower timeshare owners by providing them with a
            diverse range of exchange options, top-notch customer service, and
            invaluable resources to enhance their vacation experiences.
          </p>
        </div>
      </div>

      <div className="row my-4">
        <div className="col">
          <h2>Our Team</h2>
          <p>
            Meet the passionate individuals behind 4Rent. Our team is composed of
            experts in real estate, technology, and customer service, all dedicated
            to making your vacation dreams a reality.
          </p>
          {/* Include team member profiles or photos here */}
        </div>
      </div>

      <div className="row my-4">
        <div className="col">
          <h2>Our History</h2>
          <p>
            Founded in 2010, 4Rent started as a small startup and has since grown
            into a leading name in the timeshare exchange industry. Our journey is
            a testament to our commitment to innovation and customer satisfaction.
          </p>
          {/* Include a timeline or key historical events here */}
        </div>
      </div>

      <div className="row my-4">
        <div className="col">
          <h2>Our Values</h2>
          <p>
            At 4Rent, we are guided by values of integrity, collaboration, and
            excellence. These principles are at the heart of everything we do, from
            the way we conduct business to how we interact with our community.
          </p>
          {/* Expand on specific values and examples of how they are applied */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
