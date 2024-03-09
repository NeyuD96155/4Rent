import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../config/axios";
import "../styles/Estate.css";

const EstateDetail = () => {
    const [estate, setEstate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { estateId } = useParams();

    useEffect(() => {
        const fetchEstateDetail = async () => {
            try {
                const response = await api.get("/showEstate");
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

        if (estateId) {
            fetchEstateDetail();
        }
    }, [estateId]);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!estate) return <div>No estate details available.</div>;

    return (
        <div className="estate-detail-container">
            <h1>{estate?.title}</h1>
            {estate?.resources?.length > 0 && (
                <img
                    src={estate.resources[0].url}
                    alt={estate.title || "Estate"}
                    className="estate-detail-image"
                />
            )}

            <p>Giá: {estate.amount}</p>
            <p>Vị trí: {estate.location}</p>
            <p>Thể loại: {estate?.category}</p>
            <p>Thời gian nhận phòng: {estate?.checkIn || "Not specified"}</p>
            <p>Thời gian trả phòng: {estate?.checkOut || "Not specified"}</p>
        </div>
    );
};

export default EstateDetail;
