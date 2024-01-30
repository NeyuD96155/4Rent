import React, { useState } from 'react';
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
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="signup-submit">Sign In</button> {/* Changed class */}
        </div>
        <div className="signup-footer">
          dont have an account yet? <a href="/signup">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
