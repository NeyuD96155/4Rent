import React, { useState } from 'react';
import { Layout, Menu, Card, Form, Input, Button, Rate } from 'antd';
import { MessageOutlined, InfoCircleOutlined, CustomerServiceOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
const { TextArea } = Input;

const ContactPage = () => {
  const [selectedKey, setSelectedKey] = useState('generalInquiry');

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Send contact information to the backend or email service
  };

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderContactContent = (key) => {
    switch (key) {
      case 'generalInquiry':
        return (
          <Card title="Câu hỏi chung">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Tên của bạn" name="name" rules={[{ required: true }]}>
                <Input placeholder="Nhập tên của bạn" />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="Nhập Email của bạn" />
              </Form.Item>
              <Form.Item label="Tin nhắn" name="message" rules={[{ required: true }]}>
                <TextArea rows={4} placeholder="Tin nhắn của bạn ở đây" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Gửi tin nhắn</Button>
              </Form.Item>
            </Form>
          </Card>
        );
        case 'feedback':
            return (
              <Card title="Đóng góp ý kiến">
                <Form
                  layout="vertical"
                  onFinish={(values) => {
                    console.log('Feedback:', values);
              
                  }}
                >
                  <Form.Item
                    name="feedback"
                    label="Ý kiến của bạn"
                    rules={[{ required: true, message: 'Hãy nhập ý kiến của bạn!' }]}
                  >
                    <TextArea rows={4} placeholder="Hãy cho chúng tôi biết bạn nghĩ gì..." />
                  </Form.Item>
                  <Form.Item name="rating" label="Rating">
                    <Rate />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Gửi</Button>
                  </Form.Item>
                </Form>
              </Card>
            );
          case 'support':
            return (
              <Card title="Hỗ trợ khách hàng">
                <Form
                  layout="vertical"
                  onFinish={(values) => {
                    console.log('Support Request:', values);
                    // Submit support request to backend or handle as needed
                  }}
                >
                  <Form.Item
                    name="issue"
                    label="Vấn đề"
                    rules={[{ required: true, message: 'Hãy mô tả vấn đề của bạn!' }]}
                  >
                    <TextArea rows={4} placeholder="Mô tả vấn đề hoặc câu hỏi của bạn..." />
                  </Form.Item>
                  <Form.Item
                    name="contact"
                    label="Contact Email"
                    rules={[{ type: 'email', message: 'Hãy nhập Email hợp lệ!' }]}
                  >
                    <Input placeholder="Địa chỉ Email của bạn" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Gửi yêu cầu</Button>
                  </Form.Item>
                </Form>
              </Card>
            );
          default:
            return null;
        }
      };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="generalInquiry" icon={<MessageOutlined />}>Câu hỏi chung</Menu.Item>
          <Menu.Item key="feedback" icon={<InfoCircleOutlined />}>Đóng góp ý kiến</Menu.Item>
          <Menu.Item key="support" icon={<CustomerServiceOutlined />}>Hỗ trợ khách hàng</Menu.Item>
          {/* Add more Menu.Items here if needed */}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          {renderContactContent(selectedKey)}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContactPage;
