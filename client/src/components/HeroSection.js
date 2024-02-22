import React from 'react';
import '../styles/HeroSection.css';
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <div className="hero-container">
      
      <h1>CUỘC PHIÊU LƯU ĐANG CHỜ ĐỢI</h1>
      <p> Bạn còn chờ gì nữa ? </p>
      <div className="hero-btn">
      <Link to="/guides" className="navbar-link">HƯỚNG DẪN</Link>
        <Link to="/estate" className="navbar-link">THUÊ NGAY</Link>
      </div>
    </div>
  );
};

export default HeroSection;
