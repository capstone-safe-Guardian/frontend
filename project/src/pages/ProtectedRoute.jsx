import React from 'react';
import { Navigate } from 'react-router-dom';

// Utility function to check if a user is authenticated
const isAuthenticated = () => {
  // Replace this with your actual authentication logic.
  // For example, you might check if a token is stored in localStorage:
  return !!localStorage.getItem('authToken');
};

function ProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
