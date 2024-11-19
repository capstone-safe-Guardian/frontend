import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/image.png";

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
    <nav className="bg-gradient-to-r from-blue-300 to-yellow-100 shadow-md top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link 
            to="/home1" 
            className="flex items-center text-lg font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300"
          >
            <img 
              src={logo} 
              alt="SafeGuardian Pro Logo" 
              className="h-10 w-10 mr-3 rounded-full"
            />
            SafeGuardian Pro
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-4 items-center">
            {[
              { to: "/emergency", label: "Emergency" },
              { to: "/moodtracker", label: "Mood Tracker" },
              { to: "/tasks", label: "Task Manager" },
              { to: "/intro", label: "Mental Wellbeing" },
              { to: "/recomendations", label: "Recommendations" }
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-gray-800 hover:bg-blue-100 hover:text-blue-800 px-3 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
              >
                {label}
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
            >
              
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </nav>
  );
}

export default Header;