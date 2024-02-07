import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h4>Về chúng tôi</h4>
                <ul>
                    <li>
                        <Link to="/our-story">Câu chuyện của 4Rent</Link>
                    </li>
                    <li>
                        <Link to="/contact1">Liên Hệ</Link>
                    </li>
                    <li>
                        <Link to="/privacy-policy">Chính sách & Bảo mật</Link>
                    </li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Chúng tôi cung cấp</h4>
                <ul>
                    <li>
                        <a href="#sponsorship">Tài trợ chuyến đi</a>
                    </li>
                    <li>
                        <a href="#last-minute-flights">Chuyến bay phút chót</a>
                    </li>
                    <li>
                        <a href="#best-deals">Ưu đãi tốt nhất</a>
                    </li>
                </ul>
            </div>

            <div className="footer-section">
                <h4>Blog du lịch</h4>
                <ul>
                    <li>
                        <a href="#bali">Hướng dẫn du lịch Nha Trang</a>
                    </li>
                    <li>
                        <a href="#sri">Hướng dẫn du lịch Đà Nẵng</a>
                    </li>
                    <li>
                        <a href="#peru">Hướng dẫn du lịch Hạ Long</a>
                    </li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Dịch vụ</h4>
                <ul>
                    <li>
                        <a href="#report-error">Báo lỗi</a>
                    </li>
                    <li>
                        <a href="#ask-online">Hỏi trực tuyến</a>
                    </li>
                    <li>
                        <a href="#insurance">Bảo hiểm du lịch</a>
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
