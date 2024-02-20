import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignUp.css"; // Make sure to create a SignUp.css file for styling
import api from "../config/axios";

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        role: "MEMBER",
        username: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post("/register", credentials);
        console.log(response.data);

        // const data = new FormData(e.currentTarget);
        // console.log({
        //     firstName: data.get("firstName"),
        //     lastName: data.get("lastName"),
        //     email: data.get("email"),
        //     password: data.get("password"),
        // });
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Đăng kí</h1>
            <form className="signup-form" noValidate onSubmit={handleSubmit}>
                <div className="signup-grid">
                    <label>
                        Role
                        <select name="Role">
                            <option value="MEMBER">Member</option>
                            <option value="RENTER">Renter</option>
                        </select>
                    </label>
                    {/* <input
                        required
                        id="lastName"
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        name="lastName"
                        autoComplete="family-name"
                    /> */}
                    <label>
                        Email
                        <input
                            required
                            id="email"
                            placeholder="Email "
                            onChange={handleInputChange}
                            name="email"
                            autoComplete="email"
                        />
                    </label>
                    <label>
                        Tên đăng nhập
                        <input
                            required
                            id="username"
                            placeholder="Tên đăng nhập "
                            onChange={handleInputChange}
                            name="username"
                            value={credentials.username}
                            autoComplete="username"
                        />
                    </label>
                    <label>
                        Mật khẩu
                        <input
                            required
                            name="password"
                            placeholder="Mật khẩu"
                            onChange={handleInputChange}
                            type="password"
                            value={credentials.password}
                            id="password"
                            autoComplete="new-password"
                        />
                    </label>
                    {/* <label className="signup-checkbox-label">
                        <input type="checkbox" value="allowExtraEmails" />
                    </label>     */}
                </div>
                <button type="submit" className="signup-submit">
                    Sign Up
                </button>
                <div className="signup-footer">
                    Đã có tài khoản? <Link to="/signin">Đăng nhập</Link>
                </div>
            </form>
            <p className="signup-copy">
                Copyright © 4Rent Website {new Date().getFullYear()}.
            </p>
        </div>
    );
};
export default SignUp;
