import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem('token', "");
    setLogin(false);
    setOpen(false);
    navigate('/');
  };

  return (
    <nav className="mobile-navbar">
      <div className="mobile-header">
        <Link to="/todo" className="mobile-logo">ToDo</Link>
        <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>
      </div>
      {open && (
        <div className="mobile-menu">
          <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
          {login ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/" onClick={() => setOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
