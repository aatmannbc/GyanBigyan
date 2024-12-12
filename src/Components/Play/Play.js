import React from 'react';
import { Link } from 'react-router-dom';
import './Play.css';

function Play() {
  return (
    <div className="play-container">
      <div className="instructions">
        <p>Here's how you can play the game:</p>
        <ol>
          <li>Answer questions to select tiles on the board.</li>
          <li>Get a row, column, or diagonal of correct answers to get a BINGO!</li>
          <li>Each correct answer is worth 10 points.</li>
          <li>Each incorrect answer deducts 5 points.</li>
          <li>For every BINGO user wins 20 points.</li>
          <li>Player with the highest score wins.</li>
          
    
        </ol>
      </div>
      <h1 className="play-title">Select Your Option</h1>
      <div className="play-options">
        <Link to="/nepal">
          <button className="play-button">Nepal</button>
        </Link>
        <Link to="/jamaica">
          <button className="play-button">Jamaica</button>
        </Link>
        <Link to="/ghana">
          <button className="play-button">Ghana</button>
        </Link>
      </div>
      <div className="home-button-container">
        <Link to="/">
          <button className="home-button">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Play;