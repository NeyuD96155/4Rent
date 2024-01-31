import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import '../styles/DetailPage.css'; // Import CSS file

const DetailPage = () => {
  const location = useLocation();

  // Kiểm tra nếu location.state không tồn tại hoặc là null
  if (!location.state) {
    // Dữ liệu giả mạo nếu không có dữ liệu từ location.state
    const mockData = {
      title: 'Luxury Apartment',
      description: 'Another gorgeous apartment with modern amenities.',
      imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
      price: '$1200 per night',
    };

    // Destructuring thuộc tính từ mockData
    const { title, description, imageUrl, price } = mockData;

    return (
      <div className="detail-page-container">
        <h2>{title}</h2>
        <img src={imageUrl} alt={title} className="detail-page-image" />
        <p>{description}</p>
        <p className="detail-page-price">Price: {price}</p>
      </div>
    );
  }

  // Dữ liệu từ location.state tồn tại
  const { title, description, imageUrl, price } = location.state;

  return (
    <div className="detail-page-container">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} className="detail-page-image" />
      <p>{description}</p>
      <p className="detail-page-price">Price: {price}</p>
    </div>
  );
};

DetailPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.string,
};

export default DetailPage;
