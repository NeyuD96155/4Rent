import React, { useState, useEffect } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Estate.css";
import SearchBar from "../components/SearchBar";

const EstateShow = () => {
    const [estates, setEstates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEstates = async () => {
            setIsLoading(true);
            try {
                const response = await api.get("/showEstate");
                setEstates(response.data);
            } catch (err) {
                console.error("Error fetching estates:", err);
                setError(
                    err.response?.data?.message ||
                        "Failed to load estates. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchEstates();
    }, []);

    const handleEstateClick = async (estateId) => {
        navigate(`/showEstateDetail/${estateId}`);
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0, 
        })
            .format(amount)
            .replace("₫","đ");
    };
    if (isLoading) return <div aria-live="polite">Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="timeshare-estates-container">
            <SearchBar />
            <div className="estates">
                {estates.map((estate) => (
                    <div key={estate.id} className="estate-card">
                        <button
                            style={{ all: "unset", cursor: "pointer" }}
                            onClick={() => handleEstateClick(estate.id)}
                        >
                            <img
                                className="estate-image"
                                src={
                                    estate.resources?.[0]?.url ||
                                    "placeholder_image_url"
                                }
                                alt={estate.title || "Estate"}
                            />
                            <div className="estate-info">
                                <h5>
                                    <strong>{estate.title}</strong> |{" "}
                                    {estate.location}
                                </h5>
                                <p>
                                    <strong>Giá:</strong>{" "}
                                    {formatCurrency(estate.price)}
                                </p>
                                <p>
                                    <strong>Thời gian nhận phòng: </strong>
                                    {estate.checkIn || "Not specified"}
                                </p>
                                <p>
                                    <strong>Thời gian trả phòng: </strong>
                                    {estate.checkOut || "Not specified"}
                                </p>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EstateShow;
