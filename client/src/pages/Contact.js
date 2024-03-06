import React, { useState } from "react";
import { Layout, Menu, Card, Form, Input, Button, Rate } from "antd";
import {
    MessageOutlined,
    InfoCircleOutlined,
    CustomerServiceOutlined,
    PhoneOutlined,
    MailOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;
const { TextArea } = Input;

const ContactPage = () => {
    const [selectedKey, setSelectedKey] = useState("generalInquiry");

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    const renderContactContent = (key) => {
        switch (key) {
            case "generalInquiry":
                return (
                    <Card title="Câu hỏi chung">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Tên của bạn"
                                name="name"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Nhập tên của bạn" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, type: "email" }]}
                            >
                                <Input placeholder="Nhập Email của bạn" />
                            </Form.Item>
                            <Form.Item
                                label="Tin nhắn"
                                name="message"
                                rules={[{ required: true }]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Tin nhắn của bạn ở đây"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Gửi tin nhắn
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                );
            case "feedback":
                return (
                    <Card title="Đóng góp ý kiến">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                name="feedback"
                                label="Ý kiến của bạn"
                                rules={[{ required: true }]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Hãy cho chúng tôi biết bạn nghĩ gì..."
                                />
                            </Form.Item>
                            <Form.Item name="rating" label="Đánh giá">
                                <Rate />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Gửi đóng góp
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                );
            case "support":
                return (
                    <Card title="Hỗ trợ khách hàng">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                name="issue"
                                label="Vấn đề"
                                rules={[{ required: true }]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Mô tả vấn đề của bạn..."
                                />
                            </Form.Item>
                            <Form.Item
                                name="contact"
                                label="Email liên hệ"
                                rules={[{ required: true, type: "email" }]}
                            >
                                <Input placeholder="Email của bạn" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Gửi yêu cầu hỗ trợ
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                );
            case "contactInfo":
                return (
                    <Card title="Thông tin liên hệ">
                        <p>
                            <PhoneOutlined /> Số điện thoại: +083 2345 780
                        </p>
                        <p>
                            <MailOutlined /> Email: 4rent@gmail.com
                        </p>
                        <p>
                            <InfoCircleOutlined /> Địa chỉ: Đường cầu vồng, Quận
                            9, Thành phố Thủ Đức
                        </p>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider width={200} style={{ background: "#fff" }}>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                    style={{ height: "100%", borderRight: 0 }}
                >
                    <Menu.Item key="generalInquiry" icon={<MessageOutlined />}>
                        Câu hỏi chung
                    </Menu.Item>
                    <Menu.Item key="feedback" icon={<InfoCircleOutlined />}>
                        Đóng góp ý kiến
                    </Menu.Item>
                    <Menu.Item key="support" icon={<CustomerServiceOutlined />}>
                        Hỗ trợ khách hàng
                    </Menu.Item>
                    <Menu.Item key="contactInfo" icon={<PhoneOutlined />}>
                        Thông tin liên hệ
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
                <Content
                    style={{
                        background: "#fff",
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    {renderContactContent(selectedKey)}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ContactPage;
