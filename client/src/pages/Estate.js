import React, { useEffect, useState } from 'react';
import api from '../config/axios';
import { toast } from "react-toastify";
import { Card, Col, Row } from 'antd'; // Sử dụng các thành phần Ant Design cho bố cục

const EstateListings = () => {
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        const response = await api.get('/estate'); // Điều chỉnh endpoint nếu cần
        setEstates(response.data);
      } catch (error) {
        toast.error(`Lỗi khi lấy thông tin bất động sản: ${error.response?.data?.message || error.message}`);
      }
    };

    fetchEstates();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        {estates.map((estate) => (
          <Col span={8} key={estate.id}>
            <Card
              title={estate.name} // Sử dụng name thay vì title
              bordered={false}
              cover={estate.resources.length > 0 ? <img alt="estate" src={estate.resources[0].url} /> : null} // Sử dụng ảnh đầu tiên từ resources nếu có
            >
              <p><strong>Mô tả:</strong> {estate.description}</p> {/* Sử dụng description thay vì content */}
              <p><strong>Địa điểm:</strong> {estate.location}</p>
              <p><strong>Loại:</strong> {estate.type}</p>
              <p><strong>Ngày đăng:</strong> {new Date(estate.postDate).toLocaleDateString()}</p> {/* Giả sử postDate là một trường */}
              {/* Thêm thông tin bất động sản khác ở đây nếu cần */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EstateListings;
