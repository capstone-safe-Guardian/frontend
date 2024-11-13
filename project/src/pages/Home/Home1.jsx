import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Chatbox from '../../components/Hero/ChatBox';
import Footer from '../../components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home1.css'; // Import the CSS file

const Home1 = () => {
  const [greetingMessage, setGreetingMessage] = useState('');

  useEffect(() => {
    const message = localStorage.getItem('greetingMessage');
    console.log('Retrieved message:', message); // Check if message is retrieved
    if (message) {
      setGreetingMessage(message);
      localStorage.removeItem('greetingMessage');  // Clear the message after displaying it
      toast.info(message);  // Display the notification
    }
  }, []);

  return (
    <div className="home-container"> {/* Add the home-container class here */}
      <Header />
      <Hero />
      <Chatbox />
      <Footer />
      <ToastContainer /> {/* Add this component */}
    </div>
  );
};

export default Home1;
