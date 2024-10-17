import React, { useState } from 'react';
import '../styles/LoginPage.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function LoginPage({setUsername}) {
  const [usernameOrEmail, setUsernameOrEmail] = useState(''); // State for username or email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/api/login', { // Replace with your API endpoint
        username: usernameOrEmail, // Sending username/email
        password,
      });

      if (response.status === 200) {
        console.log('Login successful!', response.data);

        
        setUsername(response.data.username)

        // Redirect to the root page (starting point of the app)
        navigate('/'); // Redirects to the root route, which is often the starting page
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Login failed! Please check your credentials.'); // Handle failed login
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
