import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';

function App() {
  const [username, setUsername] = useState(null); // State for username
  const [cart, setCart] = useState([]); // State for the cart

  return (
    <Router>
      <div>
        <NavBar username={username} setUsername={setUsername} cart={cart}/>
        
        <div>
          <Routes>
            <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage setUsername={setUsername} />} />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
      </div>  
    </Router>
  );
}

export default App;
