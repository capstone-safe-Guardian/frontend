// src/pages/Login/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { setAuthHeader } from "../../connection/auth";
import axios from "axios";
import "./Login.css"; // Import the Login.css

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateInput = () => {
    if (!email || !password) {
      setError("Both fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post("api/auth/validate/user", {
        email,
        password,
      });
      console.log("response", JSON.stringify(response));
      if (response.data) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("firstName", response.data.username); // Store the first name

        // Show alert notification
        window.alert(`Hi, ${response.data.username}, you are logged in`);

        setAuthHeader(response.data.token);
        navigate('/emergency-contact');
      } else {
        setError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        setError(
          `Login failed: ${
            err.response.data.message || err.response.statusText
          }`
        );
      } else if (err.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
  <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm border-2 border-black-200">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
    
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 p-3 w-full rounded-lg border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 text-gray-900"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Your password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 p-3 w-full rounded-lg border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 text-gray-900"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button 
          type="submit" 
          className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging In..." : "Log In"}
        </button>
      </div>
    </form>

    {/* Login Links */}
    <div className="mt-4 text-center text-sm">
      <p>
        <Link to="/forgot-password" className="text-gray-500 hover:underline">Forgot password?</Link>
        <span className="mx-2">|</span>
        <Link to="/register" className="text-gray-500 hover:underline">Create an account</Link>
      </p>
    </div>
  </div>
</div>

  );
}

export default Login;
