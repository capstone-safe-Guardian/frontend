import React, { useState } from 'react';
import './Test.css'; // Make sure your CSS is applied correctly
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

const QUESTIONS = [
  {
    category: "Thoughts & Feelings",
    items: [
      "Feeling sad or down in the dumps",
      "Feeling unhappy or blue",
      "Crying spells or tearfulness",
      "Feeling discouraged",
      "Feeling hopeless",
      "Low self-esteem",
      "Feeling worthless or inadequate",
      "Guilt or shame",
      "Criticizing yourself or blaming yourself",
      "Difficulty making decisions"
    ]
  },
  {
    category: "Activities & Personal Relationships",
    items: [
      "Loss of interest in family, friends or colleagues",
      "Loneliness",
      "Spending less time with family or friends",
      "Loss of motivation",
      "Loss of interest in work or other activities",
      "Avoiding work or other activities",
      "Loss of pleasure or satisfaction in life"
    ]
  },
  {
    category: "Physical Symptoms",
    items: [
      "Feeling tired",
      "Difficulty sleeping or sleeping too much",
      "Decreased or increased appetite",
      "Loss of interest in everything",
      "Worrying about your health"
    ]
  },
  {
    category: "Suicidal Urges",
    items: [
      "Do you have any suicidal thoughts?",
      "Would you like to end your life?",
      "Do you have a plan for harming yourself?"
    ]
  }
];

const SCORE_RANGES = [
  { min: 0, max: 5, level: "Minimal depression" },
  { min: 6, max: 10, level: "Mild depression" },
  { min: 11, max: 25, level: "Moderate depression" },
  { min: 26, max: 50, level: "Severe depression" },
  { min: 51, max: Infinity, level: "Extreme depression" }
];

const RECOMMENDATIONS = {
  "Minimal depression": [
    "Continue practicing self-care and maintaining a healthy lifestyle.",
    "Engage in regular exercise and maintain a balanced diet.",
    "Practice mindfulness or meditation to manage stress."
  ],
  "Mild depression": [
    "Consider talking to a trusted friend or family member about your feelings.",
    "Explore self-help books or online resources on managing mood.",
    "Establish a regular sleep schedule and prioritize getting enough rest."
  ],
  "Moderate depression": [
    "Consider seeking professional help from a therapist or counselor.",
    "Look into cognitive-behavioral therapy (CBT) techniques.",
    "Ensure you're maintaining social connections and not isolating yourself."
  ],
  "Severe depression": [
    "Strongly recommend consulting with a mental health professional.",
    "Consider discussing medication options with a psychiatrist.",
    "Ensure you have a support system in place and don't hesitate to reach out for help."
  ],
  "Extreme depression": [
    "Urgent: Please seek immediate professional help from a mental health expert.",
    "Contact a crisis helpline if you're having thoughts of self-harm.",
    "Consider inpatient treatment options for intensive care and support."
  ]
};

const Test = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [depressionLevel, setDepressionLevel] = useState(null);

  const handleOptionChange = (category, questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [`${category}-${questionIndex}`]: value
    }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + parseInt(value), 0);
  };

  const getDepressionLevel = (score) => {
    return SCORE_RANGES.find(range => score >= range.min && score <= range.max).level;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalScore = calculateScore();
    const level = getDepressionLevel(totalScore);
    setScore(totalScore);
    setDepressionLevel(level);

    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');

    // Prepare data to send
    const testData = {
      score: totalScore,
      depressionLevel: level,
      userId: userId // Include userId in the data
    };

    // Send data to the backend
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
      await axios.post('http://localhost:8060/api/test/test-scores', testData,{
        headers: {
          'Authorization': `Bearer ${token}`, // Add token to the Authorization header
        }
      });
      alert('Test score saved successfully!');
    } catch (error) {
      console.error('There was an error saving the test score!', error);
      alert('Failed to save test score. Please try again.');
    }
  };

  const ResultsDisplay = ({ score, level }) => (
    <div className="results-display">
      <h2>Test Results</h2>
      <p>Your total score: {score}</p>
      <p>Depression level: {level}</p>
      <h3>Recommendations:</h3>
      <ul>
        {RECOMMENDATIONS[level].map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
      <p className="disclaimer">
        Note: This assessment is not a diagnostic tool. Please consult with a qualified mental health professional for a proper evaluation.
      </p>
    </div>
  );

  return (
    <div className="test-container">
      <div className="test-content">
        <Header />
        <h1>Mental Health Assessment</h1>
        {score === null ? (
          <form onSubmit={handleSubmit}>
            {QUESTIONS.map((section, sectionIndex) => (
              <div key={sectionIndex} className="question-section">
                <h2>{section.category}</h2>
                {section.items.map((question, questionIndex) => (
                  <div key={questionIndex} className="question-item">
                    <p>{questionIndex + 1}. {question}</p>
                    <div className="options">
                      {[0, 1, 2, 3, 4].map((value) => (
                        <label key={value}>
                          <input
                            type="radio"
                            name={`${section.category}-${questionIndex}`}
                            value={value}
                            onChange={() => handleOptionChange(section.category, questionIndex, value)}
                            checked={answers[`${section.category}-${questionIndex}`] === value}
                            required
                          />
                          {value}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button type="submit" className="submit-button">Submit</button>
          </form>
        ) : (
          <ResultsDisplay score={score} level={depressionLevel} />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Test;
