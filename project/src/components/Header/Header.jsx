import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/image.png"; // Update the path to your logo if needed

function Header() {
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
    <nav className="header bg-gradient-to-r from-blue-600 to-gray-800 p-4 shadow-md z-50 border-b-2 border-white/15 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:translate-y-[-3px]">
      <div className="header-container flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Logo and Brand */}
        <Link
          to="/home1"
          className="header-brand flex items-center text-white text-2xl font-bold hover:text-yellow-400 transition-all duration-300 transform hover:scale-105"
        >
          {/* <img src={logo} alt="Logo" className="header-logo w-12 h-auto mr-3" /> */}
          <img src={logo} alt="Logo" className="header-logo w-12 h-auto mr-3" />
          SafeGuardian Pro
        </Link>

        {/* Navigation Links */}
        <div className="header-links flex gap-10 items-center">
          <Link
            to="/emergency"
            className="header-link text-white font-medium text-lg hover:text-yellow-400 transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            Emergency
          </Link>
          <Link
            to="/moodtracker"
            className="header-link text-white font-medium text-lg hover:text-yellow-400 transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            MoodTracker
          </Link>
          <Link
            to="/tasks"
            className="header-link text-white font-medium text-lg hover:text-yellow-400 transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            TaskManager
          </Link>
          <Link
            to="/intro"
            className="header-link text-white font-medium text-lg hover:text-yellow-400 transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            Mental-Wellbeing
          </Link>

          {/* Logout Button */}
          <Link
            onClick={handleLogout}
            className="  text-white font-medium text-lg hover:text-yellow-400 transition-all duration-300 transform hover:translate-y-[-2px] "
          >
            Logout
          </Link>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </nav>
  );
}

export default Header;
