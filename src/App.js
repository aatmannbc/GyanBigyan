import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import Play from './Components/Play/Play';
import Nepal from './Components/Country/Nepal';
import Jamaica from './Components/Country/Jamaica';
import Ghana from './Components/Country/Ghana';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/play" element={<Play />} />
          <Route path="/nepal" element={<Nepal />} />
          <Route path="/jamaica" element={<Jamaica />} />
          <Route path="/ghana" element={<Ghana />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
