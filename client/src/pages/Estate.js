import React, { useEffect, useState } from 'react';
import api from '../config/axios';
import { toast } from "react-toastify";
import { Card, Col, Row } from 'antd'; // Using Ant Design components for layout

const EstateListings = () => {
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        const response = await api.get('/estate'); // Adjust the endpoint as needed
        setEstates(response.data);
      } catch (error) {
        toast.error(`Failed to fetch estates: ${error.response?.data?.message || error.message}`);
      }
    };

    fetchEstates();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        {estates.map((estate) => (
          <Col span={8} key={estate.id}>
            <Card title={estate.title} bordered={false}>
              <p><strong>Price:</strong> ${estate.price}</p>
              <p><strong>Description:</strong> {estate.content}</p>
              <p><strong>Posted On:</strong> {new Date(estate.postDate).toLocaleDateString()}</p>
              {/* Add more estate details here */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EstateListings;
