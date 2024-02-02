import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/DetailPage.css';

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const redirectToPayment = () => {
    // Chuyển hướng đến trang thanh toán (paymentpage)
    navigate('/payment');
  };

  // Kiểm tra nếu location.state không tồn tại hoặc là null
  if (!location.state) {
    const mockData = {
      title: 'Luxury Apartment',
      description: 'Another gorgeous apartment with modern amenities.',
      images: [
        'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
        'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
        'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
        'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
        'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
      ],
      price: '$1200 per night',
      // Additional member information
      member: {
        name: 'John Doe',
        contact: 'john.doe@example.com',
      },
    };

    const { title, description, images, price, member } = mockData;

    return (
      <div className="detail-page-container">
        <h2>{title}</h2>

        {/* Display multiple images */}
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} className="detail-page-image" />
        ))}

        <p>{description}</p>
        <p className="detail-page-price">Price: {price}</p>

        {/* Display member information */}
        <p>Property Owner: {member.name}</p>
        <p>Contact: {member.contact}</p>

        {/* Thêm nút chuyển hướng đến trang thanh toán */}
        <button className='detail-page-button' onClick={() => redirectToPayment()}>Đặt Phòng</button>
      </div>
    );
  }

  // Dữ liệu từ location.state tồn tại
  const { title, description, images, price, member } = location.state;

  return (
    <div className="detail-page-container">
      <h2>{title}</h2>

      {/* Display multiple images */}
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index + 1}`} className="detail-page-image" />
      ))}

      <p>{description}</p>
      <p className="detail-page-price">Price: {price}</p>

      {/* Display member information */}
      <p>Property Owner: {member.name}</p>
      <p>Contact: {member.contact}</p>

      {/* Thêm nút chuyển hướng đến trang thanh toán */}
      <button onClick={() => redirectToPayment()}>Go to Payment</button>
    </div>
  );
};

DetailPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.string,
  // Add propTypes for member information as needed
  member: PropTypes.shape({
    name: PropTypes.string,
    contact: PropTypes.string,
  }),
};

export default DetailPage;
