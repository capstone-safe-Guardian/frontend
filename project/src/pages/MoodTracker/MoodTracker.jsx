import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import "./MoodTracker.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const API_BASE_URL = "http://localhost:8060/api/mood";

const moodDescriptions = {
  1: "Very Depressed 😞: Feeling extremely down, hopeless, or in despair. Struggling to find motivation or interest in any activities.",
  2: "Depressed 😔: Feeling very low, with a lack of energy, and persistent sadness. Daily activities feel overwhelming.",
  3: "Very Unhappy 😢: Experiencing strong feelings of unhappiness and frustration. Struggling to enjoy things that usually bring joy.",
  4: "Unhappy ☹️: Feeling down or sad, but able to manage daily tasks. Joy is hard to find, but not entirely absent.",
  5: "Neutral 😐: Neither happy nor sad, feeling indifferent. Just going through the motions of the day.",
  6: "Slightly Happy 🙂: Mild contentment, with a positive outlook. Not overly joyful, but a general sense of well-being.",
  7: "Happy 😊: Feeling positive, with a good energy level. Engaging in daily activities with interest and enthusiasm.",
  8: "Very Happy 😄: Feeling very good, with strong feelings of happiness. Enjoying activities and interactions with others.",
  9: "Elated 😃: Experiencing high energy and joy. Feeling very optimistic and excited about life.",
  10: "Euphoric 🤩: Feeling extremely happy, almost on top of the world. Very high energy, enthusiasm, and a strong sense of well-being.",
};

const getCurrentUserId = () => {
  return localStorage.getItem("userId");
};

const MoodTracker = () => {
  const [mood, setMood] = useState(5);
  const [weeklyMoodData, setWeeklyMoodData] = useState([]);
  const [journalEntry, setJournalEntry] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userId = getCurrentUserId();
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

      try {
        const moodResponse = await axios.get(`${API_BASE_URL}/entries/${userId}`,{
        
            headers: {
              'Authorization': `Bearer ${token}`, // Add token to the Authorization header
            }
          });
        const data = moodResponse.data.map((entry) => ({
          day: new Date(entry.localDate).toLocaleDateString(),
          moodScore: entry.moodScore,
        }));
        setWeeklyMoodData(data);

        // const recommendationsResponse = await axios.get(`${API_BASE_URL}/recommendations`, {
        //   params: { userId }
        // });
        // setRecommendations(recommendationsResponse.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoodChange = (event, newValue) => {
    setMood(newValue);
  };

  const handleViewPreviousReports = () => {
    navigate("/previousreports");
  };

  const handleSaveMood = async () => {
    const userId = getCurrentUserId();
    const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
  
    if (!userId) {
      alert("User ID not found. Please log in.");
      return;
    }
  
    if (!token) {
      alert("Authentication token is missing. Please log in.");
      return;
    }
  
    try {
      // Save the mood entry with the authorization token in the header
      await axios.post(
        `${API_BASE_URL}/save`,
        {
          userId,
          moodScore: mood,
          journalEntry: journalEntry || "",
          sleepHours: sleepHours || 0,
          waterIntake: waterIntake || 0,
          localDate: new Date().toISOString().split("T")[0], // Save the current date
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Add token to the Authorization header
          }
        }
      );
  
      alert("Mood entry saved successfully!");
  
      // Refresh the weekly report after saving
      const moodResponse = await axios.get(
        `${API_BASE_URL}/entries/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Add token to the Authorization header for GET request
          }
        }
      );
  
      const data = moodResponse.data.map((entry) => ({
        day: new Date(entry.localDate).toLocaleDateString(),
        moodScore: entry.moodScore,
      }));
  
      setWeeklyMoodData(data);
    } catch (error) {
      console.error('Error saving mood entry:', error);
      alert("Error saving mood entry");
    }
  };
  

  return (
    <div className="mood-tracker">
      <Header />
      <br />
      <div className="mood-tracker-header">
        <h1>Track Your Mood</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewPreviousReports}
          className="view-previous-reports-btn"
        >
          View Previous Mood Reports
        </Button>
      </div>
      <div className="slider-container">
        <h2>Rate Your Mood</h2>
        <Slider
          value={mood}
          min={1}
          max={10}
          step={1}
          onChange={handleMoodChange}
          aria-labelledby="mood-slider"
          valueLabelDisplay="auto"
        />
        <div className="mood-description">
          <h3>Mood Description:</h3>
          <p>{moodDescriptions[mood]}</p>
        </div>
      </div>
      <div className="form-container">
        <TextField
          label="Journal Entry"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          sx={{ marginBottom: "15px" }}
        />
        <div className="numeric-inputs">
          <TextField
            label="Sleep Hours"
            type="number"
            variant="outlined"
            value={sleepHours}
            onChange={(e) =>
              setSleepHours(e.target.value === "" ? "" : Number(e.target.value))
            }
            sx={{ marginBottom: "15px" }}
            inputProps={{ min: 0 }}
          />
          <TextField
            label="Water Intake (ml)"
            type="number"
            variant="outlined"
            value={waterIntake}
            onChange={(e) =>
              setWaterIntake(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            sx={{ marginBottom: "15px" }}
            autoComplete="off"
            inputProps={{ min: 100 }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveMood}
          sx={{ padding: "10px 20px", marginTop: "15px" }}
        >
          Save Mood Entry
        </Button>
      </div>
      <div className="mood-graph">
        <h2>Weekly Mood Report</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <LineChart width={600} height={300} data={weeklyMoodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="moodScore" stroke="#8884d8" />
          </LineChart>
        )}
      </div>
      <div className="recommendations">
        <h2>Recommendations</h2>
        {loading ? <p>Loading...</p> : <p>{recommendations}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default MoodTracker;
