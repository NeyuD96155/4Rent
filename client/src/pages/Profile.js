import React, { useEffect, useState } from "react";
import { Layout, Form, Input, Button, Menu, Card, Select, notification } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import api from "../config/axios";
import { useForm } from "antd/es/form/Form";

const { Content, Sider } = Layout;
const { Option } = Select;

const ProfilePage = () => {
    const [selectedKey, setSelectedKey] = useState("profile");
    const [token] = useState(localStorage.getItem("token"));
    const [form] = useForm();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            form.setFieldsValue({
                fullName: response.data.fullname,
                phone: response.data.phoneNumber,
                dob: response.data.dateOfBirth,
                address: response.data.address,
                gender: response.data.gender,
                email: response.data.email,
            });
        } catch (error) {
            console.error("Failed to fetch profile:", error.response ? error.response.data : error.message);
            notification.error({
                message: 'Failed to fetch profile',
                description: 'There was a problem retrieving your profile information. Please try again later.',
            });
        }
    };

    const onFinish = async (values) => {
        const payload = {
                        id: values.id,
                        role: values.role,
                        fullname: values.fullName,
                        phoneNumber: values.phone,
                        dateOfBirth: values.dob,
                        gender: values.gender,
                        address: values.address,
                        email: values.email,
                    };

        try {
            const response = await api.put("/api/update", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Update response:", response.data);
            notification.success({
                message: 'Profile Updated',
                description: 'Your profile was successfully updated.',
            });
        } catch (error) {
            console.error("Failed to update profile:", error.response ? error.response.data : error.message);
            notification.error({
                message: 'Profile Update Failed',
                description: 'There was a problem updating your profile. Please try again.',
            });
        }
    };

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    const renderProfileContent = () => {
        switch (selectedKey) {
            case "profile":
                return renderProfileForm();
            case "security":
                return renderSecurityForm();
            case "notifications":
                return renderNotificationSettings();
            default:
                return null;
        }
    };

    const renderProfileForm = () => (
        <Card title="Thông tin cá nhân">
            <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
                                label="Họ và tên"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập họ và tên!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ và tên của bạn" />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập họ và tên!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ và tên của bạn" />
                            </Form.Item>
                            <Form.Item label="Năm sinh" name="dob">
                                <Input placeholder="Nhập năm sinh" />
                            </Form.Item>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập giới tính!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập địa chỉ!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập địa chỉ Email!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật hồ sơ
                                </Button>
                            </Form.Item>
            </Form>
        </Card>
    );

    const renderSecurityForm = () => (
        <Card title="Bảo mật">
             <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Mật khẩu hiện tại"
                                name="currentPassword"
                                rules={[{ required: true }]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu mới"
                                name="newPassword"
                                rules={[{ required: true }]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu mới" />
                            </Form.Item>
                            <Form.Item
                                label="Xác nhận mật khẩu mới"
                                name="confirmNewPassword"
                                rules={[{ required: true }]}
                            >
                                <Input.Password placeholder="Xác nhận mật khẩu mới" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Đổi mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
        </Card>
    );

    const renderNotificationSettings = () => (
        <Card title="Cài đặt thông báo">
            <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Thông báo email"
                                name="emailNotifications"
                                valuePropName="checked"
                            >
                                <Select defaultValue="subscribed">
                                    <Option value="subscribed">Đăng kí</Option>
                                    <Option value="unsubscribed">
                                        Hủy đăng kí
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật thông báo
                                </Button>
                            </Form.Item>
                        </Form>
        </Card>
    );

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider width={200} style={{ background: "#fff" }}>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                    style={{ height: "100%", borderRight: 0 }}
                >
                     <Menu.Item key="profile" icon={<UserOutlined />}>
                        Hồ sơ
                    </Menu.Item>
                    <Menu.Item key="security" icon={<LockOutlined />}>
                        Bảo mật
                    </Menu.Item>
                    <Menu.Item key="notifications" icon={<MailOutlined />}>
                        Thông báo
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
                    {renderProfileContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProfilePage;
