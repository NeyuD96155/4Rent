import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Ensure this CSS file exists for styling

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="row">
          <div className="footer-col">
            <h4>4Rent</h4>
            <p>
              Khám phá nền tảng lừa đảo lớn nhất Đông Nam á
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li> {/* Assuming you have a FAQ page */}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <p>
              Lừa đảo mà contact làm gì cha ?<br />
              <Link to="tel:+1234567890">(123) 456-7890</Link> {/* This will still work as a regular phone link */}
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
        
          </p>
          <p className="copyright">
            Copyright © 4Rent {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </footer>
  );
}
