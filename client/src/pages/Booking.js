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
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import moment from "moment";
import { toast } from "react-toastify";
import "../styles/Booking.css";

const Booking = ({ userId, estateId }) => {
    const [form] = Form.useForm();
    const location = useLocation();
    const post = location.state ? location.state.post : null;
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [amount,setAmount] = useState(0);
    const onFormValuesChange = (_, allValues) => {
        const pricePerDay = post ? post.price : 0;
        const totalPrice = calculateTotalPrice(
            allValues.checkIn,
            allValues.checkOut,
            pricePerDay
        );
        setTotalPrice(totalPrice);
    };

    // Cuộn đầu trang khi component được render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const values = form.getFieldsValue(["checkIn", "checkOut", "guests"]);
        const pricePerDay = post ? post.price : 0; // Giả sử giá mỗi ngày lấy từ đối tượng post
        const totalPrice = calculateTotalPrice(
            values.checkIn,
            values.checkOut,
            pricePerDay
        );
        setTotalPrice(totalPrice);
    }, [form, post]); // Chỉ chạy khi form hoặc post thay đổi
    const calculateTotalPrice = (checkIn, checkOut, pricePerDay) => {
        if (checkIn && checkOut && pricePerDay) {
            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
            return (diffDays + 1) * pricePerDay; // Thêm 1 ngày vì ngày nhận và trả phòng tính cả hai
        }
        return 0; // Trả về 0 nếu thiếu thông tin
    };

    //Background
    useEffect(() => {
        const overlay = document.createElement("div");
        overlay.className = "bodyOverlay";
        document.body.appendChild(overlay);
        const backgroundImageUrl =
            post && post.resources && post.resources.length > 0
                ? post.resources[0].url
                : "https://via.placeholder.com/400";
        document.body.style.backgroundImage = `url('${backgroundImageUrl}')`;
        document.body.classList.add("bodyWithBackground");

        return () => {
            document.body.removeChild(overlay);
            document.body.style.backgroundImage = "";
            document.body.classList.remove("bodyWithBackground");
        };
    }, [post]);

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
    console.log(totalPrice)

            //   const response = await api.post('/vn-pay', formattedValues);
            //   toast.success("Đặt phòng thành công! Vui lòng thanh toán.");
            //   form.resetFields();
            //   navigate('/payment', { state: { bookingDetails: formattedValues, bookingResponse: response.data, postDetails: post } });
            const response = await api.post("/vn-pay", {
                date: "2024-03-02T09:55:22.304Z",
                estateId: 1,
                amount: totalPrice,
            });
            console.log(response.data);
            window.open(response.data, "_blank", "noreferrer");
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`Đặt phòng thất bại: ${errorMessage}`);
            console.log(error)
        }
    };
    return (
        <div className="booking-container">
            <div className="content-container">
                {post ? (
                    <Card
                        title={`Bạn Đang Đặt Phòng Tại Căn Hộ: ${post.title}`}
                        className="info-card"
                    >
                        <div className="post-info">

                            <div className="imageContainer">
                                <img
                                    src={
                                        post.resources &&
                                            post.resources.length > 0
                                            ? post.resources[0].url
                                            : "https://via.placeholder.com/400"
                                    }
                                    alt="Post"
                                    className="booking-postImage"
                                />
                            </div>

                            <p>Thông tin bài viết:</p>
                            <ul>
                                <li>Tiêu đề: {post.title}</li>
                                <li>Giá/ ngày: {post.price} ₫</li>
                                <li>
                                    Ngày đăng:{" "}
                                    {format(new Date(post.postDate), "PPP")}
                                </li>
                                <li>Mô tả: {post.content}</li>
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
                            name="guests"
                            label="Số lượng khách"
                            rules={[{ required: true }]}
                        >
                            <InputNumber min={1} max={10} />
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
