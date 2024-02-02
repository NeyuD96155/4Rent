import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignUp.css"; // Ensure this path is correct
import api from "../config/axios";

const SignIn = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post("/login", credentials);
        console.log(response.data);
        // Perform login logic here
    };

    return (
        <div className="signup-container">
            {" "}
            {/* Changed class to match signup */}
            <h1 className="signup-title">Đăng nhập</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                {" "}
                {/* Changed class */}
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
                    </button>{" "}
                    {/* Changed class */}
                </div>
                <div className="signup-footer">
                    Chưa có tài khoản?! <Link to="/signup"><br></br>Đăng kí ngay bây giờ</Link>
                </div>
            </form>
            <p className="signup-copy">
                Copyright © 4Rent Website {new Date().getFullYear()}.
            </p>
        </div>
    );
};

export default SignIn;
