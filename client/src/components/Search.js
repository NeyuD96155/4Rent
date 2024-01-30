import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/SearchPage.css'; // Make sure to create a SearchPage.css file for styling

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform the search logic here, or update the URL with the search term
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <Container className="search-page">
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="mt-5">
          <h1>Search for Timeshares</h1>
          <Form onSubmit={handleSearch}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Search</Button>
          </Form>
          {/* You can add more search filters or categories here */}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;
