import React from "react";
import { Link } from "react-router-dom";
import "../styles/Guide.css";

const Guides = () => {
    const guideList = [
        {
            title: "Chuẩn bị cho 4Rent",
            description:
                "Hướng dẫn sử dụng nền tảng 4Rent từng bước cho người mới bắt đầu",
            link: "/getting-started",
            imageUrl: "./assets/img/i2.jpg",
        },
        {
            title: "Làm sao để thuê kì nghỉ ?",
            description: "Hướng dẫn cách thuê kì nghỉ một cách dễ dàng",
            link: "/exchange-timeshares",
            imageUrl: "./assets/img/i3.jpg",
        },
        {
            title: "Nâng cao tối đa trải nghiệm của bạn",
            description: "Các mẹo để lựa chọn kì nghỉ hợp lí.",
            link: "/maximize-vacation",
            imageUrl: "./assets/img/i5.jpg",
        },
    ];

    return (
        <div className="guide-container">
            <div className="guide-header">
                <h1>HƯỚNG DẪN</h1>
            </div>
            <div className="guide-grid">
                {guideList.map((guide, index) => (
                    <div key={index} className="guide-card">
                        <img
                            className="guide-image"
                            src={guide.imageUrl}
                            alt={`${guide.title}`}
                        />
                        <div className="guide-body">
                            <h2 className="guide-title">{guide.title}</h2>
                            <p className="guide-text">{guide.description}</p>
                            <Link to={guide.link} className="guide-read-more">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Guides;
