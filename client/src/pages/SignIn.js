import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import api from "../config/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input } from "antd";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post("/login", values);
      if (response.data) { 
  
        localStorage.setItem('role', response.data.role);

        toast.success("Đăng nhập thành công!");
        // Redirect based on the role
        navigate(response.data.role === 'MEMBER' ? "/member-dashboard" : "/renter-dashboard");
      } else {
        toast.error("Account not enabled or missing data.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập thất bại: " + (error.response?.data || "Unknown error"));
    }
  };

  return (
    <div className="signup-container">
            <h1 className="signup-title">Đăng nhập</h1>
            <Form
                className="signup-form"
                labelCol={{ span: 24 }}
                onFinish={handleSubmit}
            >
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
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password />
                </Form.Item>

                <div className="form-actions">
                    <button type="submit" className="signup-submit">Đăng nhập</button>
                </div>
                <div className="signup-footer">
                    Chưa có tài khoản? <Link to="/signup">Đăng kí</Link>
                </div>
            </Form>

            <p className="signup-copy">
                Copyright © 4Rent Website {new Date().getFullYear()}.
            </p>
        </div>
    );
};

export default SignIn;
