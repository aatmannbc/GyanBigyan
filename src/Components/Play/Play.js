import React from 'react';
import { Link } from 'react-router-dom';
import './Play.css';

function Play() {
  return (
    <div className="play-container">
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
    </div>
  );
}

export default Play;