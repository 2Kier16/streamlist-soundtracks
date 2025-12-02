import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import '../css/Navbar.css';

function Navbar() {
  const { user, login, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

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
          <button onClick={logout}>Logout ({user.name})</button>
        ) : (
          <button onClick={() => login('DemoUser')}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
