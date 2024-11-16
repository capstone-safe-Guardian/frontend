import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './PreviousScores.css';

const PreviousScores = () => {
  const [testScores, setTestScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviousScores = async () => {
      try {
        
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken'); 
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }
      if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
      }
        if (userId) {
          const response = await axios.get(`http://localhost:8060/api/test/testHistory?userId=${userId}`,{
            headers: {
              'Authorization': `Bearer ${token}`, // Add token to the Authorization header
            }
          });
          
          // Ensure response is an array
          setTestScores(Array.isArray(response.data) ? response.data : []);
        } else {
          alert('User ID not found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching previous test scores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviousScores();
  }, []);

  return (
    <div className="previous-scores-container bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="previous-scores-heading text-3xl font-bold text-gray-800 mb-6">Previous Test Scores</h1>
        <button 
          onClick={() => navigate('/intro')} 
          className="back-button mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Back to Test
        </button>
        {loading ? (
          <p className="loading text-lg text-gray-600">Loading...</p>
        ) : testScores.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testScores.map((score, index) => (
              <div key={index} className="score-card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Test Result</h2>
                <p className="text-gray-600">Score: <span className="font-bold text-blue-600">{score.score}</span></p>
                <p className="text-gray-600">Depression Level: <span className="font-bold text-purple-600">{score.depressionLevel}</span></p>
                <p className="score-date text-gray-600">Date: {new Date(score.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-scores-message text-lg text-gray-600">No previous test scores found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default PreviousScores;
