import React from 'react';
import { Form, Input, Button, DatePicker, InputNumber } from 'antd';
import api from '../config/axios'; // Ensure axios is correctly configured
import { toast } from "react-toastify";
import "../styles/Post.css";

const Post = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      postDate: values.postDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      price: parseInt(values.price, 10), // Ensure the value is an integer
    };

    try {
      await api.post('/post', formattedValues); // Remove 'response' since it's not being used
      toast.success("Căn hộ đã được đăng ký thành công!");
      form.resetFields();
    } catch (error) {
      toast.error(`Đăng ký thất bại: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="post-form-wrapper">
      <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off" className="post-form-container">
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]} className="post-form-item">
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]} className="post-form-item">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]} className="post-form-item">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="postDate" label="Ngày đăng" rules={[{ required: true, message: 'Vui lòng chọn ngày đăng!' }]} className="post-form-item">
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item className="post-form-item">
          <Button type="primary" htmlType="submit" className="post-submit-button">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Post;
