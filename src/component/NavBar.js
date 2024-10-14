import React from 'react';
import '../styles/NavBar.css'; // Create this CSS file for styles

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="shop-name">Online Retail Shop</h1>
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search products..." className="search-bar" />
      </div>
      <div className="navbar-right">
        <span className="location-icon">📍 Current Location</span>
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}

export default NavBar;
