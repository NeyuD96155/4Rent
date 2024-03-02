import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button, List, Card } from 'antd';
import '../styles/PostDetail.css';

const PostDetail = () => {
    const { state } = useLocation();
    const post = state ? state.post : null;
    const navigate = useNavigate();

    useEffect(() => {
        const overlay = document.createElement('div');
        overlay.className = 'bodyOverlay';
        document.body.appendChild(overlay);
        const backgroundImageUrl = post && post.resources && post.resources.length > 0 ? post.resources[0].url : "https://via.placeholder.com/400";
        document.body.style.backgroundImage = `url('${backgroundImageUrl}')`;
        document.body.classList.add('bodyWithBackground');

        return () => {
            document.body.removeChild(overlay);
            document.body.style.backgroundImage = '';
            document.body.classList.remove('bodyWithBackground');
        };
    }, [post]);


    if (!post) {
        return <div className="notFound">Post not found. Please go back to the posts list.</div>;
    }

    const handleBookRoom = () => {
        navigate('/booking', { state: { post: post } });
    };


    const formattedDate = post.postDate ? format(new Date(post.postDate), 'PPP') : 'N/A';

    return (
        <Card className="cardContainer">
            <div className="container">
                <div className="imageContainer">
                    <img
                        src={post.resources && post.resources.length > 0 ? post.resources[0].url : "https://via.placeholder.com/400"}
                        alt="Post"
                        className="postImage"
                    />
                </div>

                <div>
                    <div className="infoContainer">
                        <h1>Post ID: {post.id} - {post.title}</h1>
                        <p>{post.content}</p>
                        <p><strong>Price:</strong> ${post.price}</p>
                        <p><strong>Date Posted:</strong> {formattedDate}</p>
                    </div>

                    <div className="bookingContainer">
                        <Button type="primary" onClick={handleBookRoom}>Đặt Ngay</Button>
                    </div>

                    <div className="amenitiesContainer">
                        <h2>Nơi này có những gì cho bạn</h2>
                        <List
                            size="small"
                            bordered
                            dataSource={post.amenities || []}
                            renderItem={item => <List.Item className="listItem">{item}</List.Item>}
                        />
                        <Button onClick={() => { }}>Hiển thị tất cả tiện nghi</Button>
                    </div>

                    <div className="feedbackContainer">
                        <h2>Feedback của Khách Hàng</h2>
                        <List
                            size="small"
                            bordered
                            dataSource={post.feedbacks || []}
                            renderItem={item => (
                                <List.Item className="listItem">
                                    <Card title={item.author} className="feedbackCard">{item.text}</Card>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default PostDetail;
