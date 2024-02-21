// HeroSection.js
import React from 'react';
import '../styles/HeroSection.css'; // Assume you have a CSS file for styling

const HeroSection = () => {
  return (
    <div className="hero-container">
      
      <h1>CUỘC PHIÊU LƯU ĐANG CHỜ ĐỢI</h1>
      <p> Bạn còn chờ gì nữa ? </p>
      <div className="hero-btn">
        <button className="btn btn-primary">HƯỚNG DẪN</button>
        <button className="btn btn-outline">THUÊ NGAY</button>
      </div>
    </div>
  );
};

export default HeroSection;
