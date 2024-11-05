import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'user@example.com' && password === 'password123') {
      setError('');
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn" onClick={handleLogin}>
          Login
        </button>
        
        <div className="divider">or</div>

        <div className="social-login">
          <button className="social-btn google">Google</button>
          <button className="social-btn facebook">Facebook</button>
          <button className="social-btn apple">Apple</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
