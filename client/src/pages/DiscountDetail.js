import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button, List, Card } from "antd";
import "../styles/Discount.css";

const DiscountDetail = () => {
    const { state } = useLocation();
    const discount = state ? state.discount : null;
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


    if (!discount) {
        return (
            <div className="notFound">
                Không tìm thấy bài đăng! Vui lòng trở lại danh sách bài đăng.
            </div>
        );
    }

    const handleBookRoom = () => {
        navigate("/booking", { state: { discount: discount } });
    };

    const formattedDate = discount.discountDate
        ? format(new Date(discount.discountDate), "PPP")
        : "N/A";

    return (
        <>
            <div className="imageContainer">
                {discount.resources && discount.resources.length > 1 ? (
                    <>
                        <img
                            src={discount.resources[0].url}
                            alt={`Discount Large`}
                            className="discountImage largeImage"
                            onClick={() => handleImageClick(discount.resources[0].url)}
                        />
                        {discount.resources.slice(1, 5).map((resource, index) => (
                            <img
                                key={index}
                                src={resource.url}
                                alt={`Discount Small ${index}`}
                                className={`discountImage smallImage`}
                                onClick={() => handleImageClick(resource.url)}
                            />
                        ))}
                        {/* Button to open the popup */}
                        <Button onClick={handleShowPopup}>Hiển thị tất cả ảnh</Button>
                    </>
                ) : (
                    <img
                        src="https://via.placeholder.com/400"
                        alt="Discount Placeholder"
                        className="discountImage largeImage"
                        onClick={() => handleImageClick("https://via.placeholder.com/400")}
                    />
                )}
            </div>

            <center>
                <div>
                    <div className="infoContainer">
                        <h1>
                            Mã bài đăng: {discount.id} - {discount.title}
                        </h1>
                        <p>{discount.content}</p>
                        <p>
                            <strong>Giá/ ngày:</strong> ${discount.price}
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
                            dataSource={discount.amenities || []}
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
                            dataSource={discount.feedbacks || []}
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
                            {discount.resources &&
                                discount.resources.map((resource, index) => (
                                    <img
                                        key={index}
                                        src={resource.url}
                                        alt={`Discount Image ${index}`}
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

export default DiscountDetail;
