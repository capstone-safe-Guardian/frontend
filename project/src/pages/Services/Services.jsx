import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaShieldAlt, FaHeartbeat, FaBell, FaGraduationCap } from 'react-icons/fa';
import './Services.css';

function Services() {
  const services = [
    {
      icon: <FaShieldAlt />,
      title: "Emergency Response",
      description: "Receive immediate assistance and support in emergencies, available anytime and anywhere.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Personal Management",
      description: "Manage your tasks and set reminders with our personalized services.",
    },
    {
      icon: <FaBell />,
      title: "Mental Well-Being",
      description: "Get tailored recommendations based on your test scores to enhance your mental well-being.",
    },
    {
      icon: <FaGraduationCap />,
      title: "Bot for You",
      description: "Interact with our chatbot for convenient assistance and support.",
    },
  ];

  return (
    <div className="services-page">
      <Navbar />
      <div className="services-container">
        <h1>Our Services</h1>
        <p className="services-intro">
          At SafeWell, we offer a range of innovative services designed to protect and enhance your safety and well-being. Explore our offerings below:
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
