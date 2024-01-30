import React from 'react';
import '../styles/SignUp.css'; // Make sure to create a SignUp.css file for styling

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className="signup-container">

      <h1 className="signup-title">Sign up</h1>
      <form className="signup-form" noValidate onSubmit={handleSubmit}>
        <div className="signup-grid">
          <input
            autoComplete="given-name"
            name="firstName"
            required
            id="firstName"
            placeholder="First Name"
            autoFocus
          />
          <input
            required
            id="lastName"
            placeholder="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
          <input
            required
            id="email"
            placeholder="Email Address"
            name="email"
            autoComplete="email"
          />
          <input
            required
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <label className="signup-checkbox-label">
            <input type="checkbox" value="allowExtraEmails" />
            I want to receive inspiration, marketing promotions and updates via email.
          </label>
        </div>
        <button type="submit" className="signup-submit">
          Sign Up
        </button>
        <div className="signup-footer">
          Already have an account? <a href="/signin">Sign in</a>
        </div>
      </form>
      <p className="signup-copy">
        Copyright © Your Website {new Date().getFullYear()}.
      </p>
    </div>
  );
}
