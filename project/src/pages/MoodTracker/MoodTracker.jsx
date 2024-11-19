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
          label="Share what's making you feel this way..."
          placeholder={mood <= 4 ? "What's bringing you down today?" : 
                      mood >= 7 ? "What's making you feel so good?" :
                      "Your feelings matter. Express freely what led to your current mood."}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          sx={{ marginBottom: "15px" }}
          //helperText="Your feelings matter. Express freely what led to your current mood."
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


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// // Soft, comforting color palette
// const colors = {
//   background: "#F7F9FC",
//   primarySoft: "#6A9EF2",
//   secondarySoft: "#A2D3F3",
//   textPrimary: "#2C3E50",
//   moodColors: {
//     low: "#E74C3C",    // Soft red for low moods
//     medium: "#F39C12", // Warm orange for neutral moods
//     high: "#2ECC71"    // Gentle green for positive moods
//   }
// };

// const moodDescriptions = {
//   1: {
//     text: "It's okay to not be okay. Your feelings are valid.",
//     color: colors.moodColors.low
//   },
//   5: {
//     text: "Every emotion is important. You're doing your best.",
//     color: colors.moodColors.medium
//   },
//   10: {
//     text: "Celebrating your joy and positive moments!",
//     color: colors.moodColors.high
//   }
// };

// const CompassionateMoodTracker = () => {
//   const [mood, setMood] = useState(5);
//   const [journalEntry, setJournalEntry] = useState("");
//   const [weeklyMoodData, setWeeklyMoodData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Fetch mood entries on component mount
//   useEffect(() => {
//     const fetchMoodEntries = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         const token = localStorage.getItem('authToken');
        
//         if (!userId || !token) {
//           setError("Please log in to view your mood tracker");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`http://localhost:8060/api/mood/entries/${userId}`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });

//         const formattedData = response.data.map(entry => ({
//           day: new Date(entry.localDate).toLocaleDateString(),
//           moodScore: entry.moodScore
//         }));

//         setWeeklyMoodData(formattedData);
//         setLoading(false);
//       } catch (err) {
//         setError("Error fetching mood entries");
//         setLoading(false);
//       }
//     };

//     fetchMoodEntries();
//   }, []);

//   // Determine current mood description
//   const currentMoodDescription = moodDescriptions[
//     Object.keys(moodDescriptions).reduce((prev, curr) => 
//       Math.abs(curr - mood) < Math.abs(prev - mood) ? curr : prev
//     )
//   ];

//   // Render emojis based on mood
//   const renderMoodEmoji = (mood) => {
//     const emojis = ['😖', '😔', '😞', '☹️', '😐', '🙂', '😊', '😄', '😁', '🤩'];
//     return emojis[mood - 1];
//   };

//   // Save mood entry
//   const saveMoodEntry = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       const token = localStorage.getItem('authToken');

//       if (!userId || !token) {
//         alert("Please log in to save your mood entry");
//         return;
//       }

//       await axios.post(
//         "http://localhost:8060/api/mood/save",
//         {
//           userId,
//           moodScore: mood,
//           journalEntry: journalEntry || "",
//           localDate: new Date().toISOString().split("T")[0]
//         },
//         {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }
//       );

//       alert("Your emotional check-in has been recorded. Take care of yourself.");
      
//       // Refresh mood entries
//       const response = await axios.get(`http://localhost:8060/api/mood/entries/${userId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const formattedData = response.data.map(entry => ({
//         day: new Date(entry.localDate).toLocaleDateString(),
//         moodScore: entry.moodScore
//       }));

//       setWeeklyMoodData(formattedData);
//     } catch (error) {
//       console.error("Error saving mood", error);
//       alert("Unable to save mood entry. Please try again.");
//     }
//   };

//   // View previous mood reports
//   const handleViewPreviousReports = () => {
//     navigate("/previousreports");
//   };

//   return (
//     <div style={{ 
//       backgroundColor: colors.background, 
//       minHeight: '100vh', 
//       fontFamily: "'Inter', sans-serif",
//       padding: '20px'
//     }}>
//       <div style={{ 
//         maxWidth: '800px', 
//         margin: '0 auto', 
//         backgroundColor: 'white', 
//         borderRadius: '15px', 
//         boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//         padding: '30px'
//       }}>
//         <div style={{ textAlign: 'center', marginBottom: '30px' }}>
//           <h1 style={{ 
//             color: colors.textPrimary, 
//             fontSize: '2.5rem', 
//             marginBottom: '10px' 
//           }}>
//             Your Emotional Wellness Journal
//           </h1>
//           <p style={{ 
//             color: colors.textPrimary, 
//             opacity: 0.7 
//           }}>
//             A gentle space to understand and nurture your emotional well-being
//           </p>
//         </div>

//         {/* Mood Selection Section */}
//         <div style={{ textAlign: 'center', marginBottom: '30px' }}>
//           <h2 style={{ 
//             color: currentMoodDescription.color,
//             fontSize: '1.8rem',
//             marginBottom: '20px'
//           }}>
//             {renderMoodEmoji(mood)} How are you feeling today?
//           </h2>
//           <p style={{ 
//             color: colors.textPrimary, 
//             opacity: 0.8,
//             marginBottom: '20px'
//           }}>
//             {currentMoodDescription.text}
//           </p>

//           {/* Mood Buttons */}
//           <div style={{ 
//             display: 'flex', 
//             justifyContent: 'center', 
//             flexWrap: 'wrap',
//             gap: '10px'
//           }}>
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
//               <button 
//                 key={level}
//                 onClick={() => setMood(level)}
//                 style={{
//                   width: '40px',
//                   height: '40px',
//                   borderRadius: '50%',
//                   border: mood === level ? `3px solid ${currentMoodDescription.color}` : '1px solid #e0e0e0',
//                   backgroundColor: mood === level ? currentMoodDescription.color : 'white',
//                   color: mood === level ? 'white' : colors.textPrimary,
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   transform: mood === level ? 'scale(1.1)' : 'scale(1)'
//                 }}
//               >
//                 {level}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Journal Entry Section */}
//         <div style={{ marginBottom: '30px' }}>
//           <textarea 
//             placeholder="Would you like to share what's on your mind today? (Optional)"
//             style={{
//               width: '100%',
//               minHeight: '150px',
//               border: `1px solid ${colors.secondarySoft}`,
//               borderRadius: '10px',
//               padding: '15px',
//               fontSize: '1rem',
//               resize: 'vertical'
//             }}
//             value={journalEntry}
//             onChange={(e) => setJournalEntry(e.target.value)}
//           />
//         </div>

//         {/* Action Buttons */}
//         <div style={{ display: 'flex', gap: '15px' }}>
//           <button 
//             onClick={saveMoodEntry}
//             style={{
//               flex: 1,
//               padding: '15px',
//               backgroundColor: colors.primarySoft,
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               fontSize: '1rem',
//               cursor: 'pointer',
//               transition: 'background-color 0.3s ease'
//             }}
//             onMouseOver={(e) => e.target.style.backgroundColor = colors.secondarySoft}
//             onMouseOut={(e) => e.target.style.backgroundColor = colors.primarySoft}
//           >
//             Save My Emotional Check-in
//           </button>
//           <button 
//             onClick={handleViewPreviousReports}
//             style={{
//               flex: 1,
//               padding: '15px',
//               backgroundColor: 'white',
//               color: colors.primarySoft,
//               border: `2px solid ${colors.primarySoft}`,
//               borderRadius: '10px',
//               fontSize: '1rem',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseOver={(e) => {
//               e.target.style.backgroundColor = colors.primarySoft;
//               e.target.style.color = 'white';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.backgroundColor = 'white';
//               e.target.style.color = colors.primarySoft;
//             }}
//           >
//             View Previous Reports
//           </button>
//         </div>

//         {/* Mood Trends Section */}
//         {!loading && weeklyMoodData.length > 0 && (
//           <div style={{ marginTop: '30px' }}>
//             <h2 style={{ 
//               color: colors.textPrimary, 
//               textAlign: 'center', 
//               marginBottom: '20px' 
//             }}>
//               Your Mood Trends
//             </h2>
//             <LineChart width={600} height={300} data={weeklyMoodData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="moodScore" stroke={colors.primarySoft} />
//             </LineChart>
//           </div>
//         )}

//         {/* Error or Loading State */}
//         {loading && (
//           <div style={{ textAlign: 'center', color: colors.textPrimary }}>
//             Loading your emotional wellness data...
//           </div>
//         )}
//         {error && (
//           <div style={{ 
//             textAlign: 'center', 
//             color: colors.moodColors.low, 
//             marginTop: '20px' 
//           }}>
//             {error}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompassionateMoodTracker;