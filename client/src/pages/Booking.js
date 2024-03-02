import React, { useEffect, useState } from 'react';
import { Form, Button, DatePicker, Switch, Card, InputNumber } from 'antd';
import api from '../config/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import moment from 'moment';
import { toast } from "react-toastify";
import '../styles/Booking.css';

const Booking = ({ userId, estateId }) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const post = location.state ? location.state.post : null;
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const onFormValuesChange = (_, allValues) => {
    const pricePerDay = post ? post.price : 0;
    const totalPrice = calculateTotalPrice(allValues.checkIn, allValues.checkOut, pricePerDay);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    const values = form.getFieldsValue(['checkIn', 'checkOut', 'guests']);
    const pricePerDay = post ? post.price : 0; // Giả sử giá mỗi ngày lấy từ đối tượng post
    const totalPrice = calculateTotalPrice(values.checkIn, values.checkOut, pricePerDay);
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
    const overlay = document.createElement('div');
    overlay.className = 'bodyOverlay';
    document.body.appendChild(overlay);
    const backgroundImageUrl = post && post.resources && post.resources.length > 0 ? post.resources[0].url : "https://via.placeholder.com/400";
    document.body.style.backgroundImage = `url('${backgroundImageUrl}')`;
    document.body.classList.add('bodyWithBackground');

    return () => {
      document.body.removeChild(overlay);
      document.body.style.backgroundImage = '';
      document.body.classList.remove('bodyWithBackground');
    };
  }, [post]);



  const handleSubmit = async (values) => {
    const checkInDate = values.checkIn ? moment(values.checkIn).format('YYYY-MM-DDTHH:mm:ss') : null;
    const checkOutDate = values.checkOut ? moment(values.checkOut).format('YYYY-MM-DDTHH:mm:ss') : null;
    const bookingDate = moment().format('YYYY-MM-DDTHH:mm:ss');

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
      const response = await api.post('/vn-pay', formattedValues);
      toast.success("Đặt phòng thành công! Vui lòng thanh toán.");
      form.resetFields();
      // navigate('/payment', { state: { bookingDetails: formattedValues, bookingResponse: response.data, postDetails: post } });
      // const response = await api.post('/vn-pay', {
      //   "date": "2024-03-02T09:55:22.304Z",
      //   "estateId": 1,
      //   "amount": 10,
      // });
      // console.log(response.data);
      // window.open(response.data, "_blank", "noreferrer");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Đặt phòng thất bại: ${errorMessage}`);
    }
  };

  return (
    <div className="booking-container">
      <div className="content-container">
        {post ? (
          <Card title={`Bạn Đang Đặt Phòng Tại Căn Hộ: ${post.title}`} className="info-card">
            <div className="post-info">
              <div className="imageContainer">
                <img
                  src={post.resources && post.resources.length > 0 ? post.resources[0].url : "https://via.placeholder.com/400"}
                  alt="Post"
                  className="postImage"
                />
              </div>
              <p>Thông tin bài viết:</p>
              <ul>
                <li>Tiêu đề: {post.title}</li>
                <li>Giá: {post.price} ₫</li>
                <li>Ngày đăng: {format(new Date(post.postDate), 'PPP')}</li>
                <li>Mô tả: {post.content}</li>
              </ul>
            </div>
          </Card>
        ) : (
          <div className="notFound">Thông tin căn hộ không tồn tại. Vui lòng quay lại và chọn một căn hộ.</div>
        )}
      </div>
      <div className="booking-form-container">
        <Card title="Đặt Phòng" bordered={false} className="booking-card">
          <Form form={form} onFinish={handleSubmit} onValuesChange={onFormValuesChange} layout="vertical">
            <Form.Item name="checkIn" label="Ngày nhận phòng" rules={[{ required: true }]}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item name="checkOut" label="Ngày trả phòng" rules={[{ required: true }]}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item name="guests" label="Số lượng khách" rules={[{ required: true }]}>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <Form.Item label="Tổng số tiền">
              <span>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            </Form.Item>
            <Form.Item name="status" label="Xác nhận ngay lập tức" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-button" >
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
