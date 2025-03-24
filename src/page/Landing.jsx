import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const onNavigateToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="home-container">
      <h1>Welcome to the App!</h1>
      <p>This is a simple app with login and dashboard functionality.</p>
      <button className="home-btn" onClick={onNavigateToLogin}>
        Go to Login
      </button>
    </div>
  );
};

export default HomePage;
