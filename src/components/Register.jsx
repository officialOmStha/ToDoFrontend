import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://127.0.0.1:8000/register/', form);
      localStorage.setItem('token', res.data.token);
      navigate('/todo');
    } catch (err) {
      setError('Registration failed. Username may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Register</h2>

        <label className="login-label">Username</label>
        <input
          className="login-input"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label className="login-label">Email</label>
        <input
          className="login-input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <label className="login-label">Password</label>
        <input
          className="login-input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
