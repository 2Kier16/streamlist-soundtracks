import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, CartContext } from './context/CartContext';

import Home from './components/Home';
import Movies from './components/MovieSoundTracks';
import Cart from './components/Cart';
import About from './components/About';

import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <Link to="/">Steam List</Link>
      <Link to="/movies">Movie-Soundtracks</Link>
      <Link to="/cart" className="cart-link">
        Cart
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default App;
