import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "../styles/Success.css"; 
import api from "../config/axios";
const Success = () => {
    const [order, setOrder] = useState();
    const fetchOrder = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("vnp_TxnRef");
        const response = await api.get(`/success?vnp_TxnRef=${orderId}`);
        console.log(response);
        setOrder(response.data);
    };
    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <div className="success-container">
            <h1>Thanh toán thành công!</h1>
            <div className="payment-info">
                <h2>Thông tin thanh toán:</h2>
                <p className="transaction-id">Mã GD: {order?.id}</p>
                <p className="amount">Số tiền: {order?.price}</p>
                <p className="amount">Số người tham gia: {order?.amount}</p>
            </div>
            <Link to="/booking-history" className="booking-history-link">
                Xem lịch sử đặt phòng
            </Link>
        </div>
    );
};

export default Success;
