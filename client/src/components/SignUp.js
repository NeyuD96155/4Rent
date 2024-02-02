import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignUp.css"; // Make sure to create a SignUp.css file for styling
import api from "../config/axios";

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        role: "",
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
            <h1 className="signup-title">Sign up</h1>
            <form className="signup-form" noValidate onSubmit={handleSubmit}>
                <div className="signup-grid">
                    <input
                        autoComplete="given-name"
                        name="role"
                        required
                        id="role"
                        placeholder="Role"
                        onChange={handleInputChange}
                        autoFocus
                    />
                    {/* <input
                        required
                        id="lastName"
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        name="lastName"
                        autoComplete="family-name"
                    /> */}
                    <input
                        required
                        id="email"
                        placeholder="Email "
                        onChange={handleInputChange}
                        name="email"
                        autoComplete="email"
                    />
                    <input
                        required
                        id="username"
                        placeholder="Username "
                        onChange={handleInputChange}
                        name="username"
                        autoComplete="username"
                    />

                    <input
                        required
                        name="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                    <label className="signup-checkbox-label">
                        <input type="checkbox" value="allowExtraEmails" />I want
                        to receive inspiration, marketing promotions and updates
                        via email.
                    </label>
                </div>
                <button type="submit" className="signup-submit">
                    Sign Up
                </button>
                <div className="signup-footer">
                    Already have an account? <Link to="/signin">Sign in</Link>
                </div>
            </form>
            <p className="signup-copy">
                Copyright © 4Rent Website {new Date().getFullYear()}.
            </p>
        </div>
    );
};
export default SignUp;
