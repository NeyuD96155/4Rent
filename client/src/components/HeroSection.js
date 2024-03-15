import React, { useEffect, useState } from "react";
import "../styles/HeroSection.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext ";
import BeginTour from "./BeginTour";

const HeroSection = () => {
    const { isLoggedIn } = useAuth();
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        // Kiểm tra nếu người dùng đã đăng nhập và đây là lần đầu tiên họ truy cập
        const isFirstVisit =
            isLoggedIn && !localStorage.getItem("hasLoggedInBefore");
        setShowTour(isFirstVisit);

        // Đánh dấu rằng người dùng đã bắt đầu lần truy cập đầu tiên nếu có thể áp dụng
        if (isFirstVisit) {
            localStorage.setItem("hasLoggedInBefore", "true");
        }
    }, [isLoggedIn]);
    return (
        <div className="hero-container">
                        {showTour && <BeginTour />}
            <h1>CUỘC PHIÊU LƯU ĐANG CHỜ ĐỢI</h1>
            <div className="hero-button">
                <Link to="/guides" className="hero-btn">
                    HƯỚNG DẪN
                </Link>
                <Link to="/show-estate" className="hero-btn">
                    THUÊ NGAY
                </Link>
            </div>
        </div>
    );
};

export default HeroSection;
