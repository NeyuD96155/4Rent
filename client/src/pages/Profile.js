import React, { useEffect, useState } from "react";
import { Layout, Form, Input, Button, Menu, Card, Select, notification, DatePicker } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import api from "../config/axios";
import { useForm } from "antd/es/form/Form";
import moment from "moment";

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
                fullname: response.data.fullname,
                phoneNumber: response.data.phoneNumber,
                dateOfBirth: moment(response.data.dateOfBirth),
                address: response.data.address,
                gender: response.data.gender,
                email: response.data.email,
            });
        } catch (error) {
            notification.error({
                message: "Failed to Fetch Profile",
                description: "There was a problem retrieving your profile information. Please try again later.",
            });
        }
    };

    const onFinish = async (values) => {
        const payload = { ...values, id: values.id, dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD') };

        try {
            const response = await api.put("/api/update", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.role)
            notification.success({
                message: "Profile Updated",
                description: "Your profile was successfully updated.",
            });
        } catch (error) {
            notification.error({
                message: "Profile Update Failed",
                description: "There was a problem updating your profile. Please try again.",
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
                <Form.Item label="Họ và tên" name="fullname" style={{width:'25.96%'}}>
                    <Input />
                </Form.Item>
                <Form.Item label="Số điện thoại" name="phoneNumber" style={{width:'25.96%'}}>
                    <Input />
                </Form.Item>
                <Form.Item label="Ngày tháng năm sinh" name="dateOfBirth" >
                    <DatePicker format="DD-MMM-YYYY" />
                </Form.Item>
                <Form.Item label="Giới tính" name="gender" style={{width:'25.96%'}}>
                    <Select>
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="other">Khác</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address" style={{width:'25.96%'}}>
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" style={{width:'25.96%'}}>
                    <Input disabled />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Cập nhật hồ sơ
                </Button>
            </Form>
        </Card>
    );

    const renderSecurityForm = () => (
        <Card title="Bảo mật">
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Mật khẩu hiện tại" name="currentPassword" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Mật khẩu mới" name="newPassword" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Xác nhận mật khẩu mới" name="confirmNewPassword" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Đổi mật khẩu
                </Button>
            </Form>
        </Card>
    );

    const renderNotificationSettings = () => (
        <Card title="Cài đặt thông báo">
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Thông báo email" name="emailNotifications">
                    <Select defaultValue="subscribed">
                        <Option value="subscribed">Đăng kí</Option>
                        <Option value="unsubscribed">Hủy đăng kí</Option>
                    </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Cập nhật thông báo
                </Button>
            </Form>
        </Card>
    );

    return (
        <Layout>
            <Sider width={200}>
                <Menu mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuClick}>
                    <Menu.Item key="profile" icon={<UserOutlined />}>Hồ sơ</Menu.Item>
                    <Menu.Item key="security" icon={<LockOutlined />}>Bảo mật</Menu.Item>
                    <Menu.Item key="notifications" icon={<MailOutlined />}>Thông báo</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content>{renderProfileContent()}</Content>
            </Layout>
        </Layout>
    );
};

export default ProfilePage;
