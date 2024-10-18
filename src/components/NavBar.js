import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/NavBar.css';
import locationIcon from '../assets/location.png';
import CartIcon from '../assets/cart.svg';


function NavBar({ username, setUsername, cart}) { // Receive setUsername as a prop to handle logout
  const navigate = useNavigate();
  // console.log(cart.length);

  const handleLogout = () => {
    setUsername(null); // Reset username to null
    navigate('/'); // Redirect to the home page or login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo"><Link to={"/"}>E-commerce</Link> </h2>
      </div>
      <div className="navbar-center">
        <img src={locationIcon} alt="Location Icon" style={{ width: '40px', height: '40px' }} />
        <span className="location-detail">Anandur</span>
        <input type="text" placeholder="Search products..." className="search-bar" />
        
      </div>

      <div className="navbar-right">
            <div className='cart-icon'>
              <Link to="/cart">
              <img src={CartIcon} alt="Cart Icon" />
              <span className="cart-count">{cart.length > 0 ? cart.length : 0}</span>
              </Link>
            </div>
        {username ? ( // Check if a username is provided
          <div className="user-info">
            <span>Welcome, {username}!</span> {/* Display the username */}
            <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* Logout button */}
          </div>
        ) : (
          <>
            <Link to="/login"> 
              <button className="login-btn">Login</button>
            </Link>

            <Link to="/signup">
              <button className="signup-btn">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
