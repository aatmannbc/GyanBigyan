import React, { useState, useEffect } from 'react';
import './Country.css';

function Nepal() {
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(null);

  const questions = [
    { question_text: "What is the capital city of Nepal?", answer: "Kathmandu", options: ["Kathmandu", "Pokhara", "Lumbini"] },
    { question_text: "Which mountain, the tallest in the world, is located in Nepal?", answer: "Mount Everest", options: ["Mount Everest", "Mount K2", "Mount Kilimanjaro"] },
    { question_text: "What makes the flag of Nepal unique among national flags?", answer: "It is the only non-rectangular flag", options: ["It is the only non-rectangular flag", "It is the only green flag in the world", "It has a square shape"] },
    { question_text: "Where in Nepal was Siddhartha Gautama, known as Buddha, born?", answer: "Lumbini", options: ["Lumbini", "Pokhara", "Bhaktapur"] },
    { question_text: "Which river in Nepal is one of the holiest rivers in Hinduism?", answer: "Bagmati River", options: ["Bagmati River", "Gandaki River", "Trishuli River"] },
    { question_text: "How many ethnic groups are officially recognized in Nepal?", answer: "Over 120", options: ["Over 120", "Over 200", "50"] },
    { question_text: "What is the official language of Nepal, and are there other widely spoken languages?", answer: "Nepali", options: ["Nepali", "Hindi", "English"] },
    { question_text: "Which two countries border Nepal?", answer: "China and India", options: ["China and India", "India and Bhutan", "China and Bangladesh"] },
    { question_text: "What is the name of Nepal's currency?", answer: "Nepalese Rupee", options: ["Nepalese Rupee", "Indian Rupee", "Nepalese Dollar"] },
    { question_text: "What is the significance of the festival Dashain in Nepalese culture?", answer: "Celebrates the triumph of good over evil", options: ["Celebrates the triumph of good over evil", "Honors the monsoon season", "Marks the new year"] },
    { question_text: "Which traditional Newari festival celebrates the bond between brothers and sisters?", answer: "Bhai Tika", options: ["Bhai Tika", "Holi", "Losar"] },
    { question_text: "Which is the longest river in Nepal?", answer: "Ghaghara (Karnali) River", options: ["Ghaghara (Karnali) River", "Koshi River", "Bagmati River"] },
    { question_text: "How many national parks are there in Nepal?", answer: "12", options: ["12", "8", "15"] },
    { question_text: "What is the main religion practiced in Nepal, and how does it influence daily life?", answer: "Hinduism", options: ["Hinduism", "Buddhism", "Islam"] },
    { question_text: "What region is known for its famous trekking routes, including the Annapurna Circuit?", answer: "Annapurna Region", options: ["Annapurna Region", "Everest Region", "Mustang Region"] },
    { question_text: "Who are the Sherpas, and why are they significant to Nepalese culture?", answer: "Ethnic group known for mountaineering skills", options: ["Ethnic group known for mountaineering skills", "Himalayan monks", "Traditional musicians"] },
    { question_text: "What is the name of Nepal's popular dumpling dish?", answer: "Momos", options: ["Momos", "Samosas", "Pakoras"] },
    { question_text: "Which ancient Nepalese city is known for its Durbar Square and UNESCO World Heritage sites?", answer: "Bhaktapur", options: ["Bhaktapur", "Pokhara", "Lumbini"] },
    { question_text: "How many UNESCO World Heritage Sites are located in Nepal?", answer: "4", options: ["4", "2", "5"] },
    { question_text: "What makes Chitwan National Park special in terms of wildlife?", answer: "Home to Bengal tigers and one-horned rhinoceroses", options: ["Home to Bengal tigers and one-horned rhinoceroses", "Largest bird population in the world", "Home to the endangered red panda"] },
    { question_text: "Who was the first person from Nepal to summit Mount Everest?", answer: "Tenzing Norgay", options: ["Tenzing Norgay", "Pasang Dawa Sherpa", "Kami Rita Sherpa"] },
    { question_text: "What is Tihar, and how is it celebrated differently from other Hindu festivals?", answer: "Festival of lights that honors animals", options: ["Festival of lights that honors animals", "Harvest festival for farmers", "New year celebration"] },
    { question_text: "Which Nepali city is famous for being a major center of art, architecture, and culture?", answer: "Patan (Lalitpur)", options: ["Patan (Lalitpur)", "Dharan", "Biratnagar"] },
    { question_text: "How do the diverse landscapes of Nepal affect the climate across the country?", answer: "Ranges from subtropical to alpine", options: ["Ranges from subtropical to alpine", "Primarily arid throughout the country", "Tropical climate everywhere"] },
    { question_text: "What is the popular national beverage of Nepal, often served during gatherings?", answer: "Raksi", options: ["Raksi", "Lassi", "Coffee"] }
  ];

  useEffect(() => {
    // Timer
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTileClick = (index) => {
    if (!selectedTiles.includes(index)) {
      setCurrentQuestion(index);
      setAttempts(0);
      setWrongAnswer(null);
    }
  };

  const handleAnswerClick = (index, option) => {
    if (questions[index].answer === option) {
      if (attempts === 0) {
        setScore(score + 10);
      } else if (attempts === 1) {
        setScore(score + 5);
      }
      setSelectedTiles([...selectedTiles, index]);
      setCurrentQuestion(null);
    } else {
      setWrongAnswer(option);
      setAttempts(attempts + 1);
      if (attempts >= 1) {
        alert('You have one more try left!');
      }
      if (attempts >= 2) {
        setSelectedTiles([...selectedTiles, index]);
        setCurrentQuestion(null);
      }
    }
  };

  return (
    <div className="country-container">
      <h1 className="country-title">Nepal</h1>
      <p className="country-description">
        Welcome to the Nepal page. Here you will find information and quizzes related to Nepal's culture and history.
      </p>
      <div className="board">
        {questions.slice(0, 25).map((question, index) => (
          <div
            key={index}
            className={`tile ${selectedTiles.includes(index) ? 'selected' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {question.question_text}
          </div>
        ))}
      </div>
      {currentQuestion !== null && (
        <div className="question-modal">
          <h2>{questions[currentQuestion].question_text}</h2>
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerClick(currentQuestion, option)}
              className={wrongAnswer === option ? 'wrong-answer' : ''}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <div className="info">
        <p>Time Left: {timeLeft} seconds</p>
        <p>Score: {score}</p>
      </div>
    </div>
  );
}

export default Nepal;