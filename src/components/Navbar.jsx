import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token")
    setLogin(false);
    window.location.href = "/";
  };

  return (
    <nav className="nav-container">
      <Link to="/todo" className="Logo">
        ToDo
      </Link>

      <div className="tabs">
        {!login && (
          <Link to="/" className="link">
          Login
        </Link>
        )}
        <Link to="/register" className="link">
          Register
        </Link>

        {login && (
          <button onClick={logout} className="buttonn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
