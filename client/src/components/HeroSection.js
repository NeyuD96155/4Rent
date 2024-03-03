import React from "react";
import "../styles/HeroSection.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const HeroSection = () => {
    return (
        <div className="hero-container">
            <h1>CUỘC PHIÊU LƯU ĐANG CHỜ ĐỢI</h1>
            <div className="hero-button">
                <SearchBar />
                <Link to="/guides" className="hero-btn">
                    HƯỚNG DẪN
                </Link>
                <Link to="/estate" className="hero-btn">
                    THUÊ NGAY
                </Link>
            </div>
        </div>
    );
};

export default HeroSection;
