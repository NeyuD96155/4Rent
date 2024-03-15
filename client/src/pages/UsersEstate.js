import React, { useState, useEffect } from "react";
import api from "../config/axios";
import { Link } from "react-router-dom";
import "../styles/UsersEstate.css";
import { useNavigate } from "react-router-dom";
const UserEstate = () => {
    const [estates, setEstates] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEstates = async () => {
            try {
                const response = await api.get("/allRealEstateOfCurrentUser");
                // Sử dụng Map để loại bỏ trùng lặp và giữ lại bản ghi đầu tiên của mỗi ID duy nhất
                const uniqueEstatesMap = new Map(
                    response.data.map((estate) => [estate.id, estate])
                );
                // Chuyển Map trở lại thành array để set state
                const uniqueEstates = Array.from(uniqueEstatesMap.values());
                setEstates(uniqueEstates);
            } catch (error) {
                console.error("Error fetching estates:", error);
            }
        };

        fetchEstates();
    }, []);

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
                            <p>{estate.description}</p>
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
                                <strong>Giá/ngày:</strong> {estate.price}
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
                    <p>
                        Bạn chưa đăng timeshare nào !<br />
                        <button onClick={() => navigate("/estate-form")}>
                            Đăng ngay
                        </button>
                        <br />
                        <button onClick={() => navigate("/signup")}>
                            Đăng kí member để có thể trở thành chủ sở hữu
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserEstate;
