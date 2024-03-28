import React, { useState, useEffect } from "react";
import api from "../config/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Estate.css";

const EstateOutstanding = () => {
    const [highPriceEstates, setHighPriceEstates] = useState([]);
    const [lowPriceEstates, setLowPriceEstates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showMoreHigh, setShowMoreHigh] = useState(false);
    const [showMoreLow, setShowMoreLow] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchEstates();
    }, []);

    const fetchEstates = async (search = "") => {
        setIsLoading(true);
        try {
            const response = await api.get(`/search?query=${search}`);
            const approvedEstates = response.data.filter(estate => estate.estateStatus === "APPROVED");
            
            // Sort by price in descending order for high price estates
            approvedEstates.sort((a, b) => b.price - a.price);
            const highPrice = approvedEstates.slice(0, 4);

            // Sort by price in ascending order for low price estates
            approvedEstates.sort((a, b) => a.price - b.price);
            const lowPrice = approvedEstates.slice(0, 4);

            setShowMoreHigh(approvedEstates.length > 4);
            setShowMoreLow(approvedEstates.length > 4);

            setHighPriceEstates(highPrice);
            setLowPriceEstates(lowPrice);
        } catch (err) {
            console.error("Error fetching estates: ", err);
            setError(err.response?.data?.message || "Failed to fetch estates.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEstateClick = estateId => {
        navigate(`/showEstateDetail/${estateId}`);
    };

    const formatCurrency = amount => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })
            .format(amount)
            .replace("₫", "đ");
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const EstateList = ({ estates, title, showMore }) => (
        <>
            <h2>{title}</h2>
            <div className="estates">
                {estates.map(estate => (
                    <div key={estate.id} className="estate-card" onClick={() => handleEstateClick(estate.id)}>
                        <img
                            className="estate-image"
                            src={estate.resources?.[0]?.url || "placeholder_image_url"}
                            alt={estate.title || "Estate"}
                        />
                        <div className="estate-info">
                            <h5><strong>{estate.title}</strong> | {estate.location}</h5>
                            <p><strong>Giá:</strong> {formatCurrency(estate.price)}</p>
                        </div>
                    </div>
                ))}
            </div>
            {showMore && <Link to="/show-estate" className="hero-btn">Xem Thêm</Link>}
        </>
    );

    return (
        <div className="timeshare-estates-container estate-show-container">
            <EstateList estates={highPriceEstates} title="Căn hộ có giá cao nhất" showMore={showMoreHigh} />
            <EstateList estates={lowPriceEstates} title="Căn hộ có giá thấp nhất" showMore={showMoreLow} />
        </div>
    );
};

export default EstateOutstanding;
