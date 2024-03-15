import React, { useState, useEffect } from "react";
import api from "../config/axios";
import "../styles/Wallet.css"; // Import CSS file for styling
import { Table } from "antd";
import { formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";

const WalletPage = () => {
    const [walletData, setWalletData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const columns = [
        {
            title: "Mã giao dịch",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Thành tiền",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "Thời gian tạo",
            dataIndex: "createAt",
            key: "createAt",
            render: (value) =>
                formatDistance(new Date(value), new Date(), {
                    addSuffix: true,
                }),
        },
    ];

    const fetchTransaction = async () => {
        const response = await api.get("/transaction");
        setTransactions(response.data);
    };

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const response = await api.get("/wallet");
                setWalletData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Có lỗi xảy ra:", error);
                setError(
                    error.response?.data?.message ||
                        "Lấy dữ liệu ví thất bại ! Vui lòng thử lại sau!"
                );
                setIsLoading(false);
            }
        };

        fetchWalletData();
        fetchTransaction();
    }, []);

    if (isLoading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;
    if (!walletData)
        return (
            <div>
                <p>
                    Bạn chưa thuê timeshare nào !<br />
                    <button onClick={() => navigate("/show-estate")}>
                        Thuê ngay
                    </button>
                    <br />
                    <button onClick={() => navigate("/")}>
                        Trở về trang chủ
                    </button>
                </p>
            </div>
        );

    return (
        <center>
            <div className="wallet-container">
                <h1 className="wallet-title">Ví của bạn</h1>
                <div className="wallet-info">
                    <p>
                        <span className="info-label">Mã số ví:</span>{" "}
                        {walletData.id}
                    </p>
                    <p>
                        <span className="info-label">Số dư:</span>{" "}
                        {walletData.balance}
                    </p>
                    {/* <p><span className="info-label">User ID:</span> {walletData.users.id}</p>
                    <p><span className="info-label">Username:</span> {walletData.users.username}</p>
                    <p><span className="info-label">Email:</span> {walletData.users.email}</p>
                    <p><span className="info-label">Fullname:</span> {walletData.users.fullname}</p> */}
                </div>

                <Table dataSource={transactions} columns={columns} />
            </div>
        </center>
    );
};

export default WalletPage;
