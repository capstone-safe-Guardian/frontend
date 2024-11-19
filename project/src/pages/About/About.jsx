import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">About Safe Guardian</h1>
        <div className="grid grid-cols-3 gap-8 m-auto">
          <section className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Safe Guardian is dedicated to empowering individuals to live safer, healthier lives. Our mission is to provide innovative solutions that enhance personal safety and well-being, ensuring peace of mind for our users and their loved ones.
            </p>
          </section>
          
          <section className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-700">
              We envision a world where everyone feels secure and confident in their daily lives, supported by cutting-edge technology and compassionate care. Safe Guardian strives to be at the forefront of personal safety and wellness.
            </p>
          </section>
          
          <section className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Values</h2>
            <ul className="space-y-3">
              {[
                { icon: '🛡️', text: 'Prioritize user safety and security' },
                { icon: '💡', text: 'Continuously develop innovative protection methods' },
                { icon: '💪', text: 'Empower users with safety tools and knowledge' }
              ].map((value, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="mr-3 text-xl">{value.icon}</span>
                  {value.text}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About; 