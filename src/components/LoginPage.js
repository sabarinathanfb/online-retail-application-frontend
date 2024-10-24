import React, { useState } from 'react';
import '../styles/LoginPage.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function LoginPage({ setUsername }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState(''); // State for username or email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        username: usernameOrEmail, // Sending username/email
        password,
      });
  
      if (response.status === 200) {
        console.log('Login successful!', response.data);
  
        // Retrieve token and user ID from response
        const token = response.headers['authorization'];
        const userId = response.data.userId; // Assuming user ID is part of the response
  
        console.log(token);
  
        if (token && userId) { 
          // Only store if both token and userId are present
          localStorage.setItem('token', token); // Store the token in localStorage
          localStorage.setItem('userId', userId); // Store the user ID in localStorage
          setUsername(response.data.username); // Set the username in the parent component
  
          // Redirect to the root page
          navigate('/'); // Redirects to the home page or starting point of the app
        } else {
          throw new Error('Missing token or userId in the response');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Login failed! Please check your credentials.'); // Handle failed login
      // Optionally handle different error responses
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid username or password.'); // Specific error message for 401
        }
        // You can handle other statuses as needed
      }
    }
  };
  

  return (
    <div className='login-page'>
      <div className="form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usernameOrEmail">Username or Email:</label>
            <input
              type="text"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)} // Capture input
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Capture input
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
