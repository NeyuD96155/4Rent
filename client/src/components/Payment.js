import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Payment.css";

const timesharePrice = 200;
const serviceFee = 20;
const totalPrice = timesharePrice + serviceFee;
const Payment = () => {
    const [bookingDetails, setBookingDetails] = useState({
        startDate: "",
        endDate: "",
        guests: 1,
        paymentMethod: "creditCard",
    });

    const handleChange = (e) => {
        setBookingDetails({
            ...bookingDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handlePaymentMethodChange = (method) => {
        setBookingDetails({ ...bookingDetails, paymentMethod: method });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Booking and Payment Details:", bookingDetails);
    };

    return (
        <div className="payment-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group start-date">
                    <label>Ngày bắt đầu</label>
                    <input
                        className="date-input"
                        type="date"
                        name="startDate"
                        value={bookingDetails.startDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group end-date">
                    <label>Ngày kết thúc</label>
                    <input
                        className="date-input"
                        type="date"
                        name="endDate"
                        value={bookingDetails.endDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group guests-number">
                    <label>Số lượng khách</label>
                    <input
                        className="guests-input"
                        type="number"
                        name="guests"
                        min="1"
                        value={bookingDetails.guests}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group payment-method">
                    <label>Chọn cách thanh toán</label>
                    <select
                        className="payment-method-select"
                        value={bookingDetails.paymentMethod}
                        onChange={(e) =>
                            handlePaymentMethodChange(e.target.value)
                        }
                    >
                        <option value="creditCard">
                            Thẻ Tín Dụng/Thẻ Ghi Nợ
                        </option>
                        <option value="qrCard">Thẻ QR</option>
                    </select>

                    {bookingDetails.paymentMethod === "qrCard" ? (
                        <div className="qr-code-container">
                            <img
                                src="/path-to-qr-image.png"
                                alt="QR Code"
                                className="qr-code-image"
                            />
                        </div>
                    ) : (
                        <div className="card-info-form">
                            <input
                                className="card-input"
                                type="text"
                                name="cardNumber"
                                placeholder="Số thẻ"
                            />
                            <input
                                className="card-input"
                                type="text"
                                name="cardHolderName"
                                placeholder="Tên trên thẻ"
                            />
                            <input
                                className="card-input"
                                type="text"
                                name="expiryDate"
                                placeholder="Ngày hết hạn MM/YY"
                            />
                            <input
                                className="card-input"
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                            />
                        </div>
                    )}
                </div>

                <div className="cancellation-policy-card">
                    <div className="policy-card-body">
                        <div className="policy-card-title">Chính sách hủy</div>
                        <p className="policy-description">
                            Thông tin tóm tắt về chính sách hủy.
                        </p>
                        <Link
                            to="/cancellation-policy"
                            className="policy-more-info"
                        >
                            Tìm hiểu thêm
                        </Link>
                    </div>
                </div>

                <div className="guest-requirements-list">
                    <div className="requirement-item">
                        Chúng tôi yêu cầu tất cả khách phải ghi nhớ một số quy
                        chuẩn đơn giản để làm một vị khách tuyệt vời. Tuân thủ
                        nội quy nhà. Giữ gìn ngôi nhà như thể đó là nhà bạn.
                    </div>
                </div>

                {/* Unique class name for price details */}
                <div className="price-details-card">
                    <div className="price-card-body">
                        <div className="price-card-title">Chi tiết giá</div>
                        <p>Giá Timeshare: ${timesharePrice}</p>
                        <p>Phí Dịch Vụ: ${serviceFee}</p>
                        <p>
                            Tổng Phí: <strong>${totalPrice}</strong>
                        </p>
                    </div>
                </div>

                <button className="booking-button" type="submit">
                    Đặt phòng
                </button>
            </form>
        </div>
    );
};

export default Payment;
