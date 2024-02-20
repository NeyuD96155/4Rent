import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic, e.g., sending data to a backend server
    console.log('Form Data:', formData);
    // Clear form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container>

      <Row className="my-5">
        <Col>
          <h1>Liên hệ với chúng tôi</h1>
          <p>Bạn có thể liên hệ với 4Rent tại đây</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Tên</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nhập tên của bạn" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Địa chỉ email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Nhập email của bạn" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Tin nhắn</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Tin nhắn" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Gửi
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
