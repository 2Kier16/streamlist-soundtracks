import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { GoogleLogin } from '@react-oauth/google';
import '../css/Navbar.css';

function Navbar() {
  const { cart } = React.useContext(CartContext);
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/'; // reload to show login screen
  };

  return (
    <nav className="navbar">
      <h1 className="logo">StreamList</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/soundtracks">Soundtracks</Link></li>
        <li><Link to="/cart">Cart ({cart.length})</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <div className="auth-section">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <GoogleLogin
            onSuccess={credentialResponse => {
              localStorage.setItem('user', JSON.stringify(credentialResponse));
              window.location.href = '/';
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;

