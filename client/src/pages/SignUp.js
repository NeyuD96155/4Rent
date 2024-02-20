import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import api from "../config/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
const SignUp = () => {
    const [form] = Form.useForm();
    const [credentials, setCredentials] = useState({
        role: "MEMBER",
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (values) => {
        try {
            const response = await api.post("/register", values);
            console.log(response.data);
            toast.success("Đăng kí thành công!");
            navigate("/signin");
        } catch (error) {
            console.log(error);
            toast.error("Đăng kí thất bại: " + error.response.data);
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Đăng kí</h1>
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
        rules={[{ required: true, message: 'Please select your role!' }]}
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
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="username"
        label="Tên đăng nhập"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Tên đăng nhập" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters!',
            },
            () => ({
              validator(_, value) {
                if (!value || (/\d/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value))) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Password must include at least one special character and one number!'));
              },
            }),
          ]}
        hasFeedback
      >
        <Input.Password placeholder="Mật khẩu" />
      </Form.Item>

      {/* Example of checkbox implementation in antd, uncomment if needed
      <Form.Item name="allowExtraEmails" valuePropName="checked">
        <Checkbox>I agree to receive marketing emails.</Checkbox>
      </Form.Item>
      */}

      <Form.Item>
        <div className="form-actions" >
                    <button type="submit" className="signup-submit">
                        Đăng kí
                    </button>
                </div>
      </Form.Item>

      <div className="signup-footer">
        Đã có tài khoản? <Link to="/signin">Đăng nhập</Link>
      </div>
    </Form>
            <p className="signup-copy">
                Copyright © 4Rent Website {new Date().getFullYear()}.
            </p>
        </div>
    );
};
export default SignUp;
