import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Ensure this CSS file exists for styling

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>4Rent</h4>
            <p>
              Discover your perfect vacation spot with our trusted timeshare exchange platform.
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
              123 Vacation Rd., Holiday City, XY 12345<br />
              <Link to="tel:+1234567890">(123) 456-7890</Link> {/* This will still work as a regular phone link */}
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            My sticky footer can be found here.
          </p>
          <p className="copyright">
            Copyright © 4Rent {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </footer>
  );
}
