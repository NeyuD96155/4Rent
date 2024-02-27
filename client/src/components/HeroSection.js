import React from 'react';
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__content">
        <h1 className="hero-section__title">CUỘC PHIÊU LƯU ĐANG CHỜ ĐỢI</h1>
        <p className="hero-section__subtitle">Bạn còn chờ gì nữa?</p>
        <div className="hero-section__buttons">
          <Link to="/guides" className="hero-section__button hero-section__button--guides">HƯỚNG DẪN</Link>
          <Link to="/estate" className="hero-section__button hero-section__button--rent">THUÊ NGAY</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
