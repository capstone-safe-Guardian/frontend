// Chatbox.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react'; // Importing icons from lucide-react
import './Chatbox.css'; // Import the CSS for the chatbox
import chatbotLogo from '../../assets/12.jpg'; // Chatbot logo
import userLogo from '../../assets/userLogo.jpg'; // User logo

// Function definition for chatBox component (using function declaration)
function ChatBox({ isOpen, onClose }) {
  const [message, setMessage] = useState(''); // State for the message being typed
  const [chatHistory, setChatHistory] = useState([]); // Chat history to store messages
  const chatBodyRef = useRef(null); // Reference to the chat body for auto-scroll

  // useEffect hook to scroll to the bottom of the chat history every time it changes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // handleSendMessage is the function responsible for sending a new message
  const handleSendMessage = async () => {
    if (!message.trim()) return; // Ignore empty messages

    const newUserMessage = { text: message, type: 'user' };
    setChatHistory((prev) => [...prev, newUserMessage]); // Add user message to chat history
    setMessage(''); // Clear the input field after sending

    // API call to get the chatbot's response
    try {
      const response = await fetch('http://localhost:8085/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // Send the message to the server
      });

      const result = await response.text(); // Get the response text from the bot
      const newBotMessage = { text: result, type: 'bot' };
      setChatHistory((prev) => [...prev, newBotMessage]); // Add bot response to chat history
    } catch (error) {
      console.error('Error sending message:', error); // Log any errors
    }
  };

  // If the chatbox is closed (isOpen is false), return null to hide it
  if (!isOpen) return null;

  // JSX to render the chatbox
  return (
    <div className="chatbox active">
      <div className="chatbox-header">
        <span className="chatbox-title">Chat with us</span>
        <button onClick={onClose} className="chatbox-close">
          <X size={20} /> {/* Close button */}
        </button>
      </div>
      <div className="chatbox-body" ref={chatBodyRef}>
        {/* Render chat messages */}
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.type === 'bot' && <img src={chatbotLogo} alt="Bot" className="bot-logo" />}
            {msg.type === 'user' && <img src={userLogo} alt="User" className="user-logo" />}
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="chatbox-footer">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
