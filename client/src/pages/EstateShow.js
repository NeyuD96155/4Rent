import React, { useState, useEffect } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Estate.css";

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
        navigate(`/detail-estate/${estateId}`);
    };

    if (isLoading) return <div aria-live="polite">Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="timeshare-estates-container">
            <h1>Timeshare Estates</h1>
            <div className="estates">
                {estates.map((estate) => (
                  <div key={estate.id} className="estate-card">
                  <button
                      style={{ all: 'unset', cursor: 'pointer' }} 
                      onClick={() => handleEstateClick(estate.id)}
                  >
                      <img
                          className="estate-image"
                          src={estate.resources?.[0]?.url || "placeholder_image_url"}
                          alt={estate.title || "Estate"}
                      />
                      <h2>{estate.title}</h2>
                      <p>Giá: {estate.amount}</p>
                      <p>Vị trí: {estate.location}</p>
                      <p>Thể loại: {estate.category}</p>
                      <p>Thời gian nhận phòng: {estate.checkIn || "Not specified"}</p>
                      <p>Thời gian trả phòng: {estate.checkOut || "Not specified"}</p>
                  </button>
              </div>
                ))}
            </div>
        </div>
    );
};

export default EstateShow;
