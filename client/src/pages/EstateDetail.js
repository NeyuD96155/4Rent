import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/axios";
import "../styles/Estate.css";
import ImageGallery from "react-image-gallery";

const EstateDetail = () => {
    const [estate, setEstate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchEstateDetail = async () => {
            try {
                const response = await api.get(`/showEstateDetail/${id}`);
                setEstate(response.data);
            } catch (error) {
                console.error("Error fetching estate details:", error);
                setError(
                    error.response?.data?.message ||
                        "Có lỗi khi lấy ảnh, vui lòng thử lại sau"
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchEstateDetail();
        }
    }, [id]);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!estate) return <div>No estate details available.</div>;
    const handleBooking = () => {
        navigate('/booking', { state: { estate: estate } });
    };
    return (
        <div className="estate-detail-container">
            
            <h1>{estate?.title}</h1>
            {estate?.resources?.length > 0 && (
                <ImageGallery
                    items={estate?.resources?.map((item) => {
                        return {
                            original: item.url,
                            thumbnail: item.url,
                        };
                    })}
                />
            )}

            <p>Giá: {estate.price} vnd</p>
            <p>Vị trí: {estate.location}</p>
            <p>Thể loại: {estate.category}</p>
            <p>Số người tối đa: {estate.amount}</p>
            <p>Thời gian nhận phòng: {estate.checkIn || "Not specified"}</p>
            <p>Thời gian trả phòng: {estate.checkOut || "Not specified"}</p>
            <button onClick={handleBooking} className="booking-button">
                Đặt ngay
            </button>
        </div>
    );
};

export default EstateDetail;
