// 4Rent/client/src/components/Login/LoginPage.js
import React, { useState } from 'react';


const SignIn = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic, authenticate and redirect
    // Example: if (authenticate(credentials)) history.push('/dashboard');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
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
          <button type="submit" className="login-button">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;