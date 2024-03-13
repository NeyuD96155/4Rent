import React, { useState, useEffect } from "react";
import api from "../config/axios";
import "../styles/Wallet.css"; // Import CSS file for styling

const WalletPage = () => {
    const [walletData, setWalletData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const response = await api.get("/wallet");
                setWalletData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching wallet data:", error);
                setError(
                    error.response?.data?.message ||
                    "Failed to load wallet data. Please try again later."
                );
                setIsLoading(false);
            }
        };

        fetchWalletData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!walletData) return null;

    return (
        <center>
            <div className="wallet-container">
                <h1 className="wallet-title">Wallet Details</h1>
                <div className="wallet-info">
                    <p><span className="info-label">ID:</span> {walletData.id}</p>
                    <p><span className="info-label">Balance:</span> {walletData.balance}</p>
                    <p><span className="info-label">User ID:</span> {walletData.users.id}</p>
                    <p><span className="info-label">Username:</span> {walletData.users.username}</p>
                    <p><span className="info-label">Email:</span> {walletData.users.email}</p>
                    <p><span className="info-label">Fullname:</span> {walletData.users.fullname}</p>
                </div>
            </div>
        </center>
    );
};

export default WalletPage;
    