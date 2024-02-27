import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row } from 'antd';

const News = () => {
    const newsList = [
        {
            title: "4Rent Expands Territories",
            description:
                "Explore new locations where you can enjoy vacations with 4Rent.",
            link: "/new-locations",
            imageUrl:
                "https://th.bing.com/th/id/R.ab91e46b457271a578229fb6c2864ea3?rik=5sEpMC07EeuMWw&pid=ImgRaw&r=0",
        },
        {
            title: "First-time Booking Tips to Avoid Loss",
            description:
                "Everything you need to know before renting a timeshare to ensure a smooth and enjoyable experience.",
            link: "/timeshare-tips",
            imageUrl:
                "https://th.bing.com/th/id/OIP.W3R2OpRShSlLuw_RiTYcqwHaFj?w=880&h=660&rs=1&pid=ImgDetMain",
        },
        {
            title: "4Rent and the Future Vision of Vacation Rentals",
            description:
                "How 4Rent is innovating the timeshare industry to offer more flexibility and choice for travelers.",
            link: "/future-of-timeshare",
            imageUrl:
                "https://d1l18ops95qbzp.cloudfront.net/wp-content/2019/08/29155915/IMG_6737-1024x768.jpg",
        },
    ];

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {newsList.map((news, index) => (
                    <Col span={8} key={index}>
                        <Card
                            hoverable
                            cover={<img alt={news.title} src={news.imageUrl} />}
                        >
                            <Card.Meta title={news.title} description={news.description} />
                            <br />
                            <Link to={news.link}>Read More</Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default News;
