// import React, { useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import INSTRUCTIONS from './Instructions.ts'; // Assuming Instructions.ts is your data file
// import './Instructions.css';
// import Header from '../../components/Header/Header.jsx';
// import Footer from '../../components/Footer/Footer.jsx';
// import survey from '../../assets/survey.png';

// const Instructions = () => {
//   const navigate = useNavigate();

//   // Navigate to the test page
//   const handleStartTest = () => {
//     navigate('/test'); // Ensure this path matches the route in your application
//   };

//   // Add animation on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const instructionItems = document.querySelectorAll('.instruction-item');
//       const windowHeight = window.innerHeight;

//       instructionItems.forEach(item => {
//         const { top, bottom } = item.getBoundingClientRect();
//         if (top < windowHeight && bottom > 0) {
//           item.classList.add('show');
//         }
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Initial check on page load

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div className="instructions-container">
//       <Header />
//       <div className="instructions">
//         <h1>Mental Health Check</h1>
//         <p>
//           Assess your well-being with a comprehensive 25-question test. Based on the Burns Depression Checklist from *Feeling Good: the New Mood Therapy*.
//         </p>
//         <div className="instruction-list">
//           {INSTRUCTIONS.map((instruction, index) => (
//             <div key={index} className="instruction-item">
//               <img src={instruction.image} alt={`Instruction ${index + 1}`} />
//               <p>{instruction.text}</p>
//             </div>
//           ))}
//         </div>
//         <p>
//           Don't wait any longer to start taking control of your mind and your life.
//         </p>
        
//         <button onClick={handleStartTest} className="cta-button">
//           Take test now
//         </button>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Instructions;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import INSTRUCTIONS from './Instructions.ts'; // Assuming Instructions.ts is your data file
import './Instructions.css';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

// Import images at the top of the file
import surveyImage from '../../assets/survey.png';
import scoreImage from '../../assets/score.png';
import honestImage from '../../assets/honest.png';
import timeImage from '../../assets/time.png';
import calculateImage from '../../assets/calculate.png';
import helpImage from '../../assets/help.png';
import confidentialImage from '../../assets/confidential.png';

const Instructions = () => {
  const navigate = useNavigate();

  // Navigate to the test page
  const handleStartTest = () => {
    navigate('/test'); // Ensure this path matches the route in your application
  };

  // Add animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const instructionItems = document.querySelectorAll('.instruction-item');
      const windowHeight = window.innerHeight;

      instructionItems.forEach(item => {
        const { top, bottom } = item.getBoundingClientRect();
        if (top < windowHeight && bottom > 0) {
          item.classList.add('show');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on page load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Map each instruction and link the appropriate image dynamically
  const getImageForInstruction = (imageName) => {
    switch(imageName) {
      case 'survey.png': return surveyImage;
      case 'score.png': return scoreImage;
      case 'honest.png': return honestImage;
      case 'time.png': return timeImage;
      case 'calculate.png': return calculateImage;
      case 'help.png': return helpImage;
      case 'confidential.png': return confidentialImage;
      default: return null;
    }
  };

  return (
    <div className="instructions-container">
      <Header />
      <div className="instructions">
        <h1>Mental Health Check</h1>
        <p>
          Assess your well-being with a comprehensive 25-question test. Based on the Burns Depression Checklist from *Feeling Good: the New Mood Therapy*.
        </p>
        <div className="instruction-list">
          {INSTRUCTIONS.map((instruction, index) => (
            <div key={index} className="instruction-item">
              {/* Dynamically get the image source */}
              <img src={getImageForInstruction(instruction.image)} alt={`Instruction ${index + 1}`} className="uniform-image" />
              <p>{instruction.text}</p>
            </div>
          ))}
        </div>
        <p>
          Don't wait any longer to start taking control of your mind and your life.
        </p>
        
        <button onClick={handleStartTest} className="cta-button">
          Take test now
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Instructions;
