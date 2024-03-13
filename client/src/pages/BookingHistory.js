import React, { useState, useEffect } from "react";
import api from "../config/axios";
import "../styles/BookingHistory.css";

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

    return { bookingHistory, isLoading, error, setBookingHistory };
};

const formatDate = (date) => new Date(date).toLocaleString();

const Loading = () => <div className="loading">Loading booking history...</div>;

const Error = ({ message }) => <div className="error">Error: {message}</div>;

const BookingHistory = () => {
    const { bookingHistory, isLoading, error, setBookingHistory } = useFetchBookingHistory();

    const cancelBooking = async (bookingId) => {
        try {
            await api.put(`/cancelBooking/${bookingId}`);
            const updatedBookingHistory = bookingHistory.filter(booking => booking.id !== bookingId);
            setBookingHistory(updatedBookingHistory);
        } catch (err) {
            console.error("Error canceling the booking:", err);
            alert("Failed to cancel the booking. Please try again later.");
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <Error message={error} />;

    return (
        <div className="booking-history-container">
            <h1 className="history-title">Lịch Sử Giao Dịch</h1>
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
                                <h3 className="booking-id">Mã đặt phòng: {id}</h3>
                                <h4 className="real-estate-title">
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
                                <button className="cancel-button" onClick={() => cancelBooking(id)}>Hủy đặt phòng</button>
                            </div>
                        )
                    )}
                </div>
            ) : (
                <p>Bạn chưa đặt timeshare nào.</p>
            )}
        </div>
    );
};

export default BookingHistory;
