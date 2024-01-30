import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Guides = () => {
  const guideList = [
    { title: "Getting Started with 4Rent", description: "A step-by-step guide to start using the 4Rent platform.", link: "/getting-started" },
    { title: "How to Exchange Timeshares", description: "Learn how to easily exchange timeshares on our platform.", link: "/exchange-timeshares" },
    { title: "Maximizing Your Vacation Experience", description: "Tips and tricks to get the most out of your timeshare vacations.", link: "/maximize-vacation" },
  ];

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>Guides</h1>
          <Row>
            {guideList.map((guide, index) => (
              <Col key={index} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{guide.title}</Card.Title>
                    <Card.Text>{guide.description}</Card.Text>
                    <Link to={guide.link}>Read More</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Guides;
