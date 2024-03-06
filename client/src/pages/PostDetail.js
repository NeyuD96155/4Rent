import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button, List, Card } from "antd";
import "../styles/PostDetail.css";

const PostDetail = () => {
    const { state } = useLocation();
    const post = state ? state.post : null;
    const navigate = useNavigate();

    // Cuộn đầu trang khi component được render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="notFound">
                Không tìm thấy bài đăng! Vui lòng trở lại danh sách bài đăng.
            </div>
        );
    }

    const handleBookRoom = () => {
        navigate("/booking", { state: { post: post } });
    };

    const formattedDate = post.postDate
        ? format(new Date(post.postDate), "PPP")
        : "N/A";

    return (
        <>
            <div className="imageContainer">
                {post.resources && post.resources.length > 1 ? (
                    <>
                        <img
                            src={post.resources[0].url}
                            alt={`Post Large`}
                            className="postImage largeImage"
                        />
                        {post.resources.slice(1, 5).map((resource, index) => (
                            <img
                                key={index}
                                src={resource.url}
                                alt={`Post Small ${index}`}
                                className={`postImage smallImage`}
                            />
                        ))}
                    </>
                ) : (
                    <img
                        src="https://via.placeholder.com/400"
                        alt="Post Placeholder"
                        className="postImage largeImage"
                    />
                )}
            </div>

            <center>
                <div>
                    <div className="infoContainer">
                        <h1>
                            Mã bài đăng: {post.id} - {post.title}
                        </h1>
                        <p>{post.content}</p>
                        <p>
                            <strong>Giá/ ngày:</strong> ${post.price}
                        </p>
                        <p>
                            <strong>Ngày đăng:</strong> {formattedDate}
                        </p>
                    </div>

                    <div className="bookingContainer">
                        <Button type="primary" onClick={handleBookRoom}>
                            Đặt Ngay
                        </Button>
                    </div>

                    <div className="amenitiesContainer">
                        <h2>Nơi này có những gì cho bạn</h2>
                        <List
                            size="small"
                            bordered
                            dataSource={post.amenities || []}
                            renderItem={(item) => (
                                <List.Item className="listItem">{item}</List.Item>
                            )}
                        />
                        <Button onClick={() => { }}>
                            Hiển thị tất cả tiện nghi
                        </Button>
                    </div>

                    <div className="feedbackContainer">
                        <h2>Ý kiến của Khách Hàng</h2>
                        <List
                            size="small"
                            bordered
                            dataSource={post.feedbacks || []}
                            renderItem={(item) => (
                                <List.Item className="listItem">
                                    <Card
                                        title={item.author}
                                        className="feedbackCard"
                                    >
                                        {item.text}
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </center>
        </>
    );
};

export default PostDetail;
