import React from 'react';
import './LoginSignup.css';

export const LoginSignup = () => {
  return (
    <div className="login-container">
      <h1 className="headline">Gyan Bigyan</h1>
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className="login-button">Login</button>
          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};