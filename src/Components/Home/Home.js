import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to GyanBigyan</h1>
      <p className="home-description">
        GyanBigyan is a web-based game that merges the excitement of traditional bingo with knowledge quizzes, providing an engaging platform for users to assess their understanding of various subjects. Players will choose bingo boards categorized by country, with questions tailored to each region's culture and history, making learning interactive and fun.
      </p>
      <Link to="/login">
        <button className="home-button">Login</button>
      </Link>
      <Link to="/play">
        <button className="home-button">Play</button>
      </Link>
    </div>
  );
}

export default Home;