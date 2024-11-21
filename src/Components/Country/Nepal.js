import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Country.css';

function Nepal() {
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90); 
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [tileStatus, setTileStatus] = useState({}); // Stores the status (correct/incorrect) of each tile
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [completedBingos, setCompletedBingos] = useState(new Set());
  const navigate = useNavigate();
  const [bingoMessage, setBingoMessage] = useState("");


  
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
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score]);

  const handleTileClick = (index) => {
    if (!selectedTiles.includes(index) && tileStatus[index] !=="incorrect") {
      setCurrentQuestion(index);
      setAttempts(0);
    }
  };

  const handleAnswerClick = (questionIndex, option) => {
    if (questions[questionIndex].answer === option) {
      setSelectedTiles([...selectedTiles, questionIndex]);
      setTileStatus((prev) => ({ ...prev, [questionIndex]: "correct" }));
      setScore((prevScore) => prevScore + 10);
      setCurrentQuestion(null);
      if (checkForBingo()){
        console.log("Bingo detected!");
        setBingoMessage("BINGO!");
        setTimeout(() => setBingoMessage(""), 3000);
      }
    } else {
      setTileStatus((prev) => ({ ...prev, [questionIndex]: "incorrect" }));
      setScore((prevScore) => Math.max(0, prevScore - 10));
      setCurrentQuestion(null);
    }
  };

  const checkForBingo = () => {
    const gridSize = 5;
    const isRowBingo = (row) => row.every((tile) => selectedTiles.includes(tile));
    const isColBingo = (col) => col.every((tile) => selectedTiles.includes(tile));
    const isDiagonal1Bingo = [0, 6, 12, 18, 24].every((tile) => selectedTiles.includes(tile));
    const isDiagonal2Bingo = [4, 8, 12, 16, 20].every((tile) => selectedTiles.includes(tile));

    const newBingos = new Set(completedBingos);
    let bingoFound = false;

    for (let i = 0; i < gridSize; i++) {
      const row = Array.from({ length: gridSize }, (_, j) => i * gridSize + j);
      const col = Array.from({ length: gridSize }, (_, j) => j * gridSize + i);

      if (isRowBingo(row) && !newBingos.has(`row-${i}`)) {
        newBingos.add(`row-${i}`);
        bingoFound = true;
      }
      if (isColBingo(col) && !newBingos.has(`col-${i}`)) {
        newBingos.add(`col-${i}`);
        bingoFound = true;
      }
    }

    if (isDiagonal1Bingo && !newBingos.has("diag-1")) {
      newBingos.add("diag-1");
      bingoFound = true;
    }
    if (isDiagonal2Bingo && !newBingos.has("diag-2")) {
      newBingos.add("diag-2");
      bingoFound = true;
    }
    setCompletedBingos(newBingos);
    if (bingoFound) {
      setBingoMessage("BINGO!");
      setTimeout(() => setBingoMessage(""), 3000);
    }
    return bingoFound;
  };

  const handleRestart = () => {
    setSelectedTiles([]);
    setTileStatus({});
    setScore(0);
    setTimeLeft(120);
    setCurrentQuestion(null);
    setGameOver(false);
    setBingoMessage("Bingo");
    setCompletedBingos(new Set());

  };

  return (
    <div className="country-container">
      <h1 className="country-title">Nepal</h1>
      <p className="country-description">
        Welcome to the Nepal page. Here you will find information and quizzes related to Nepal's culture and history.
      </p>
      {bingoMessage && <p className="bingo-message">{bingoMessage}</p>} 
    <div className="board"></div>
      <div className="board">
      {questions.slice(0, Math.min(25, questions.length)).map((_, index) => (
          <div
          key={index}
          className={`tile ${tileStatus[index] || ""}`}
          onClick={() => handleTileClick(index)}
        >
          {selectedTiles.includes(index) ? null : index + 1}
  </div>
))}
      </div>
      {currentQuestion !== null && (
        <div className="question-modal">
          <h2>{questions[currentQuestion].question_text}</h2>
          {questions[currentQuestion].options.map((option, idx) => (
            <button key={idx} onClick={() => handleAnswerClick(currentQuestion, option)}>
              {option}
            </button>
          ))}
        </div>
      )}
      <div className="info">
        <p>Time Left: {timeLeft} seconds</p>
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>
      {gameOver && (
        <div className="game-over">
          <p>Game Over! Your score: {score}</p>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      )}
      {!gameOver && (
        <button onClick={handleRestart} className="restart-button">
          Restart
        </button>
      )}
      <button onClick={() => navigate('/play')} className="back-button">
        Back to Board
      </button>
    </div>
  );
}

export default Nepal;
