import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
    <div className="text-blue-600 text-4xl mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home1 = () => {
  const [greetingMessage, setGreetingMessage] = useState('');

  useEffect(() => {
    const message = localStorage.getItem('greetingMessage');
    if (message) {
      setGreetingMessage(message);
      localStorage.removeItem('greetingMessage');
      toast.info(message);
    }
  }, []);

  const features = [
    {
      icon: '🚨',
      title: 'Emergency Support',
      description: 'Instant access to emergency contacts and resources when you need them most.'
    },
    {
      icon: '📊',
      title: 'Mood Tracking',
      description: 'Monitor your emotional well-being with our intuitive mood tracking system.'
    },
    {
      icon: '✅',
      title: 'Task Management',
      description: 'Organize and prioritize your daily tasks to reduce stress and increase productivity.'
    },
    {
      icon: '🧘‍♀️',
      title: 'Mental Wellbeing',
      description: 'Personalized resources and guidance for maintaining mental health and resilience.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-24 container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0 mt-15 pt-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
            SafeGuardian Pro: Your Wellness Companion
          </h1>
          <p className="text-xl mb-8 text-gray-600 text-center">
            Empowering you to prioritize your mental health, manage daily challenges, 
            and access support whenever you need it.
          </p>
          <div className="flex justify-center items-center">
          <Link 
            to="/register" 
            className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-3 rounded-full font-bold text-lg transition-colors duration-300 inline-block shadow-md"
          >
            Get Started
          </Link>
          </div>
        </div>
        
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Core Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 m-auto">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Home1;