import React, { useEffect, useState } from "react";
import {
    Form,
    Button,
    DatePicker,
    InputNumber,
    Checkbox,
    Modal,
    Card,
} from "antd";
import api from "../config/axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import "../styles/Booking.css";
import ImageGallery from "react-image-gallery";

const Booking = ({ userId }) => {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const estate = location.state?.estate;
    const [modalVisible, setModalVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = (checkIn, checkOut) => {
        const diffDays = moment(checkOut).diff(moment(checkIn), "days") + 1;
        setTotalPrice(diffDays * estate.price);
    };

    useEffect(() => {
        form.setFieldsValue({ estate: estate?.title });
    }, [estate, form]);

    const handleSubmit = async (values) => {
        const formattedValues = {
            userId,
            estateId: estate?.id,
            checkIn: moment(values.checkIn).format("YYYY-MM-DD"),
            checkOut: moment(values.checkOut).format("YYYY-MM-DD"),
            guests: values.guests,
            amount: totalPrice,
        };

        try {
            await api.post("/vn-pay", formattedValues);
            toast.success("Booking successful!");
            navigate("/confirm-booking", {
                state: { bookingInfo: formattedValues },
            });
        } catch (error) {
            toast.error(
                `Booking failed: ${
                    error.response?.data?.message || error.toString()
                }`
            );
        }
    };

    return (
        <div className="booking-container">
            {estate && (
                <div className="estate-container">
                    <h2>{estate.title}</h2>
                    {estate.resources?.length > 0 && (
                        <ImageGallery
                            items={estate.resources.map((resource) => ({
                                original: resource.url,
                                thumbnail: resource.url,
                            }))}
                        />
                    )}
                    <p>Price per night: {estate.price} VND</p>
                    <p>Location: {estate.location}</p>
                    <p>Category: {estate.category}</p>
                    <p>Max guests: {estate.amount}</p>
                    <p>Check-in: {estate.checkIn || "Not specified"}</p>
                    <p>Check-out: {estate.checkOut || "Not specified"}</p>
                </div>
            )}

            <Card
                title="Booking Details"
                bordered={false}
                className="booking-card"
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        name="checkIn"
                        label="Check-in Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            onChange={(date, dateString) =>
                                calculateTotalPrice(
                                    dateString,
                                    form.getFieldValue("checkOut")
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="checkOut"
                        label="Check-out Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            onChange={(date, dateString) =>
                                calculateTotalPrice(
                                    form.getFieldValue("checkIn"),
                                    dateString
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="guests"
                        label="Number of Guests"
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={1} max={estate?.amount} />
                    </Form.Item>
                    <Form.Item>
                        <p>Total Price: {totalPrice.toLocaleString()} VND</p>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Vui lòng đồng ý với điều khoản và chính sách.",
                            },
                        ]}
                    >
                        <Checkbox
                            onChange={(e) => setModalVisible(e.target.checked)}
                        >
                            Bằng cách tích vào hộp, bạn đồng ý với điều khoản và
                            chính sách của 4rent
                        </Checkbox>
                    </Form.Item>
                    <Modal
                        title="ĐIỀU KHOẢN VÀ CHÍNH SÁCH CỦA 4RENT"
                        visible={modalVisible}
                        onCancel={() => setModalVisible(false)}
                        footer={null}
                    >
                       <p>
                            <b>1.Phạm vi của dịch vụ: </b>
                            Trang web này cung cấp dịch vụ cho thuê timeshare,
                            giúp người dùng tìm kiếm và đặt chỗ cho những kỳ
                            nghỉ lưu trú timeshare. Dịch vụ này chỉ dành cho
                            người dùng trưởng thành. <br />
                            <b>2.Quyền và trách nhiệm của người dùng:</b> Người
                            dùng đồng ý sử dụng trang web này cho mục đích hợp
                            pháp và không vi phạm bất kỳ luật pháp nào. <br />
                            <b>3.Quyền sở hữu trí tuệ: </b> Mọi quyền sở hữu trí
                            tuệ của dữ liệu, nội dung và thiết kế của trang web
                            này đều thuộc sở hữu của chúng tôi hoặc các bên cấp
                            phép.
                            <br />
                            <b>4. Quyền và trách nhiệm của chúng tôi: </b> Chúng
                            tôi cam kết cung cấp thông tin chính xác và dịch vụ
                            chất lượng nhất có thể. Tuy nhiên, chúng tôi không
                            chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh
                            từ việc sử dụng trang web này hoặc thông tin được
                            cung cấp trên đó. <br /> <b>5. Bảo mật: </b>
                            Chúng tôi cam kết bảo vệ thông tin cá nhân của người
                            dùng và không chia sẻ thông tin này với bất kỳ bên
                            thứ ba nào mà không có sự đồng ý của người dùng.{" "}
                            <br />
                            <b>6. Thay đổi và hủy bỏ: </b> Chúng tôi có quyền
                            thay đổi hoặc hủy bỏ bất kỳ phần nào của Chính sách
                            và Điều khoản này vào bất kỳ thời điểm nào mà không
                            cần thông báo trước. <br />
                            <b>7.Liên hệ: </b>
                            Nếu có bất kỳ câu hỏi hoặc ý kiến nào về Chính sách
                            và Điều khoản này, vui lòng liên hệ với chúng tôi
                            qua{" "}
                            <a
                                href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRlQzCVVVSGFdbwBBnbTSqwqsTkqnbXNMnpbRNrbSfxMcfWzKcVxJQJNmRjcvVczQpvRRNV"
                                target="_blank"
                            >
                                4RENT
                            </a>
                        </p>
                    </Modal>
                    <Button type="primary" htmlType="submit">
                        Book Now
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Booking;
