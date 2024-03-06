import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button, List, Card } from "antd";
import "../styles/PostDetail.css";

const PostDetail = () => {
    const { state } = useLocation();
    const post = state ? state.post : null;
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    // Cuộn đầu trang khi component được render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Đảm bảo popup đang hiển thị và kiểm tra nếu click bên ngoài popup
            if (showPopup && !document.querySelector(".popup-content").contains(event.target)) {
                handleClosePopup(); // Đóng popup
            }
        };

        if (showPopup) {
            // Thêm sự kiện khi popup hiển thị
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            // Dọn dẹp sự kiện khi component unmount hoặc popup không còn hiển thị
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [showPopup]); // Rerun effect khi showPopup thay đổi


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
                            onClick={() => handleImageClick(post.resources[0].url)}
                        />
                        {post.resources.slice(1, 5).map((resource, index) => (
                            <img
                                key={index}
                                src={resource.url}
                                alt={`Post Small ${index}`}
                                className={`postImage smallImage`}
                                onClick={() => handleImageClick(resource.url)}
                            />
                        ))}
                        {/* Button to open the popup */}
                        <Button onClick={handleShowPopup}>Hiển thị tất cả ảnh</Button>
                    </>
                ) : (
                    <img
                        src="https://via.placeholder.com/400"
                        alt="Post Placeholder"
                        className="postImage largeImage"
                        onClick={() => handleImageClick("https://via.placeholder.com/400")}
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
            {/* Popup hiển thị tất cả ảnh */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <button className="close" onClick={handleClosePopup}>
                            Đóng
                        </button>
                        <h2>Tất cả ảnh</h2>
                        <div className="imagesGrid">
                            {post.resources &&
                                post.resources.map((resource, index) => (
                                    <img
                                        key={index}
                                        src={resource.url}
                                        alt={`Post Image ${index}`}
                                        className="imageModalStyle"
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Modal hiển thị ảnh chi tiết */}
            {
                selectedImage && (
                    <div className="imageDetailModal">
                        <div className="modalContent">
                            <img src={selectedImage} alt="Selected" className="expandedImage" />
                            <button className="closeModal" onClick={() => setSelectedImage(null)}>Đóng</button>
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default PostDetail;
