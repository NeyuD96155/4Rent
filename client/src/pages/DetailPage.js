import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/DetailPage.css';

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Move the function declaration to the top
  const redirectToPayment = () => {
    // Chuyển hướng đến trang thanh toán (paymentpage)
    navigate('/payment');
  };

  // Kiểm tra nếu location.state không tồn tại hoặc là null
  if (!location.state) {
    const mockData = {
      title: 'Luxury Apartment',
      description: 'Another gorgeous apartment with modern amenities.',
      imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
      price: '$1200 per night',
    };

    const { title, description, imageUrl, price } = mockData;

    return (
      <div className="detail-page-container">
        <h2>{title}</h2>
        <img src={imageUrl} alt={title} className="detail-page-image" />
        <p>{description}</p>
        <p className="detail-page-price">Price: {price}</p>

        {/* Thêm nút chuyển hướng đến trang thanh toán */}
        <button className='detail-page-button' onClick={() => redirectToPayment()}>Đặt Phòng</button>
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

      {/* Thêm nút chuyển hướng đến trang thanh toán */}
      <button onClick={() => redirectToPayment()}>Go to Payment</button>
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
