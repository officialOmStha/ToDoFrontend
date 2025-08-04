import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ import this

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ initialize it

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api-token-auth/', {
        username,
        password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/todo'); // ✅ navigate to /todo after login
    } catch (err) {
      setError('Login failed, check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <label className="login-label">Username</label>
        <input
          className="login-input"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label className="login-label">Password</label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

    </div>
  );
};

export default Login;
