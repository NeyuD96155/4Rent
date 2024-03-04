import React from "react";
import { Link } from "react-router-dom";
import "../styles/News.css";

const News = () => {
    const newsList = [
        {
            title: "4Rent bành trướng lãnh địa",
            description:
                "Mở rộng những địa điểm mới nơi mà bạn có thể tận hưởng kì nghỉ cùng với 4Rent.",
            link: "/new-locations",
            imageUrl:
                "https://th.bing.com/th/id/R.ab91e46b457271a578229fb6c2864ea3?rik=5sEpMC07EeuMWw&pid=ImgRaw&r=0", // Make sure the path and image exist
        },
        {
            title: "Mẹo nạp lần đầu không bị lỗ",
            description:
                "Mọi thứ bạn cần biết trước khi thuê timeshare để đảm bảo trải nghiệm mượt mà và thú vị.",
            link: "/timeshare-tips",
            imageUrl:
                "https://th.bing.com/th/id/OIP.W3R2OpRShSlLuw_RiTYcqwHaFj?w=880&h=660&rs=1&pid=ImgDetMain", // Make sure the path and image exist
        },
        {
            title: "4Rent và tầm nhìn về kì nghĩ dưỡng trong tương lai",
            description:
                "Cách 4Rent đang đổi mới ngành công nghiệp chia sẻ thời gian để cung cấp sự linh hoạt và lựa chọn hơn cho khách du lịch.",
            link: "/future-of-timeshare",
            imageUrl:
                "https://d1l18ops95qbzp.cloudfront.net/wp-content/2019/08/29155915/IMG_6737-1024x768.jpg", // Make sure the path and image exist
        },
        {
            title: "Đổi Mới Cách Bạn Nghĩ Về Timeshare: Lựa Chọn Linh Hoạt Hơn",
            description:
                "Khám phá cách 4Rent đang tái định nghĩa trải nghiệm timeshare với các gói lựa chọn linh hoạt, cho phép bạn tùy chỉnh kỳ nghỉ của mình như chưa từng có.",
            link: "/flexible-timeshare-options",
            imageUrl:
                "https://www.timeshare.com/content/dam/timeshare/resources/timeshare-ownership/new-timeshare-exit-website-1990x810.jpg",
        },
        {
            title: "4Rent: Kết Nối Cộng Đồng và Tạo Dựng Kỷ Niệm",
            description:
                "Hãy cùng 4Rent tạo dựng kỷ niệm không bao giờ quên thông qua một cộng đồng timeshare độc đáo, nơi mỗi kỳ nghỉ mang lại cái nhìn mới mẻ về văn hóa và sự kết nối.",
            link: "/community-driven-timeshare",
            imageUrl:
                "https://th.bing.com/th/id/OIP.v2Ai1DTbgtip9vahtvpHDgHaEh?rs=1&pid=ImgDetMain",
        },
        {
            title: "Bền Vững Trong Mỗi Chuyến Đi: 4Rent và Cam Kết Môi Trường",
            description:
                "Tìm hiểu về sáng kiến của 4Rent trong việc đảm bảo mỗi kỳ nghỉ timeshare không chỉ đáng nhớ mà còn thân thiện với môi trường, từ việc giảm thiểu rác thải đến việc sử dụng năng lượng tái tạo.",
            link: "/sustainable-timeshare-travel",
            imageUrl:
                "https://th.bing.com/th/id/R.52f6850d71c08503d408541823d993a4?rik=B7mrdgvUSjVy5g&riu=http%3a%2f%2fresortexit.com%2fwp-content%2fuploads%2f2018%2f02%2freality-of-timeshares.jpg&ehk=PVTdEkAY6LnNZDLCRaHVeoXBFOxhjfSB5aZvaV5pxlI%3d&risl=&pid=ImgRaw&r=0",
        },
    ];

    return (
        <div className="news-container">
            <div className="news-header">
                <h1>TIN MỚI NHẤT</h1>
            </div>
            <div className="news-grid">
                {newsList.map((item, index) => (
                    <div key={index} className="news-card">
                        <img
                            className="news-image"
                            src={item.imageUrl}
                            alt={item.title}
                        />
                        <div className="news-body">
                            <h2 className="news-title">{item.title}</h2>
                            <p className="news-text">{item.description}</p>
                            <Link to={item.link} className="news-read-more">
                                Đọc thêm
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
