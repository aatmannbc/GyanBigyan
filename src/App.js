import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Signup from './Components/LoginSignup/Signup';
import Home from './Components/Home/Home';
import Nepal from './Components/Country/Nepal';
import Jamaica from './Components/Country/Jamaica';
import Ghana from './Components/Country/Ghana';
import Play from './Components/Play/Play';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/nepal" element={<Nepal />} />
          <Route path="/jamaica" element={<Jamaica />} />
          <Route path="/ghana" element={<Ghana />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
