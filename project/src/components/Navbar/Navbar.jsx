import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image.png';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-300 to-yellow-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center text-lg font-bold text-gray-800 hover:text-blue-700">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-3 rounded-full" />
            SafeGuardian Pro
          </Link>
          <div className="flex space-x-4">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/services', label: 'Services' },
              { to: '/login', label: 'Login' },
              { to: '/register', label: 'Register' },
              { to: '/emergency-contact', label: 'Emergency Contact' }
            ].map(({ to, label }) => (
              <Link 
                key={to} 
                to={to} 
                className="text-gray-800 hover:bg-blue-100 hover:text-blue-800 px-3 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;