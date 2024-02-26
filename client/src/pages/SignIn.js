import React from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../config/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input } from "antd";
import { useAuth } from '../context/AuthContext '; 

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (values) => {
    try {
      const response = await api.post("/login", values);
      if (response.status === 200 && response.data) { 
       
        login(response.data.token, response.data.username);
        toast.success("Đăng nhập thành công!");
        navigate("/"); 
      } else {
        toast.error("Account not enabled or missing data.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập thất bại: " + (error.response?.data || "Unknown error"));
    }
  };

  return (
    <div className="login-page">
         <div className="container">
    <div className="login-image-section"></div>
    <div className="login-form-section">
      <h1 className="login-title">Đăng nhập</h1>
      <Form
        className="login-form"
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
          <button type="submit" className="login-submit">Đăng nhập</button>
        </div>
        <div className="login-footer">
          Chưa có tài khoản? <Link to="/signup">Đăng kí</Link>
        </div>
      </Form>
    </div>
  </div>
  </div>
);
};

export default SignIn;