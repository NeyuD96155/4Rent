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
              Khám phá nền tảng cho thuê lớn nhất Đông Nam Á
            </p>
          </div>
          <div className="footer-col">
            <h4>Thông tin nhanh</h4>
            <ul>
              <li><Link to="/about-us">Về chúng tôi</Link></li>
              <li><Link to="/contact">Liên Hệ</Link></li>
              <li><Link to="/faq">Các câu hỏi thường gặp</Link></li> {/* Assuming you have a FAQ page */}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Liên hệ với chúng tôi</h4>
            <p>
              Thông tin liên hệ<br />
              <Link to="tel:0832345780">083 2345 780</Link> {/* This will still work as a regular phone link */}
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
