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
        console.log(values);
        try {
            const response = await api.post("/login", values);
            console.log(response.data);
            toast.success("Đăng nhập thành công!");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Đăng nhập thất bại: " + error.response.data);
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Đăng nhập</h1>
            {/* <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-grid">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        placeholder="Tên đăng nhập"
                        onChange={handleInputChange}
                        required
                        rules={[
                            {
                              required: true,
                              message: 'Please input your username!',
                            },
                          ]}
                    />

                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Mật khẩu"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="signup-submit">
                        Đăng nhập
                    </button>
                </div>
                <div className="signup-footer">
                    Chưa có tài khoản?!{" "}
                    <Link to="/signup">Đăng kí ngay bây giờ</Link>
                </div>
            </form> */}

            <Form
                className="signup-form"
                labelCol={{
                    span: 24,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: "Please input username!!!",
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
                            message: "Please input password!!!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <div className="form-actions">
                    <button type="submit" className="signup-submit">
                        Đăng nhập
                    </button>
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
