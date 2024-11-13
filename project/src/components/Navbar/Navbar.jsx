// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the same Navbar CSS file
import logo from '../../assets/image.png'; // Ensure the path to your logo image is correct

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
          SafeGuardian Pro
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/services" className="navbar-link">Services</Link>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/register" className="navbar-link">Register</Link>
          <Link to="/emergency-contact" className="navbar-link">Emergency-Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

