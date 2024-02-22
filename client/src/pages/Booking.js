import React from 'react';
import { Form, Button, DatePicker, Switch } from 'antd';
import api from '../config/axios'; // Ensure axios is correctly configured
import { toast } from "react-toastify";
import moment from 'moment'; // Used for bookingDate

const Booking = ({ userId, estateId }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      userId,
      estateId,
      checkIn: values.checkIn.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      checkOut: values.checkOut.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      bookingDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'), // Booking date set to current date
      status: values.status || false, // Default to false if not selected
    };

    try {
      await api.post('/Booking', formattedValues); // Directly await the API call without assigning its result to a variable
      toast.success("Đặt phòng thành công!");
      form.resetFields();
    } catch (error) {
      toast.error(`Đặt phòng thất bại: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="checkIn" label="Ngày nhận phòng" rules={[{ required: true }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item name="checkOut" label="Ngày trả phòng" rules={[{ required: true }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item name="status" label="Xác nhận ngay lập tức" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đặt phòng
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Booking;
