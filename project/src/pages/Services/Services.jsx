import React from 'react';
import { FaAmbulance, FaClipboardList, FaBrain, FaRobot, FaShieldAlt, FaHeartbeat } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function Services() {
  const services = [
    {
      icon: <FaAmbulance className="text-blue-500" />,
      title: "Emergency Response",
      description: "Instant, comprehensive emergency assistance with real-time location tracking and immediate communication with local authorities.",
    },
    {
      icon: <FaClipboardList className="text-yellow-500" />,
      title: "Personal Management",
      description: "Advanced task management with AI-powered reminders, priority tracking, and personalized scheduling optimization.",
    },
    {
      icon: <FaBrain className="text-green-500" />,
      title: "Mental Well-Being",
      description: "Comprehensive mental health support including personalized assessments, therapeutic recommendations, and stress management tools.",
    },
    {
      icon: <FaRobot className="text-purple-500" />,
      title: "AI Companion",
      description: "Intelligent AI chatbot providing 24/7 support, personalized advice, and proactive wellness recommendations.",
    },
    {
      icon: <FaShieldAlt className="text-red-500" />,
      title: "Personal Safety",
      description: "Advanced safety monitoring with predictive risk analysis, real-time alerts, and personalized security recommendations.",
    },
    {
      icon: <FaHeartbeat className="text-pink-500" />,
      title: "Health Tracking",
      description: "Comprehensive health monitoring with integration of wearable technologies and personalized health insights.",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Comprehensive Services</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          At SafeGuardian Pro, we leverage cutting-edge technology to provide holistic personal safety and wellness solutions. Our integrated services are designed to empower individuals with intelligent, proactive support.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 m-auto">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="text-5xl mb-4 flex justify-center">{service.icon}</div>
              <h2 className="text-xl font-semibold mb-3 text-blue-600">{service.title}</h2>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white shadow-2xl rounded-xl p-10 border-2 border-blue-100">
  <h2 className="text-3xl font-bold text-center text-blue-600 mb-8 border-b-2 border-yellow-200 pb-4">Why Choose SafeGuardian Pro?</h2>
  <div className="grid md:grid-cols-2 gap-8 m-auto">
    <div className="bg-blue-50 p-6 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Innovative Technology
      </h3>
      <p className="text-gray-700">
        We employ state-of-the-art AI and machine learning algorithms to provide predictive, personalized safety solutions that adapt to your unique needs.
      </p>
    </div>
    <div className="bg-yellow-50 p-6 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-yellow-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        Holistic Approach
      </h3>
      <p className="text-gray-700">
        Our services go beyond traditional safety measures, integrating mental health, personal management, and proactive wellness tracking.
      </p>
    </div>
  </div>
</div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;