import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>About Us</h1>
          <p>Learn more about the 4Rent company and our mission.</p>
          <p>
            4Rent is a leading timeshare exchange platform, dedicated to providing
            exceptional vacation experiences across the globe. Our platform
            enables users to exchange their timeshare properties in a seamless and
            efficient manner, ensuring a hassle-free vacation planning experience.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Our Vision</h2>
          <p>
            At 4Rent, our vision is to revolutionize the way people vacation. We
            strive to connect timeshare owners with a vast network of properties,
            enabling them to explore new destinations with ease and comfort.
          </p>
        </Col>
        <Col md={6}>
          <Image src="path-to-your-vision-image.jpg" alt="Vision Image" fluid />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Image src="path-to-your-mission-image.jpg" alt="Mission Image" fluid />
        </Col>
        <Col md={6}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower timeshare owners by providing them with a
            diverse range of exchange options, top-notch customer service, and
            invaluable resources to enhance their vacation experiences.
          </p>
        </Col>
      </Row>
      {/* You can add more sections about team, history, values, etc. here */}
    </Container>
  );
};

export default AboutUs;
