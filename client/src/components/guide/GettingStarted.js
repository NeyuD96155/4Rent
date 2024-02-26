import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

// Enhanced GettingStarted Component
const GettingStarted = () => {
    return (
        <Container>
            <Row className="start-guide my-5">
                <Col>
                    <h2>Welcome to 4Rent</h2>
                    <p>Welcome to 4Rent! Follow these detailed instructions to set up your account, browse listings, and make your first vacation rental.</p>

                    <h2>Account Setup</h2>
                    <p>Register and fill in the necessary details to create your account. Verify your email and set up your profile.</p>

                    <h2>Listing Browsing</h2>
                    <p>Explore various timeshare listings on 4Rent using filters to find your perfect vacation match.</p>

                    <h2>Initial Exchange</h2>
                    <p>Initiate an exchange request for a listing you like, and communicate with the owner to confirm details.</p>

                    <h2>Beginner's Tips</h2>
                    <ListGroup className="tips-list">
                        <ListGroup.Item>Read through FAQs and guidelines for smooth usage.</ListGroup.Item>
                        <ListGroup.Item>Review property ratings before exchanging.</ListGroup.Item>
                        <ListGroup.Item>Plan exchanges in advance for better availability.</ListGroup.Item>
                    </ListGroup>
                    {/* Placeholder for additional information */}
                </Col>
            </Row>
        </Container>
    );
};

// Enhanced ExchangeTimeshares Component
const ExchangeTimeshares = () => {
    return (
        <Container>
            <Row className="exchange-guide my-5">
                <Col>
                    <h1>Exchange Timeshares Guide</h1>
                    <p>Learn how to list your property, find exchange partners, and complete exchanges on the 4Rent platform.</p>

                    <h2>Property Listing</h2>
                    <p>Create a detailed listing with photos, descriptions, and features of your timeshare.</p>

                    <h2>Partner Finding</h2>
                    <p>Use 4Rent's tools to search for and match with potential exchange partners.</p>

                    <h2>Exchange Finalization</h2>
                    <p>Discuss details with your match to finalize the exchange, ensuring clarity on all terms.</p>

                    <h2>Exchange Advice</h2>
                    <ListGroup className="advice-list">
                        <ListGroup.Item>Be flexible with dates and locations for better matching.</ListGroup.Item>
                        <ListGroup.Item>Communicate clearly with potential partners.</ListGroup.Item>
                        <ListGroup.Item>Understand 4Rent's exchange policies.</ListGroup.Item>
                    </ListGroup>
                    {/* Placeholder for more detailed steps or advice */}
                </Col>
            </Row>
        </Container>
    );
};

// Enhanced MaximizeVacation Component
const MaximizeVacation = () => {
    return (
        <Container>
            <Row className="vacation-maximize my-5">
                <Col>
                    <h1>Maximize Your Vacation</h1>
                    <p>Find tips for the best vacation experience, from choosing locations to optimizing your timeshare exchange.</p>

                    <h2>Location Selection</h2>
                    <p>Choose your destination considering climate, attractions, and cultural experiences.</p>

                    <h2>Timeshare Optimization</h2>
                    <p>Understand peak seasons, exchange rates, and membership benefits to get the most out of your timeshare.</p>

                    <h2>Stay Enhancement</h2>
                    <p>Immerse in local cuisine, activities, and amenities to make your vacation unforgettable.</p>

                    <h2>Vacation Tips</h2>
                    <ListGroup className="vacation-tips">
                        <ListGroup.Item>Research local customs and languages.</ListGroup.Item>
                        <ListGroup.Item>Check travel advisories and vaccinations.</ListGroup.Item>
                        <ListGroup.Item>Keep copies of important documents.</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export { GettingStarted, ExchangeTimeshares, MaximizeVacation };
