import React, { useState, useEffect } from "react";
import api from "../config/axios";
import "../styles/BookingHistory.css";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

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
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    })
        .format(amount)
        .replace("₫", "đ");
};
const formatDate = (date) => new Date(date).toLocaleString();

const Loading = () => (
    <div className="booking-loading">Loading booking history...</div>
);

const Error = ({ message }) => (
    <div className="booking-error">Error: {message}</div>
);

const BookingHistory = () => {
    const { bookingHistory, isLoading, error, setBookingHistory } =
        useFetchBookingHistory();

    const cancelBooking = async (bookingId) => {
        const isConfirmed = window.confirm(
            "Bạn có chắc muốn hủy đặt phòng không?"
        );
        if (!isConfirmed) {
            return;
        }
        try {
            await api.put(`/cancelBooking/${bookingId}`);
            const updatedBookingHistory = bookingHistory.filter(
                (booking) => booking.id !== bookingId
            );
            setBookingHistory(updatedBookingHistory);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <Error message={error} />;

    return (
        <div className="booking-history-container">
            <h1 className="history-title">Lịch Sử Giao Dịch</h1>
            {bookingHistory.length > 0 ? (
                <div className="booking-history">
                    {bookingHistory
                        .filter((item) => item.bookingStatus !== "CANCEL")
                        .map(
                            ({
                                id,
                                checkIn,
                                checkOut,
                                bookingDate,
                                price,
                                amount,
                                users,
                                realEstate,
                                enable,
                            }) => (
                                <div key={id} className="booking-history-entry">
                                    <h3 className="booking-id">
                                        Mã đặt phòng: {id}
                                    </h3>
                                    <h4 className="real-estate-title">
                                        <strong>{realEstate?.title} | </strong>
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
                                        <strong>Giá:</strong>{" "}
                                        {formatCurrency(price)}
                                    </p>
                                    <p>
                                        <strong>Số người tham gia:</strong>{" "}
                                        {amount}
                                    </p>
                                    <p>
                                        <strong>Đặt bởi:</strong>{" "}
                                        {users.fullname}
                                    </p>
                                    <p>
                                        <strong>Trạng thái:</strong>{" "}
                                        {enable
                                            ? "Đã hoàn thành"
                                            : "Đang chờ..."}
                                    </p>

                                    {enable ? null : (
                                        <button
                                            className="cancel-button"
                                            onClick={() => cancelBooking(id)}
                                        >
                                            Hủy đặt phòng
                                        </button>
                                    )}
                                    {/* <Link to={`/showEstateDetail/${estate.id}`}>
                                Xem chi tiết
                            </Link> */}
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
