import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/News.css'; 

const News = () => {
  const newsList = [
    {
      title: "4Rent Expands to New Locations",
      description: "Discover new destinations where you can enjoy your timeshare vacations with 4Rent.",
      link: "/new-locations",
      imageUrl: "./assets/news/new-locations.jpg" // Make sure the path and image exist
    },
    {
      title: "Tips for First-Time Timeshare Renters",
      description: "Everything you need to know before renting a timeshare to ensure a smooth and enjoyable experience.",
      link: "/timeshare-tips",
      imageUrl: "./assets/news/timeshare-tips.jpg" // Make sure the path and image exist
    },
    {
      title: "The Future of Timeshare Vacations with 4Rent",
      description: "How 4Rent is innovating the timeshare industry to offer more flexibility and options for travelers.",
      link: "/future-of-timeshare",
      imageUrl: "./assets/news/future-of-timeshare.jpg" // Make sure the path and image exist
    },
    {
      title: "Maximizing Your Vacation Experience with 4Rent",
      description: "Learn how to make the most out of your timeshare rentals for unforgettable vacations.",
      link: "/maximize-vacation",
      imageUrl: "./assets/news/maximize-vacation.jpg" // Make sure the path and image exist
    },
  ];

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>Latest News</h1>
      </div>
      <div className="news-grid">
        {newsList.map((item, index) => (
          <div key={index} className="news-card">
            <img className="news-image" src={item.imageUrl} alt={item.title} />
            <div className="news-body">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-text">{item.description}</p>
              <Link to={item.link} className="news-read-more">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
