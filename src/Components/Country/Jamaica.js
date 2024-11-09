import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Country.css';

function Jamaica() {
  // Similar implementation as Nepal.js
  // Add the questions and logic for Jamaica
  const navigate = useNavigate();

  return (
    <div className="country-container">
      <h1 className="country-title">Jamaica</h1>
      <p className="country-description">
        Welcome to the Jamaica page. Here you will find information and quizzes related to Jamaica's culture and history.
      </p>
      {/* Add the board and question logic here */}
      <button onClick={() => navigate('/play')} className="back-button">Back to Board</button>
    </div>
  );
}

export default Jamaica;