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
        <Link to="/news" className="navbar-link">News</Link>
        <Link to="/guides" className="navbar-link">Guides</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
        <Link to="/about" className="navbar-link">About Us</Link>
       
        {/* User Icon with Dropdown Menu */}
        <div className="navbar-user-dropdown">
          <div className="user-icon navbar-user-icon"></div>
          <div className="dropdown-content">
            <Link to="/signin" className="dropdown-item">Login</Link>
            <Link to="/signup" className="dropdown-item">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
