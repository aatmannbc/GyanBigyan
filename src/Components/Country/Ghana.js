import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Country.css';

function Ghana() {
  // Similar implementation as Nepal.js
  // Add the questions and logic for Ghana
  const navigate = useNavigate();

  return (
    <div className="country-container">
      <h1 className="country-title">Ghana</h1>
      <p className="country-description">
        Welcome to the Ghana page. Here you will find information and quizzes related to Ghana's culture and history.
      </p>
      {/* Add the board and question logic here */}
      <button onClick={() => navigate('/play')} className="back-button">Back to Board</button>
    </div>
  );
}

export default Ghana;