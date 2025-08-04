import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    const token = localStorage.getItem('token');
    if (token && token !== "") {
      setLogin(true); 
    } else {
      setLogin(false); 
    }
  };

  const logout = () => {
    localStorage.setItem('token', "");
    setLogin(false);
    navigate('/');
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <nav className='nav-container'>
      <h3>ToDo List</h3>
      <div className="tabs">
        <Link to="/register" className='link'>Register</Link>

        {login ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/" className='link'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
