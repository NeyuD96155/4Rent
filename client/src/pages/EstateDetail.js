import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../config/axios";
import "../styles/Estate.css"; // Assume you have or will create appropriate CSS

const EstateDetail = () => {
    const [estate, setEstate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Retrieve the estateId from the URL
    const { estateId } = useParams();

    useEffect(() => {
        const fetchEstateDetail = async () => {
            try {
                const response = await api.get(`/showEstate`);
                setEstate(response.data);
            } catch (error) {
                console.error("Error fetching estate details:", error);
                setError(
                    "Failed to load estate details. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchEstateDetail();
    }, [estateId]); // Re-fetch when estateId changes

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!estate) return <div>No estate details available.</div>;

    return (
        <div className="estate-detail-container">
            <h1>{estate.title}</h1>
            {estate && estate.resources && estate.resources.length > 0 && (
                <img
                    src={estate.resources[0].url}
                    alt="Estate"
                    className="estate-detail-image"
                />
            )}

            <p>Giá: {estate.price}</p>
            <p>Vị trí: {estate.location}</p>
            <p>Thể loại: {estate.category}</p>
            <p>Thời gian nhận phòng: {estate.checkIn}</p>
            <p>Thời gian trả phòng: {estate.checkOut}</p>
            {/* Include other details you wish to display */}
        </div>
    );
};

export default EstateDetail;
