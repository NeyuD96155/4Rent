import React, { useState, useEffect } from "react";
import api from "../config/axios";
import "../styles/BookingHistory.css";

// Custom Hook
const useFetchBookingHistory = () => {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookingHistory = async () => {
            setIsLoading(true);
            try {
                const response = await api.get("/showBookingHistory");
                setBookingHistory(response.data);
            } catch (err) {
                console.error("Error fetching booking history:", err);
                setError(
                    err.response?.data?.message ||
                        "Failed to load booking history. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookingHistory();
    }, []);

    return { bookingHistory, isLoading, error };
};

// Utility for date formatting
const formatDate = (date) => new Date(date).toLocaleString();

// Loading Component
const Loading = () => <div className="loading">Loading booking history...</div>;

// Error Component
const Error = ({ message }) => <div className="error">Error: {message}</div>;

const BookingHistory = () => {
    const { bookingHistory, isLoading, error } = useFetchBookingHistory();

    if (isLoading) return <Loading />;
    if (error) return <Error message={error} />;

    return (
        <div className="booking-history-container">
            <h1>Lịch Sử Giao Dịch</h1>
            {bookingHistory.length > 0 ? (
                <div className="booking-history">
                    {bookingHistory.map(
                        ({
                            id,
                            checkIn,
                            checkOut,
                            bookingDate,
                            price,
                            amount,
                            users,
                            realEstate,
                        }) => (
                            <div key={id} className="booking-history-entry">
                                <h3>Mã đặt phòng: {id}</h3>
                                <h4>
                                    <strong>{realEstate.title} | </strong>
                                </h4>
                                <p>
                                    <strong>Ngày nhận phòng:</strong>{" "}
                                    {formatDate(checkIn)}
                                </p>
                                <p>
                                    <strong>Ngày trả phòng:</strong>{" "}
                                    {formatDate(checkOut)}
                                </p>
                                <p>
                                    <strong>Ngày đặt phòng:</strong>{" "}
                                    {formatDate(bookingDate)}
                                </p>
                                <p>
                                    <strong>Price:</strong> {price}
                                </p>
                                <p>
                                    <strong>Amount:</strong> {amount}
                                </p>
                                <p>
                                    <strong>Booked by:</strong> {users.fullname}
                                </p>
                            </div>
                        )
                    )}
                </div>
            ) : (
                <p>No booking history found.</p>
            )}
        </div>
    );
};

export default BookingHistory;
