import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
        <Route path="/home" element={<HomePage />} />  {/* Route to HomePage */}
          {/* Route for the login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Add more routes for other components/pages here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
