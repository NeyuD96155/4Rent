import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-toastify";
import { Form, Input, Button } from "antd";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = async (values) => {
        try {
            const response = await api.post("/login", values);
            if (response.status === 200 && response.data) {
                signIn(response.data.token, response.data.username);
                toast.success("Login successful!");
                navigate("/");
            } else {
                toast.error("Account not enabled or missing data.");
            }
        } catch (error) {
            toast.error("Login failed: " + (error.response?.data || "Unknown error"));
        }
    };

    return (
        <div className="sign-in">
            <div className="sign-in__container">
                <div className="sign-in__form-section">
                    <h1 className="sign-in__title">Login</h1>
                    <Form className="sign-in__form" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit}>
                        <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please input your username!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password!" }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" className="sign-in__submit-button">Login</Button>
                        </Form.Item>
                        <div className="sign-in__footer">
                            Don't have an account? <Link to="/signup" className="sign-in__signup-link">Sign up</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
