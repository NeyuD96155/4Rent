// ContactUs.js
import React from 'react';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

const ContactUs = () => {
  const onFinish = (values) => {
    console.log('Submitted values:', values);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Liên hệ chúng tôi</h1>
      <Form
        name="contact_form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Tên của bạn"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email của bạn!', type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung tin nhắn"
          name="message"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung tin nhắn!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi tin nhắn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactUs;
