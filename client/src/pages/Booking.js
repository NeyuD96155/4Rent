/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
    Form,
    Button,
    DatePicker,
    Switch,
    Card,
    InputNumber,
    Checkbox,
    Modal,
} from "antd";
import api from "../config/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import moment from "moment";
import { toast } from "react-toastify";
import "../styles/Booking.css";
import ImageGallery from "react-image-gallery";
import dayjs from "dayjs";
const Booking = ({ userId, estateId }) => {
    const [form] = Form.useForm();
    // const location = useLocation();
    // const estate = location.state ? location.state.estate : null;
    const { id } = useParams();
    const [estate, setEstate] = useState(null);
    const [amounts, setAmount] = useState(null);
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchEstateDetail = async () => {
            try {
                const response = await api.get(`/showEstateDetail/${id}`);
                setEstate(response.data);
            } catch (error) {
                console.error("Error fetching estate details:", error);
            }
        };

        if (id) {
            fetchEstateDetail();
        }
    }, [id]);

    const onFormValuesChange = (_, allValues) => {
        const pricePerDay = estate ? estate.price : 0;
        const totalPrice = calculateTotalPrice(
            allValues.checkIn,
            allValues.checkOut,
            pricePerDay
        );
        setTotalPrice(totalPrice);
    };

    useEffect(() => {
        const values = form.getFieldsValue(["checkIn", "checkOut", "amount"]);
        const pricePerDay = estate ? estate.price : 0; // Giả sử giá mỗi ngày lấy từ đối tượng estate
        const totalPrice = calculateTotalPrice(
            values.checkIn,
            values.checkOut,
            pricePerDay
        );
        setTotalPrice(totalPrice);
    }, [form, estate]); // Chỉ chạy khi form hoặc estate thay đổi
    const calculateTotalPrice = (checkIn, checkOut, pricePerDay) => {
        if (checkIn && checkOut && pricePerDay) {
            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
            return diffDays * pricePerDay; // Thêm 1 ngày vì ngày nhận và trả phòng tính cả hai
        }
        return 0; // Trả về 0 nếu thiếu thông tin
    };

    //Background
    useEffect(() => {
        const overlay = document.createElement("div");
        overlay.className = "bodyOverlay";
        document.body.appendChild(overlay);
        const backgroundImageUrl =
            estate && estate.resources && estate.resources.length > 0
                ? estate.resources[0].url
                : "https://via.placeholder.com/400";
        document.body.style.backgroundImage = `url('${backgroundImageUrl}')`;
        document.body.classList.add("bodyWithBackground");

        return () => {
            document.body.removeChild(overlay);
            document.body.style.backgroundImage = "";
            document.body.classList.remove("bodyWithBackground");
        };
    }, [estate]);

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    };
    const handleSubmit = async (values) => {
        const checkInDate = values.checkIn
            ? moment(values.checkIn).format("YYYY-MM-DDTHH:mm:ss")
            : null;
        const checkOutDate = values.checkOut
            ? moment(values.checkOut).format("YYYY-MM-DDTHH:mm:ss")
            : null;
        const bookingDate = moment().format("YYYY-MM-DDTHH:mm:ss");

        const diffTime = Math.abs(values.checkIn - values.checkOut);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const formattedValues = {
            ...values,
            userId,
            estateId,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            bookingDate: bookingDate,
            status: values.status || false,
        };

        try {
            //   const response = await api.estate('/vn-pay', formattedValues);
            //   toast.success("Đặt phòng thành công! Vui lòng thanh toán.");
            //   form.resetFields();
            //   navigate('/payment', { state: { bookingDetails: formattedValues, bookingResponse: response.data, estateDetails: estate } });
            const response = await api.post("/vn-pay", {
                date: dayjs(values.checkIn).toDate(),
                numberOfDate: diffDays,
                estateId: estate.id,
                price: totalPrice,
                amount: amounts,
            });
            console.log(response.data);
            window.open(response.data, "_self", "noreferrer");
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`Đặt phòng thất bại: ${errorMessage}`);
        }
    };

    return (
        <div className="booking-container">
            <div className="content-container">
                {estate ? (
                    <Card
                        title={`Bạn Đang Đặt: ${estate.title}`}
                        className="info-card"
                    >
                        <div className="estate-info">
                            <div className="imageContainer">
                                {estate?.resources?.length > 0 && (
                                    <ImageGallery
                                        items={estate?.resources?.map(
                                            (item) => {
                                                return {
                                                    original: item.url,
                                                    thumbnail: item.url,
                                                };
                                            }
                                        )}
                                    />
                                )}
                            </div>

                            <h3>Thông tin timeshare</h3>
                            <ul>
                                <li>
                                    <strong>Tiêu đề: </strong> {estate.title}
                                </li>
                                <li>
                                    <strong>Địa điểm: </strong>
                                    {estate.location}
                                </li>
                                <li>
                                    <strong>Thể loại: </strong>{" "}
                                    {estate.category}
                                </li>
                                <li>
                                    <strong>Mô tả: </strong>
                                    {estate.description}
                                </li>
                                <li>
                                    <strong>Giá/ngày: </strong> {estate.price}{" "}
                                    ₫/ngày
                                </li>
                                <li>
                                    <strong>Thời gian nhận phòng: </strong>{" "}
                                    {estate.checkIn}
                                </li>
                                <li>
                                    <strong>Thời gian trả phòng: </strong>{" "}
                                    {estate.checkOut}
                                </li>
                            </ul>
                        </div>
                    </Card>
                ) : (
                    <div className="notFound">
                        Thông tin căn hộ không tồn tại. Vui lòng quay lại và
                        chọn một căn hộ.
                    </div>
                )}
            </div>
            <div className="booking-form-container">
                <Card
                    title="Đặt Phòng"
                    bordered={false}
                    className="booking-card"
                >
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        onValuesChange={onFormValuesChange}
                        layout="vertical"
                    >
                        <Form.Item
                            name="checkIn"
                            label="Ngày nhận phòng"
                            rules={[{ required: true }]}
                        >
                            <DatePicker showTime format="DD-MM-YYYY HH:mm" />
                        </Form.Item>
                        <Form.Item
                            name="checkOut"
                            label="Ngày trả phòng"
                            rules={[{ required: true }]}
                        >
                            <DatePicker showTime format="DD-MM-YYYY HH:mm" />
                        </Form.Item>
                        <Form.Item
                            name="amount"
                            label="Số lượng khách"
                            rules={[{ required: true }]}
                        >
                            <InputNumber
                                min={1}
                                max={estate?.amount}
                                onChange={(value) => {
                                    setAmount(value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="Tổng số tiền">
                            <span>
                                {totalPrice.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                        </Form.Item>

                        <Form.Item
                            name="status"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject(
                                                new Error(
                                                    "Vui lòng đồng ý với điều khoản và chính sách."
                                                )
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Checkbox onChange={handleCheckboxChange}>
                                Bằng cách tích vào hộp, bạn đồng ý với{" "}
                                <a
                                    className="blue-link"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setModalVisible(true);
                                    }}
                                >
                                    điều khoản và chính sách
                                </a>{" "}
                                của 4rent
                            </Checkbox>
                        </Form.Item>

                        <Modal
                            title="ĐIỀU KHOẢN VÀ CHÍNH SÁCH CỦA 4RENT"
                            visible={modalVisible}
                            onCancel={() => setModalVisible(false)}
                            footer={null}
                        >
                            {/* Nội dung điều khoản và chính sách của bạn ở đây */}

                            <p>
                                <b>1.Phạm vi của dịch vụ: </b>
                                Trang web này cung cấp dịch vụ cho thuê
                                timeshare, giúp người dùng tìm kiếm và đặt chỗ
                                cho những kỳ nghỉ lưu trú timeshare. Dịch vụ này
                                chỉ dành cho người dùng trưởng thành. <br />
                                <b>
                                    2.Quyền và trách nhiệm của người dùng:
                                </b>{" "}
                                Người dùng đồng ý sử dụng trang web này cho mục
                                đích hợp pháp và không vi phạm bất kỳ luật pháp
                                nào. <br />
                                <b>3.Quyền sở hữu trí tuệ: </b> Mọi quyền sở hữu
                                trí tuệ của dữ liệu, nội dung và thiết kế của
                                trang web này đều thuộc sở hữu của chúng tôi
                                hoặc các bên cấp phép.
                                <br />
                                <b>
                                    4. Quyền và trách nhiệm của chúng tôi:{" "}
                                </b>{" "}
                                Chúng tôi cam kết cung cấp thông tin chính xác
                                và dịch vụ chất lượng nhất có thể. Tuy nhiên,
                                chúng tôi không chịu trách nhiệm về bất kỳ thiệt
                                hại nào phát sinh từ việc sử dụng trang web này
                                hoặc thông tin được cung cấp trên đó. <br />{" "}
                                <b>5. Bảo mật: </b>
                                Chúng tôi cam kết bảo vệ thông tin cá nhân của
                                người dùng và không chia sẻ thông tin này với
                                bất kỳ bên thứ ba nào mà không có sự đồng ý của
                                người dùng. <br />
                                <b>6. Thay đổi và hủy bỏ: </b> Chúng tôi có
                                quyền thay đổi hoặc hủy bỏ bất kỳ phần nào của
                                Chính sách và Điều khoản này vào bất kỳ thời
                                điểm nào mà không cần thông báo trước. <br />
                                <b>7.Liên hệ: </b>
                                Nếu có bất kỳ câu hỏi hoặc ý kiến nào về Chính
                                sách và Điều khoản này, vui lòng liên hệ với
                                chúng tôi qua{" "}
                                <a
                                    href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRlQzCVVVSGFdbwBBnbTSqwqsTkqnbXNMnpbRNrbSfxMcfWzKcVxJQJNmRjcvVczQpvRRNV"
                                    target="_blank"
                                >
                                    4RENT
                                </a>
                            </p>
                        </Modal>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-button"
                            >
                                Đặt Phòng
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Booking;
