import React, { useState } from 'react';
import {Link} from "react-router-dom";
import '../styles/SignUp.css'; // Ensure this path is correct

const SignIn = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
  };

  return (
    <div className="signup-container"> {/* Changed class to match signup */}
    <h1 className="signup-title">Sign in</h1>
      <form className="signup-form" onSubmit={handleSubmit}> {/* Changed class */}
        <div className="signup-grid">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            placeholder="Username"
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="signup-submit">Sign In</button> {/* Changed class */}
        </div>
        <div className="signup-footer">
          Did have an account yet? <Link to="/signup">Sign up</Link>
        </div>
      </form>
      <p className="signup-copy">
        Copyright © 4Rent Website {new Date().getFullYear()}.
      </p>
    </div>
  );
};

export default SignIn;
