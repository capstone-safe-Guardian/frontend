import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Register.css';  // Importing the same CSS file
import axios from 'axios';
import { request } from '../../connection/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateInput = () => {
    // Validation for all fields
    if (!name || !email || !password || !contact || !age || !address) {
      setError('All fields are required.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.');
      return false;
    }

    // Password validation: At least 6 characters, one uppercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 6 characters long, include one uppercase letter, one number, and one special character.');
      return false;
    }

    if (!/^\d{10}$/.test(contact)) {
      setError('Contact number must be a valid 10-digit number.');
      return false;
    }

    if (age < 18 || age > 120) {
      setError('Age must be between 18 and 120.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    console.log(name,email,contact,age,address,password)
    setIsSubmitting(true);
    try {
      const response = await request('POST','api/auth/register', { name, email, password, contact, age, address });
      console.log('Registration successful', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
  <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
    
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Full Name Input */}
      <div className='flex gap-3'>
      <div className='w-full'>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 p-3 w-full rounded-lg border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 text-gray-900"
          required
        />
      </div>

      {/* Email Input */}
      <div className='w-full'>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 p-3 w-full rounded-lg border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 text-gray-900"
          required
        />
      </div>
      </div>

      {/* Password Input */}
      <div className='flex gap-3'>
      <div className='w-full'>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 p-3 w-full rounded-lg border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 text-gray-900"
          required
        />
      </div>

      {/* Contact Number Input */}
      <div className='w-full'>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="text"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="mt-2 p-3 w-full rounded-lg border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 text-gray-900"
          required
        />
      </div>
      </div>


      {/* Age Input */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-2 p-3 w-full rounded-lg border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 text-gray-900"
          required
        />
      </div>

      {/* Address Input */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </div>
    </form>

    {/* Login Link */}
    <p className="mt-4 text-center text-sm">
      Already have an account? <Link to="/login" className="text-gray-500 hover:underline">Log in</Link>
    </p>
  </div>
</div>

  );
};

export default Register;
