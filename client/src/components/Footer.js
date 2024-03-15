import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h4>Về Chúng Tôi</h4>
                <ul>
                    <li>
                        <Link to="/about">Câu Chuyện Của 4Rent</Link>
                    </li>
                    <li>
                        <Link to="/contact">Liên Hệ</Link>
                    </li>
                    <li>
                        <Link to="/Faq">Câu hỏi thường gặp</Link>
                    </li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Chúng Tôi Cung Cấp</h4>
                <ul>
                    <li>
                        <Link to="/Policy">Chính Sách & Bảo Mật</Link>
                    </li>
                    <li>
                        <Link to="/Privacy">Quyền Riêng Tư</Link>
                    </li>
                    <li>
                        <Link to="/Rules">Điều Khoản</Link>
                    </li>
                </ul>
            </div>

            <div className="footer-section">
                <h4>Du Lịch</h4>
                <ul>
                    <li>
                        <Link to="/Blog">Các bài viết</Link>
                    </li>
                    <li>
                        <Link to="/News">Tin Tức</Link>
                    </li>
                    <li>
                        <Link to="/Guides">Hướng dẫn</Link>
                    </li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Dịch Vụ</h4>
                <ul>
                    <li>
                        <Link to="/ReportError">Báo Lỗi</Link>
                    </li>
                    <li>
                        <a href="#ask-online">Hỏi Trực Tuyến</a>
                    </li>
                    <li>
                        <Link to="/Insurance">Bảo Hiểm Du Lịch</Link>
                    </li>
                </ul>
            </div>
            <div className="footer-payment">
                <img
                    src="https://th.bing.com/th/id/OIP.3oJG6k7jSxQHmkjN9aRvNQHaDA?w=310&h=142&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt="Visa"
                />
                <img
                    src="https://logolook.net/wp-content/uploads/2021/07/Mastercard-Logo-2016.png"
                    alt="MasterCard"
                />
                <img
                    src="https://logos-world.net/wp-content/uploads/2020/05/PayPal-Logo.png"
                    alt="PayPal"
                />
            </div>
            <div className="footer-bottom">
                <p>&copy; Bản quyền 4Rent</p>
                <p>4Rent@gmail.com</p>
                <p>4Rent: Bay thả ga, không lo giá!</p>
                <p>S10.06, Thủ Đức, TP.HCM</p>
                <p>+84 83 2345 780</p>
            </div>
        </footer>
    );
};

export default Footer;
