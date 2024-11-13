import React from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import './Header.css';  // Make sure the CSS file is properly linked
import logo from '../../assets/image.png';  // Update the path to your image if needed
import { ToastContainer, toast } from 'react-toastify';
import Home1 from '../../pages/Home/Home1';
import ProtectedRoute from '../../pages/ProtectedRoute';
import Emergency from '../../pages/Emergency/Emergency';

function Header() {
  const navigate = useNavigate();

  // Logout handler
  async function handleLogout() {
    try {
      window.localStorage.clear();
      window.location.href = "/login"; // Redirect after logout
      toast.success("Logged out successfully!");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <nav className="header">
      <div className="container header-container">
        {/* Logo and Brand Link */}
        <Link to="/home1" className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
          SafeGuardian Pro
        </Link>

        {/* Navigation Links */}
        <div className="header-links">
          <Link to="/emergency" className="header-link">Emergency</Link>
          <Link to="/moodtracker" className="header-link">MoodTracker</Link>
          <Link onClick={handleLogout} className="header-link">Logout</Link>

           
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </nav>
  );
}

export default Header;
