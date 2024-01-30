import React from 'react';
import { Container, Row, Col,ListGroup  } from 'react-bootstrap';

const GettingStarted = () => {
    return (
      <Container>
        <Row className="my-5">
          <Col>
            <h1>Getting Started with 4Rent</h1>
            <p>
              Welcome to 4Rent! This detailed guide will walk you through the basics of setting up your account, browsing listings, and making your first timeshare exchange.
            </p>
            
            <h2>Setting Up Your Account</h2>
            <p>
              Create your 4Rent account by signing up on our platform. Fill in the required details, verify your email, and set up your profile.
            </p>
            
            <h2>Browsing Listings</h2>
            <p>
              Explore a variety of timeshare listings available on 4Rent. Use filters for location, dates, and amenities to find the perfect match for your vacation needs.
            </p>
  
            <h2>Making Your First Exchange</h2>
            <p>
              Once you find a desired listing, initiate an exchange request. Communicate with the property owner to finalize the details and confirm your exchange.
            </p>
  
            <h2>Helpful Tips for Beginners</h2>
            <ListGroup>
              <ListGroup.Item>Read through the platform's FAQs and guidelines for a smooth experience.</ListGroup.Item>
              <ListGroup.Item>Check reviews and ratings of properties before making an exchange.</ListGroup.Item>
              <ListGroup.Item>Start planning your exchange well in advance for better availability.</ListGroup.Item>
            </ListGroup>
            {/* Add more detailed steps, tips, and helpful information here */}
          </Col>
        </Row>
      </Container>
    );
  };
  

const ExchangeTimeshares = () => {
    return (
      <Container>
        <Row className="my-5">
          <Col>
            <h1>How to Exchange Timeshares</h1>
            <p>
              A comprehensive guide on exchanging timeshares through the 4Rent platform. Learn the step-by-step process to list your property, find exchange partners, and complete an exchange.
            </p>
            <h2>Listing Your Property</h2>
            <p>
              Start by creating a detailed listing for your timeshare. Include high-quality photos, a thorough description, available dates, and any unique features.
            </p>
            <h2>Finding Exchange Partners</h2>
            <p>
              Use 4Rent's search and matching tools to find potential exchange partners. Consider location preferences, property size, and exchange dates.
            </p>
            <h2>Completing the Exchange</h2>
            <p>
              Once you find a match, communicate with the other party to finalize details. Ensure all terms are clear and agreed upon, including dates, rules, and any exchange fees.
            </p>
            <h2>Exchange Tips</h2>
            <ListGroup>
              <ListGroup.Item>Be flexible with your dates and locations for better matches</ListGroup.Item>
              <ListGroup.Item>Communicate clearly and promptly with potential exchange partners</ListGroup.Item>
              <ListGroup.Item>Review and understand 4Rent’s exchange policies and guidelines</ListGroup.Item>
            </ListGroup>
            {/* Add more detailed steps, tips, and important information here */}
          </Col>
        </Row>
      </Container>
    );
  };
const MaximizeVacation = () => {
    return (
      <Container>
        <Row className="my-5">
          <Col>
            <h1>Maximizing Your Vacation Experience</h1>
            <p>
              Discover tips and strategies for making the most out of your vacation experiences with 4Rent. Our guide includes advice on choosing locations, optimizing timeshare exchanges, and enhancing your stay.
            </p>
            <h2>Choosing the Right Location</h2>
            <p>
              The perfect vacation starts with the right location. Consider factors like climate, local attractions, and cultural experiences when selecting your destination.
            </p>
            <h2>Optimizing Timeshare Exchanges</h2>
            <p>
              Get the best value from your timeshare by understanding peak seasons, exchange rates, and membership benefits. Plan ahead to secure your desired dates and locations.
            </p>
            <h2>Enhancing Your Stay</h2>
            <p>
              Make every vacation memorable by exploring local cuisine, participating in unique activities, and taking advantage of on-site amenities. Don't forget to relax and enjoy your surroundings.
            </p>
            <h2>Travel Tips</h2>
            <ListGroup>
              <ListGroup.Item>Research local customs and language</ListGroup.Item>
              <ListGroup.Item>Check for travel advisories and necessary vaccinations</ListGroup.Item>
              <ListGroup.Item>Make copies of important documents</ListGroup.Item>
            </ListGroup>
            {/* Add more tips, strategies, and helpful information here */}
          </Col>
        </Row>
      </Container>
    );
  };
  

export { GettingStarted, ExchangeTimeshares, MaximizeVacation };
