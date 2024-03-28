import React, { useState, useEffect } from "react";
import api from "../config/axios";
import { Link } from "react-router-dom";
import "../styles/UsersEstate.css";
import { useNavigate } from "react-router-dom";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
const UserEstate = () => {
    const [estates, setEstates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEstates = async () => {
            setIsLoading(true);
            const fetchStartTime = Date.now();
            try {
                const response = await api.get("/allRealEstateOfCurrentUser");
                const uniqueEstatesMap = new Map(
                    response.data.map((estate) => [estate.id, estate])
                );
                const uniqueEstates = Array.from(uniqueEstatesMap.values());
                setEstates(uniqueEstates);
            } catch (error) {
                console.error("Error fetching estates:", error);
            } finally {
                const fetchEndTime = Date.now();
                const loadTime = fetchEndTime - fetchStartTime;
                if (loadTime < 1000) {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000 - loadTime);
                } else {
                    setIsLoading(false);
                }
            }
        };

        fetchEstates();
    }, []);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        })
            .format(amount)
            .replace("₫", "đ");
    };
    if (isLoading) {
        return (
            <div className="loader-container">
                <ClimbingBoxLoader color="#000000" size={30} />
            </div>
        );
    }

    return (
        <div>
            <h1>Căn hộ nghỉ dưỡng của bạn</h1>
            <div className="estates-list">
                {estates.length > 0 ? (
                    estates.map((estate) => (
                        <div key={estate.id} className="estate-item">
                            <h2>{estate.title}</h2>
                            <img
                                src={estate.resources[0]?.url}
                                alt="Estate"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />

                            <div>
                                <strong>Loại Hình:</strong> {estate.category}
                            </div>
                            <div>
                                <strong>Địa điểm:</strong> {estate.location}
                            </div>
                            <div>
                                <strong>Số lượng người tham gia tối đa:</strong>{" "}
                                {estate.amount}
                            </div>
                            <div>
                                <strong>Giá/ngày:</strong>{" "}
                                {formatCurrency(estate.price)}
                            </div>
                            <div>
                                <strong>Thời gian nhận phòng:</strong>{" "}
                                {estate.checkIn}
                            </div>
                            <div>
                                <strong>Thời gian trả phòng:</strong>{" "}
                                {estate.checkOut}
                            </div>
                            <br />
                            <Link to={`/showEstateDetail/${estate.id}`}>
                                Xem chi tiết
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="no-timeshare-message">
                        <p>Bạn chưa đăng timeshare nào!</p>
                        <button onClick={() => navigate("/estate-form")}>
                            Đăng ngay
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserEstate;
