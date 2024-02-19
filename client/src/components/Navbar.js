import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const NavigationBar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">4Rent</Link>
      </div>
      <div className="navbar-links">
        <Link to="/news" className="navbar-link">Tin Tức</Link>
        <Link to="/guides" className="navbar-link">Hướng Dẫn</Link>
        <Link to="/contact" className="navbar-link">Liên Hệ</Link>
        <Link to="/about" className="navbar-link">Về Chúng Tôi</Link>
       
        {/* User Icon with Dropdown Menu */}
        <div className="navbar-user-dropdown">
          <div className="user-icon navbar-user-icon"></div>
          <div className="dropdown-content">
            <Link to="/signin" className="dropdown-item">Đăng Nhập</Link>
            <Link to="/signup" className="dropdown-item">Đăng Kí</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
