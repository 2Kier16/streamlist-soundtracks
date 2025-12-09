import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Movies from './components/MovieSoundTracks';
import Cart from './components/Cart';
import About from './components/About';
import CreditCard from './components/CreditCard';
import { CartProvider } from './context/CartContext'; 

function LoginScreen() {
  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>Please log in to continue</h2>
      <p>Use the Login button in the Navbar to authenticate with Google.</p>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <CartProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/soundtracks" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CreditCard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
