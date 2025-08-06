import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    const token = localStorage.getItem('token');
    if (token && token !== "") {
      setLogin(true);
      navigate('/todo') 
    } else {
      setLogin(false); 
    }
  };

  const logout = () => {
    localStorage.setItem('token', "");
    setLogin(false);
    navigate('/');
    checkLogin();
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <nav className='nav-container'>
      <Link to="/todo" className='Logo' onClick={checkLogin}>ToDo List</Link>
      <div className="tabs">
        <Link to="/register" className='link' onClick={checkLogin}>Register</Link>

        {login ? (
          <button className="buttonn" onClick={logout}>Logout</button>
        ) : (
          <Link to="/" className='link' onClick={checkLogin}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
