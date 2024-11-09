import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '/Users/aatmannbc/Documents/GyanBigyan/src/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Home.css';

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="navbar">
        {user ? (
          <div className="user-menu">
            <span className="user-email">{user.email}</span>
            <div className="user-dropdown">
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login">
              <button className="home-button">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="home-button">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
      <h1 className="home-title">Welcome to GyanBigyan</h1>
      <p className="home-description">
        GyanBigyan is a web-based game that merges the excitement of traditional bingo with knowledge quizzes, providing an engaging platform for users to assess their understanding of various subjects. Players will choose bingo boards categorized by country, with questions tailored to each region's culture and history, making learning interactive and fun.
      </p>
      <Link to="/play">
        <button className="home-button">Play</button>
      </Link>
    </div>
  );
}

export default Home;