import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Select, Checkbox, Button, Modal } from "antd";

const { Option } = Select;

const SignUp = () => {
    const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const showTermsModal = () => setIsTermsModalVisible(true);
    const handleTermsModalOk = () => setIsTermsModalVisible(false);
    const handleTermsModalCancel = () => setIsTermsModalVisible(false);

    const handleSubmit = async (values) => {
        try {
            const response = await api.post("/register", values);
            if (response.status === 200) {
                toast.success("Registration successful!");
                navigate("/signin");
            }
        } catch (error) {
            console.error(error);
            toast.error("Registration failed: " + (error.response?.data?.message || "Unknown error"));
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Sign Up</h1>
            <Form
                form={form}
                name="signup-form"
                className="signup-form"
                onFinish={handleSubmit}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: "Please select your role!" }]}
                >
                    <Select placeholder="Select a role">
                        <Option value="MEMBER">Member</Option>
                        <Option value="RENTER">Renter</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { type: "email", message: "The input is not valid E-mail!" },
                        { required: true, message: "Please input your E-mail!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: "Please input your password!" },
                        { min: 8, message: "Password must be at least 8 characters!" },
                        () => ({
                            validator(_, value) {
                                if (!value || (/\d/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Password must include at least one number and one special character!"));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        { required: true, message: "Please confirm your password!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("The two passwords that you entered do not match!"));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("You must agree to the terms and conditions!")),
                        },
                    ]}
                >
                    <Checkbox>
                        I have read and agree to the <a onClick={showTermsModal}>terms and conditions</a>.
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="signup-submit-button">
                        Sign Up
                    </Button>
                </Form.Item>

                <div className="signup-footer">
                    Already have an account? <Link to="/signin">Sign In</Link>
                </div>
            </Form>

            <Modal
                title="Terms and Conditions"
                visible={isTermsModalVisible}
                onOk={handleTermsModalOk}
                onCancel={handleTermsModalCancel}
                footer={[
                    <Button key="back" onClick={handleTermsModalCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleTermsModalOk}>
                        Agree
                    </Button>,
                ]}
            >
                <p>Your terms and conditions content goes here.</p>
            </Modal>

            <p className="signup-footer">Copyright © Your Website {new Date().getFullYear()}.</p>
        </div>
    );
};

export default SignUp;
