import React, { useState, useEffect } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Estate.css";

const EstateShow = () => {
    const [estates, setEstates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Sử dụng hook navigate từ react-router-dom để điều hướng
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEstates = async () => {
            setIsLoading(true);
            try {
                const response = await api.get("/showEstate");
                setEstates(response.data);
            } catch (error) {
                console.error("Error fetching estates:", error);
                setError("Failed to load estates. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEstates();
    }, []);

    const handleEstateClick = (estateId) => {
        navigate(`/detail-estate/${estateId}`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="timeshare-estates-container">
            <h1>Timeshare Estates</h1>
            <div className="estates">
                {estates?.map((estate) => (
                    <div
                        key={estate.id}
                        className="estate-card"
                        onClick={() => handleEstateClick(estate.id)}
                        // Thêm style để thêm hiệu ứng khi di chuột qua
                        style={{ cursor: "pointer" }}
                    >
                        {estate.resources.length > 0 ? (
                            <img
                                className="estate-image"
                                src={estate.resources[0].url}
                                alt="Estate"
                            />
                        ) : (
                            <img
                                className="estate-image"
                                src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                                alt="Placeholder"
                            />
                        )}
                        <h2>{estate.title}</h2>
                        <p>Giá: {estate.price}</p>
                        <p>Vị trí: {estate.location}</p>
                        <p>Thể loại: {estate.category}</p>
                        <p>Thời gian nhận phòng: {estate.checkIn}</p>
                        <p>Thời gian trả phòng: {estate.checkOut}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EstateShow;
