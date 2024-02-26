import React from 'react';
import { Link } from 'react-router-dom';


const News = () => {
  const newsList = [
    {
      title: "4Rent bành trướng lãnh địa",
      description: "Mở rộng những địa điểm mới nơi mà bạn có thể tận hưởng kì nghỉ cùng với 4Rent.",
      link: "/new-locations",
      imageUrl: "https://th.bing.com/th/id/R.ab91e46b457271a578229fb6c2864ea3?rik=5sEpMC07EeuMWw&pid=ImgRaw&r=0" // Make sure the path and image exist
    },
    {
      title: "Mẹo nạp lần đầu không bị lỗ",
      description: "Mọi thứ bạn cần biết trước khi thuê timeshare để đảm bảo trải nghiệm mượt mà và thú vị.",
      link: "/timeshare-tips",
      imageUrl: "https://th.bing.com/th/id/OIP.W3R2OpRShSlLuw_RiTYcqwHaFj?w=880&h=660&rs=1&pid=ImgDetMain" // Make sure the path and image exist
    },
    {
      title: "4Rent và tầm nhìn về kì nghĩ dưỡng trong tương lai",
      description: "Cách 4Rent đang đổi mới ngành công nghiệp chia sẻ thời gian để cung cấp sự linh hoạt và lựa chọn hơn cho khách du lịch.",
      link: "/future-of-timeshare",
      imageUrl: "https://d1l18ops95qbzp.cloudfront.net/wp-content/2019/08/29155915/IMG_6737-1024x768.jpg" // Make sure the path and image exist
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
            <img className="news-image" src={item.imageUrl} alt={item.title} />
            <div className="news-body">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-text">{item.description}</p>
              <Link to={item.link} className="news-read-more">Đọc thêm</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
