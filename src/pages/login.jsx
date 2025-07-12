import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/profile'); // Navigate to user profile after login
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h2 className="platform-title">Skill Swap Platform</h2>
        <button className="home-button" onClick={goHome}>Home</button>
      </header>

      <main className="login-form-container">
        <h3 className="page-title">User Login Page</h3>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />

          <button type="submit" className="login-btn">Login</button>

          <p className="forgot-link">
            <a href="#">Forgot username/password</a>
          </p>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;