import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.removeItem("token")
    setLogin(false);
    window.location.href = "/";
  };

  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-header">
        <Link to="/todo" className="mobile-logo">ToDo</Link>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      {isOpen && (
        <div className="mobile-menu">
          {!login && (
            <Link to="/" className="mobile-link" onClick={toggleMenu}>Login</Link>
          )}
          <Link to="/register" className="mobile-link" onClick={toggleMenu}>Register</Link>
          {login && (
            <button className="mobile-link logout" onClick={logout}>Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
