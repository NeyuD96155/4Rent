// HeroSection.js
import React from 'react';
import '../styles/HeroSection.css'; // Assume you have a CSS file for styling

const HeroSection = () => {
  return (
    <div className="hero-container">
      
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btn">
        <button className="btn btn-primary">GET STARTED</button>
        <button className="btn btn-outline">START TO RENT</button>
      </div>
    </div>
  );
};

export default HeroSection;
