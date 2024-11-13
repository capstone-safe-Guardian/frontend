// src/components/Footer/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css' // Import your custom CSS file

function Footer() {
  return (
    <footer className="footer">
      {/* Footer Content */}
      <div className="footer-content container mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        {/* Footer Brand */}
        <div className="footer-brand space-y-2">
          <h3 className="text-2xl font-bold">Safe Gaurdian</h3>
          <p className="text-gray-400">Empowering you to live safer and healthier</p>
        </div>

        {/* Footer Links */}
        <div className="footer-links space-y-4">
          <h4 className="text-xl font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white transition duration-300">About</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white transition duration-300">Services</Link></li>
            <li><Link to="/login" className="text-gray-400 hover:text-white transition duration-300">Login</Link></li>
            <li><Link to="/register" className="text-gray-400 hover:text-white transition duration-300">Register</Link></li>
          </ul>
        </div>

        {/* Footer Contact */}
        <div className="footer-contact space-y-2">
          <h4 className="text-xl font-semibold">Contact Us</h4>
          <p className="text-gray-400">Email:safegaurdian@gmail.com</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom text-center py-4 border-t border-gray-600">
        <p className="text-gray-500">&copy; 2024 SafeGaurdianPro. All Rights Reserved.</p>
      </div>

      {/* Chatbox (Optional) */}
      <div className="chatbox">
        <div className="chatbox-header">
          <span className="chatbox-title">Chat with us</span>
          <button className="chatbox-close">&times;</button>
        </div>
        <div className="chatbox-body">
          <div className="chat-message user">
            <p>Hi, I need some help!</p>
          </div>
          <div className="chat-message bot">
            <p>Sure, how can I assist you?</p>
          </div>
        </div>
        <div className="chatbox-footer">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
