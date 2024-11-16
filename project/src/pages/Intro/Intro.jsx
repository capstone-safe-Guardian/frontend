import React from 'react';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import MentalWellBeingAnimationData from '../../assets/lottie/mental-wellbeing.json';
import './Intro.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Intro = () => {
  const navigate = useNavigate();

  const handleViewPreviousScores = () => {
    navigate('/previous-scores');
  };

  return (
    <div className="page-container bg-gradient-to-r from-blue-100 to-purple-100">
      <Header />
      <div className="intro-content max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-content md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Assess Your Mental Well-being</h1>
          <p className="text-lg text-gray-600 mb-6">
            Take a simple, reliable test to understand your emotional state. MindCheck helps you gain insight into your thoughts, feelings, and overall mental well-being. Get started on your journey to self-awareness and improved mental health today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/instructions" className="cta-button">
              Start Your Assessment
            </Link>
            <button onClick={handleViewPreviousScores} className="cta-button">
              View Previous Test Scores
            </button>
          </div>
        </div>
        <div className="lottie-animation md:w-1/2">
          <Lottie animationData={MentalWellBeingAnimationData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Intro;
