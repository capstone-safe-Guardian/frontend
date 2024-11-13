// Hero.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Hero.css'; // Import the CSS for styling
import Chatbox from './ChatBox'; // Import the Chatbox component

// Function definition for Hero component (function declaration)
function Hero() {
  const [showChatbox, setShowChatbox] = useState(false); // State to control visibility of chatbox
  const [message, setMessage] = useState(''); // State for the message displayed when user is not logged in
  const navigate = useNavigate(); // Hook to navigate between routes

  // Function to handle click on the chatbot icon
  const handleChatIconClick = () => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    
    if (token) {
      setShowChatbox(true); // Show the chatbox if the user is logged in
    } else {
      setMessage('Kindly log in to use the chatbox'); // Show a message to prompt the user to log in
      navigate('/login'); // Redirect to the login page
    }
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">YOUR SAFETY AND WELL-BEING ALL IN ONE PLACE</h1>
        <p className="text-gray-800 font-semibold mb-10">Empowering you to live safer and healthier</p>
        <Link to="/register" className="h-24 border-2 border-gray-800 p-2 m-3 rounded bg-gray-300 text-black">Get Started</Link>
      </div>

      {/* Always render the Chatbox component when 'showChatbox' is true */}
      {showChatbox && <Chatbox isOpen={showChatbox} onClose={() => setShowChatbox(false)} />}

      {/* If the chatbox is not open, display the chatbot icon */}
      {!showChatbox && (
        <div className="chatbot-icon" onClick={handleChatIconClick}>
          {/* The icon content (e.g., an image or SVG) could go here */}
        </div>
      )}

      {/* Display the login message if there's any */}
      {message && <div className="login-message">{message}</div>}
    </div>
  );
}

export default Hero;
