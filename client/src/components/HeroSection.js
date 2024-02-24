import React from 'react';
import '../styles/HeroSection.css';
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <h1>CUỘC PHIÊU LƯU ĐANG CHỜ ĐỢI</h1>
      <p> Bạn còn chờ gì nữa ? </p>
      <div className="hero-button">
      <Link to="/guides" className="hero-btn">HƯỚNG DẪN</Link>
        <Link to="/estate" className="hero-btn">THUÊ NGAY</Link>
      </div>
    </div>
  );
};

export default HeroSection;
