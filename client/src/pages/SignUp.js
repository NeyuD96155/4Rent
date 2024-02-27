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

    // Show modal with terms and conditions
    const showTermsModal = () => setIsTermsModalVisible(true);
    const handleTermsModalOk = () => setIsTermsModalVisible(false);
    const handleTermsModalCancel = () => setIsTermsModalVisible(false);

    // Handle form submission
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
        <div className="sign-up">
            <h1 className="sign-up__title">Sign Up</h1>
            <Form
                form={form}
                name="sign-up-form"
                className="sign-up__form"
                onFinish={handleSubmit}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: "Please select your role!" }]}
                    className="sign-up__form-item"
                >
                    <Select placeholder="Select a role" className="sign-up__select">
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
                    className="sign-up__form-item"
                >
                    <Input className="sign-up__input" />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                    className="sign-up__form-item"
                >
                    <Input className="sign-up__input" />
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
                    className="sign-up__form-item"
                >
                    <Input.Password className="sign-up__input-password" />
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
                    className="sign-up__form-item"
                >
                    <Input.Password className="sign-up__input-password" />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("You must agree to the terms and conditions!")),
                        },
                    ]}
                    className="sign-up__form-item"
                >
                    <Checkbox className="sign-up__checkbox">
                        I have read and agree to the <a onClick={showTermsModal} className="sign-up__terms-link">terms and conditions</a>.
                    </Checkbox>
                </Form.Item>

                <Form.Item className="sign-up__form-item">
                    <Button type="primary" htmlType="submit" className="sign-up__submit-button">
                        Sign Up
                    </Button>
                </Form.Item>

                <div className="sign-up__footer">
                    Already have an account? <Link to="/signin" className="sign-up__sign-in-link">Sign In</Link>
                </div>
            </Form>

            <Modal
                title="Terms and Conditions"
                visible={isTermsModalVisible}
                onOk={handleTermsModalOk}
                onCancel={handleTermsModalCancel}
                footer={[
                    <Button key="back" onClick={handleTermsModalCancel} className="sign-up__modal-button">
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleTermsModalOk} className="sign-up__modal-button">
                        Agree
                    </Button>,
                ]}
                className="sign-up__modal"
            >
                <p>Your terms and conditions content goes here.</p>
            </Modal>
        </div>
    );
};

export default SignUp;
