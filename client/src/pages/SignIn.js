import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Button } from "antd"; // Import Button from antd
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth(); // Adjusted to use signIn (considering the previous context change)

    const handleSubmit = async (values) => {
        try {
            const response = await api.post("/login", values);
            if (response.status === 200 && response.data) {
                signIn(response.data.token, response.data.username); // Adjusted to use signIn
                toast.success("Login successful!"); // Standardized message to English
                navigate("/");
            } else {
                toast.error("Account not enabled or missing data.");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                "Login failed: " + (error.response?.data || "Unknown error") // Standardized message to English
            );
        }
    };

    return (
        <div className="sign-container">
            <div className="container">
                <div className="login-form-section">
                    <h1 className="login-title">Login</h1> {/* Standardized message to English */}
                    <Form
                        className="login-form"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }} // Added for better form layout
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}> {/* Adjusted for alignment */}
                            <Button type="primary" htmlType="submit" className="login-submit">
                                Login {/* Standardized message to English */}
                            </Button>
                        </Form.Item>
                        <div className="login-footer">
                            Don't have an account? <Link to="/signup">Sign up</Link> {/* Standardized message to English */}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
