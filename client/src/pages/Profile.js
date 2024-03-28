import React, { useEffect, useState } from "react";
import {
    Layout,
    Form,
    Input,
    Button,
    Menu,
    Card,
    Select,
    notification,
    DatePicker,
} from "antd";
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
        fetchProfile(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            form.setFieldsValue({
                fullName: response.data.fullname ?? "",
                phone: response.data.phoneNumber ?? "",
                dob: response.data.dateOfBirth
                    ? moment(response.data.dateOfBirth)
                    : null,
                address: response.data.address ?? "",
                gender: response.data.gender ?? "",
                email: response.data.email ?? "",
            });
        } catch (error) {
            console.error(
                "Failed to fetch profile:",
                error.response ? error.response.data : error.message
            );
            notification.error({
                message: "Failed to fetch profile",
                description:
                    "There was a problem retrieving your profile information. Please try again later.",
            });
        }
    };

    const onFinish = async (values) => {
        const payload = {
            id: values.id,
            role: values.role,
            fullname: values.fullName,
            phoneNumber: values.phone,
            dateOfBirth: moment(values.dob),
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
                message: "Profile Updated",
                description: "Your profile was successfully updated.",
            });
        } catch (error) {
            console.error(
                "Failed to update profile:",
                error.response ? error.response.data : error.message
            );
            notification.error({
                message: "Profile Update Failed",
                description:
                    "There was a problem updating your profile. Please try again.",
            });
        }
    };

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    const renderProfileContent = () => {
        switch (selectedKey) {
            case "profile":
                fetchProfile();
                return renderProfileForm();

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
                        {
                            min: 3,
                            message: "Tên phải dài ít nhất 3 ký tự!",
                        },
                        {
                            max: 50,
                            message: "Tên không được dài quá 50 ký tự!",
                        },
                        {
                            pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                            message:
                                "Tên chỉ được chứa chữ cái và khoảng trắng!",
                        },
                        {
                            pattern: /.*\s+.*/,
                            message: "Vui lòng nhập cả họ và tên!",
                        },
                        {
                            // Thêm quy tắc này để kiểm tra việc viết hoa chữ cái đầu của mỗi từ
                            pattern:
                                /^(?:[A-ZÀ-Ẏ][a-zà-ỹ]*\s)*[A-ZÀ-Ẏ][a-zà-ỹ]*$/,
                            message:
                                "Mỗi từ trong tên phải bắt đầu bằng một chữ cái viết hoa!",
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
                            message: "Vui lòng nhập số điện thoại của bạn!",
                        },
                        {
                            // Kiểm tra định dạng và độ dài số điện thoại
                            pattern: /^[0-9]{10,11}$/,
                            message: "Số điện thoại phải là 10-11 chữ số.",
                        },
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại của bạn" />
                </Form.Item>

                <Form.Item
                    label="Ngày sinh"
                    name="dob"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn ngày sinh!",
                        },
                    ]}
                >
                    <DatePicker
                        defaultValue={moment("01-01-2000", "DD-MM-YYYY")}
                        format="DD-MM-YYYY"
                        placeholder="Nhập ngày sinh của bạn"
                    />
                </Form.Item>

                <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn giới tính",
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn giới tính"
                        dropdownRender={(menu) => (
                            <>
                                <Option disabled value="">
                                    Chọn giới tính
                                </Option>
                                {menu}
                            </>
                        )}
                    >
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập địa chỉ!",
                        },
                        {
                            min: 5,
                            message: "Địa chỉ phải dài ít nhất 5 ký tự!",
                        },
                        {
                            max: 100,
                            message: "Địa chỉ không được dài quá 100 ký tự!",
                        },

                        {
                            pattern: /^[a-zA-Z0-9À-ỹ\s,.#-]{5,100}$/,
                            message:
                                "Địa chỉ có thể bao gồm chữ cái, số, và các ký tự , . # -",
                        },
                    ]}
                >
                    <Input placeholder="Nhập địa chỉ của bạn" />
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input disabled />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cập nhật hồ sơ
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
