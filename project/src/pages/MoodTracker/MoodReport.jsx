import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MoodReport.css'; // Importing the same CSS file for styling
import Header from '../../components/Header/Header';  // Assuming Header component exists
import Footer from '../../components/Footer/Footer';  // Assuming Footer component exists

const API_BASE_URL = 'http://localhost:8060/api/mood';

const MoodReport = () => {
  const [previousMoodReports, setPreviousMoodReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to fetch previous mood reports
  const fetchPreviousMoodReports = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    if (!userId) {
      setError('User ID not found. Please log in.');
      setLoading(false);
      return;
    }
    if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
      }

    try {
      const response = await axios.get(`${API_BASE_URL}/entries/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Add token to the Authorization header for GET request
        }
      }
      );
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setPreviousMoodReports(response.data);
      } else {
        setError('No Reports Present');
      }
    } catch (error) {
      setError('Error fetching previous mood reports');
    } finally {
      setLoading(false);
    }
  };

  // Fetch the reports when the component mounts
  useEffect(() => {
    fetchPreviousMoodReports();
  }, []);

  // Handle deletion of a specific mood report
  const handleDelete = async (reportId) => {
    try {
        const token = localStorage.getItem('authToken'); 
      if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
      }
      await axios.delete(`${API_BASE_URL}/${reportId}`,{
        headers: {
            'Authorization': `Bearer ${token}`, // Add token to the Authorization header
          }
      });
      // Refresh the list of reports after deletion
      fetchPreviousMoodReports();
    } catch (error) {
      setError('Error deleting mood report');
    }
  };

  return (
    <div className="previous-mood-reports-container">
      <Header />
      <h1>Previous Mood Reports</h1>
      <button onClick={() => navigate('/moodtracker')} className="back-button">
        Back to Mood Tracker
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="reports-grid">
          {Array.isArray(previousMoodReports) && previousMoodReports.length > 0 ? (
            previousMoodReports.map((report) => (
              <div key={report.moodId} className="report-card">
                <h3>Date: {new Date(report.localDate).toLocaleDateString()}</h3>
                <p>Mood Score: {report.moodScore}</p>
                <p>Journal Entry: {report.journalEntry}</p>
                <p>Sleep Hours: {report.sleepHours}</p>
                <p>Water Intake: {report.waterIntake} ml</p>
                <button onClick={() => handleDelete(report.moodId)} className="delete-button">
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No mood reports available</p>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MoodReport;
