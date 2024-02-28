import React, { useEffect } from 'react';
import { Form, Button, DatePicker, Switch, Card } from 'antd';
import api from '../config/axios';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import moment from 'moment';

import { toast } from "react-toastify";
import '../styles/Booking.css';

const Booking = ({ userId, estateId }) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const post = location.state ? location.state.post : null;

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
    const formattedValues = {
      ...values,
      userId,
      estateId,
      checkIn: moment(values.checkIn, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSX'),
      checkOut: moment(values.checkOut, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSX'),
      bookingDate: moment(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSX'),
      status: values.status || false,
    };

    try {
      await api.post('/Booking', formattedValues);
      toast.success("Đặt phòng thành công!");
      form.resetFields();
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
                <li>Giá: ${post.price}</li>
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
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="checkIn" label="Ngày nhận phòng" rules={[{ required: true }]}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item name="checkOut" label="Ngày trả phòng" rules={[{ required: true }]}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
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
