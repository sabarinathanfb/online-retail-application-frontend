import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/NavBar.css';

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
        <Link to="/login"> {/* Use Link for navigation */}
          <button className="login-btn">Login</button>
        </Link>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}

export default NavBar;
