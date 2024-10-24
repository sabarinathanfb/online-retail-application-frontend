import React, { useState } from 'react';
import '../styles/SignUpPage.css'; 
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [username, setUsername] = useState(''); // State for username
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/auth/signup', { // Replace with your API endpoint
        username,
        email,
        password,
      });

      if (response.status === 202) { // Assuming 201 is the status code for successful creation
        console.log('Sign up successful!', response.data);
        navigate('/login'); // Redirect to login page after successful signup
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Sign up failed! Please try again.'); // Handle failed signup
    }
  };

  return (
    <div className="signup-page">
      <div className='form'>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Capture input
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Capture input
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
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      </div>
    </div>
  );
}

export default SignUpPage;
