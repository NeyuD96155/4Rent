/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/axios";
import "../styles/Estate.css";
import ImageGallery from "react-image-gallery";
import { Button, Modal, Table } from "antd";
import { formatDistance } from "date-fns";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAuth } from "../context/AuthContext ";
import { toast } from "react-toastify";

const EstateDetail = () => {
    const { isProfileUpdated } = useAuth();
    const { userRole } = useAuth();
    const [estate, setEstate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const fetchEstateDetail = async () => {
        try {
            const response = await api.get(`/showEstateDetail/${id}`);
            setEstate(response.data);
        } catch (error) {
            console.error("Error fetching estate details:", error);
            setError(
                error.response?.data?.message ||
                    "Có lỗi khi lấy ảnh, vui lòng thử lại sau"
            );
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (id) {
            fetchEstateDetail();
        }
    }, [id]);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!estate) return <div>No estate details available.</div>;
    const handleBooking = () => {
        if (isProfileUpdated) {
            navigate(`/booking/${id}`);
        } else {
            toast.info(
                "Bạn cần cập nhật thông tin đầy đủ để có thể đặt căn hộ"
            );
            navigate("/profile");
        }
    };

    const columns = [
        {
            title: "Người Đặt",
            dataIndex: "users",
            key: "fullname",
            render: (users) => users.fullname,
        },
        {
            title: "Ngày Đặt",
            dataIndex: "bookingDate",
            key: "bookingDate",
            render: (value) => {
                return formatDistance(new Date(value), new Date(), {
                    addSuffix: true,
                });
            },
        },
        {
            title: "Trạng Thái",
            dataIndex: "bookingStatus",
            key: "bookingStatus",
        },
        {
            title: "Ngày Nhận Phòng",
            dataIndex: "checkIn",
            key: "checkIn",
            render: (value) => {
                dayjs.extend(utc);

                return dayjs.utc(value).format("hh:mm A");
            },
        },
        {
            title: "Ngày Trả Phòng",
            dataIndex: "checkOut",
            key: "checkOut",
            render: (value) => {
                dayjs.extend(utc);
                return dayjs.utc(value).format("hh:mm A");
            },
        },
        {
            title: "Duyệt",
            dataIndex: "id",
            key: "id",
            render: (value, record) => {
                return (
                    <>
                        {record.bookingStatus === "ACTIVE" && (
                            <Button
                                type="primary"
                                onClick={async () => {
                                    await api.put(`/finishBooking/${value}`);
                                    fetchEstateDetail();
                                }}
                            >
                                Finish
                            </Button>
                        )}
                    </>
                );
            },
        },
    ];
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        })
            .format(amount)
            .replace("₫", "đ");
    };
    return (
        <div className="estate-detail-container">
            {estate?.resources?.length > 0 && (
                <ImageGallery
                    items={estate?.resources?.map((item) => {
                        return {
                            original: item.url,
                            thumbnail: item.url,
                        };
                    })}
                />
            )}
            <p>
                <strong>Tiêu đề: </strong> {estate.title}
            </p>
            <p>
                <strong>Giá/ngày: </strong> {formatCurrency(estate.price)}
            </p>
            <p>
                {" "}
                <strong>Địa điểm: </strong>
                {estate.location}
            </p>
            <p>
                {" "}
                <strong>Thể loại: </strong> {estate.category}
            </p>
            <p>
                <strong>Mô tả: </strong>
                <span
                    style={{
                        maxWidth: "100%",
                        overflowWrap: "break-word",
                    }}
                >
                    {estate.description}
                </span>
            </p>
            <p>
                <strong>Số người tối đa: </strong> {estate.amount}
            </p>
            <p>
                <strong>Thời gian nhận phòng: </strong>{" "}
                {estate.checkIn || "Not specified"}
            </p>
            <p>
                {" "}
                <strong>Thời gian trả phòng: </strong>{" "}
                {estate.checkOut || "Not specified"}
            </p>
            {estate.users.username === username ? (
                <button
                    onClick={() => {
                        setShowModal(true);
                    }}
                    className="booking-button"
                >
                    Thông tin/ trạng thái
                </button>
            ) : (
                userRole !== "ADMIN" && (
                    <button onClick={handleBooking} className="booking-button">
                        Đặt ngay
                    </button>
                )
            )}

            <Modal
                width={1000}
                open={showModal}
                onCancel={() => {
                    setShowModal(false);
                }}
            >
                <Table
                    columns={columns}
                    dataSource={estate.bookings.sort(
                        (item1, item2) =>
                            new Date(item1.bookingDate) -
                            new Date(item2.bookingDate)
                    )}
                />
            </Modal>
        </div>
    );
};

export default EstateDetail;
