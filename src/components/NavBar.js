import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/NavBar.css';
import locationIcon from '../assets/location.svg';


function NavBar({ username, setUsername }) { // Receive setUsername as a prop to handle logout
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername(null); // Reset username to null
    navigate('/'); // Redirect to the home page or login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="shop-name"><Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          Amutha Suvai
          </Link>
        </h1>
      </div>
      <div className="navbar-center">
        <img src={locationIcon} alt="Location Icon" className="location-icon" />
        <span className="location-detail">Anandur</span>
        <input type="text" placeholder="Search products..." className="search-bar" />
        
      </div>

      <div className="navbar-right">
        {username ? ( // Check if a username is provided
          <div className="user-info">
            <span>Welcome, {username}!</span> {/* Display the username */}
            <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* Logout button */}
          </div>
        ) : (
          <>
            <Link to="/cart">
              <button className='cart-item-details'>Cart</button>
            </Link>

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
