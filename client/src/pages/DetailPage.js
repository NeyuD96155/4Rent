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

  let content;

  if (!location.state) {
    const mockData = {
      title: 'Luxury Apartment',
      description: 'Another gorgeous apartment with modern amenities.',
      images: [
        'https://hoanggiavu.vn/wp-content/uploads/2020/12/mau-villa-dep-nhat-2020-2021-2.jpg',
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

    content = (
      <>
        {/* Phần 1: Hình ảnh */}
        <div className="detail-page-container">
          <img
            src={images[0]}
            alt="Large Image"
            className="detail-page-large-image"
          />

          <div className="detail-page-small-images">
            {images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="detail-page-small-image"
              />
            ))}
          </div>
        </div>
        <div className="detail-page-details-and-booking">
          {/* Phần 2: Thông tin căn hộ và chủ nhà */}
          <div className="detail-page-details">
            <h2>{title}</h2>
            <p>{description}</p>
            <p className="detail-page-price">Price: {price}</p>
            <p>Property Owner: {member.name}</p>
            <p>Contact: {member.contact}</p>
          </div>

          {/* Phần 3: Bảng đặt phòng */}
          <div className="booking-section">
            <label htmlFor="checkinDate">Check-In Date:</label>
            <input type="date" id="checkinDate" />

            <label htmlFor="checkoutDate">Check-Out Date:</label>
            <input type="date" id="checkoutDate" />

            <button className="detail-page-button" onClick={() => redirectToPayment()}>Đặt Phòng</button>
          </div>
        </div>
      </>
    );
  } else {
    // Dữ liệu từ location.state tồn tại
    const { title, description, images, price, member } = location.state;

    content = (
      <>
        {/* Phần 1: Hình ảnh */}
        <div className="detail-page-container">
          <img
            src={images[0]}
            alt="Large Image"
            className="detail-page-large-image"
          />

          <div className="detail-page-small-images">
            {images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="detail-page-small-image"
              />
            ))}
          </div>
        </div>

        {/* Phần 2: Thông tin căn hộ và chủ nhà */}
        <div className="detail-page-details">
          <h2>{title}</h2>
          <p>{description}</p>
          <p className="detail-page-price">Price: {price}</p>
          <p>Property Owner: {member.name}</p>
          <p>Contact: {member.contact}</p>
        </div>

        {/* Phần 3: Bảng đặt phòng */}
        <div className="booking-section">
          <label htmlFor="checkinDate">Check-In Date:</label>
          <input type="date" id="checkinDate" />

          <label htmlFor="checkoutDate">Check-Out Date:</label>
          <input type="date" id="checkoutDate" />

          <button onClick={() => redirectToPayment()}>Đặt Phòng</button>
        </div>
      </>
    );
  }

  return (
    <div>
      {content}
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
