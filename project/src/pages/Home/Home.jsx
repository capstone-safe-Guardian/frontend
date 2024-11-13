import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer';
import './Home.css'; // Importing the CSS file for styling

// Function-based component declaration
function Home() {
  return (
    <>
      <Navbar />  {/* Navbar component */}
      <Hero />    {/* Hero section */}
      <Footer />  {/* Footer component */}
    </>
  );
}

export default Home;  // Export the Home component
