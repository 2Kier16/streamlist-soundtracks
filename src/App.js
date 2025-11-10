import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import './App.css';


function App() {
  return (
    <Router>
      <nav className="navbar">
      <Link to="/">Steam List</Link>
      <Link to="/movies">Movie-Soundtracks</Link>
      <Link to="/cart">Cart </Link>
      <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
