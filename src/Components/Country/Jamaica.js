import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Country.css';

function Jamaica() {
  // Similar implementation as Nepal.js
  const [players, setPlayers] = useState([
    { id: 1, selectedTiles: [], score: 0, tileStatus: {}, completedBingos: new Set(), isComputer: false },
    { id: 2, selectedTiles: [], score: 0, tileStatus: {}, completedBingos: new Set(), isComputer: true }
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [bingoMessage, setBingoMessage] = useState("");
  const [bestScore, setBestScore] = useState(0);
  const navigate = useNavigate();

  const questions = [
    { question_text: "What is the capital city of Jamaica?", answer: "Kingston", options: ["Kingston", "Montego Bay", "Ocho Rios"] },
    { question_text: "Which iconic musician, known as the 'King of Reggae,' was born in Jamaica?", answer: "Bob Marley", options: ["Bob Marley", "Peter Tosh", "Jimmy Cliff"] },
    { question_text: "What is unique about Jamaica's national flag?", answer: "It has no color in common with any other flag", options: ["It has no color in common with any other flag", "It is triangular", "It has no red"] },
    { question_text: "Which Jamaican town is known as the birthplace of jerk seasoning?", answer: "Portland", options: ["Portland", "Montego Bay", "Negril"] },
    { question_text: "Which Jamaican sprinter is regarded as the fastest man in the world?", answer: "Usain Bolt", options: ["Usain Bolt", "Asafa Powell", "Yohan Blake"] },
    { question_text: "What is the national dish of Jamaica?", answer: "Ackee and Saltfish", options: ["Ackee and Saltfish", "Jerk Chicken", "Curry Goat"] },
    { question_text: "What is the official language of Jamaica?", answer: "English", options: ["English", "Patois", "Spanish"] },
    { question_text: "Which two colors on the Jamaican flag represent its natural wealth?", answer: "Green and Gold", options: ["Green and Gold", "Black and Gold", "Green and White"] },
    { question_text: "What is the currency of Jamaica?", answer: "Jamaican Dollar", options: ["Jamaican Dollar", "US Dollar", "Caribbean Dollar"] },
    { question_text: "What is the name of Jamaica's famous coffee-growing region?", answer: "Blue Mountains", options: ["Blue Mountains", "Cockpit Country", "Dunn's River"] },
    { question_text: "Which Jamaican festival celebrates the island's independence?", answer: "Jamaica Independence Festival", options: ["Jamaica Independence Festival", "Reggae Sumfest", "Carnival"] },
    { question_text: "What is the longest river in Jamaica?", answer: "Rio Minho", options: ["Rio Minho", "Black River", "Martha Brae River"] },
    { question_text: "How many parishes does Jamaica have?", answer: "14", options: ["14", "12", "16"] },
    { question_text: "Which religion, born in Jamaica, has global cultural influence?", answer: "Rastafarianism", options: ["Rastafarianism", "Santeria", "Voodoo"] },
    { question_text: "Which area is known for its seven-mile-long beach and crystal-clear waters?", answer: "Negril", options: ["Negril", "Ocho Rios", "Port Antonio"] },
    { question_text: "Who are the Maroons, and why are they significant to Jamaican history?", answer: "Descendants of escaped slaves", options: ["Descendants of escaped slaves", "Indigenous people of Jamaica", "Colonial settlers"] },
    { question_text: "What is Jamaica's most famous music genre?", answer: "Reggae", options: ["Reggae", "Dancehall", "Ska"] },
    { question_text: "Which Jamaican town is famous for its waterfalls and adventure tours?", answer: "Ocho Rios", options: ["Ocho Rios", "Montego Bay", "Falmouth"] },
    { question_text: "How many UNESCO World Heritage Sites are in Jamaica?", answer: "1", options: ["1", "3", "2"] },
    { question_text: "What is the famous Jamaican rum brand known globally?", answer: "Appleton Estate", options: ["Appleton Estate", "Captain Morgan", "Myers's Rum"] },
    { question_text: "What is celebrated during Jamaica's Emancipation Day?", answer: "Freedom from slavery", options: ["Freedom from slavery", "Independence from Britain", "Birth of Bob Marley"] },
    { question_text: "Which Jamaican food is a popular street snack made of fried dough?", answer: "Festival", options: ["Festival", "Bammy", "Patty"] },
    { question_text: "What is the name of the famous reef system near Montego Bay?", answer: "Montego Bay Marine Park", options: ["Montego Bay Marine Park", "Negril Reef", "Doctor's Cave Reef"] },
    { question_text: "Which traditional Jamaican soup is often made with goat meat?", answer: "Mannish Water", options: ["Mannish Water", "Pepper Pot Soup", "Red Peas Soup"] },
    { question_text: "What are the two main seasons in Jamaica?", answer: "Dry and Rainy", options: ["Dry and Rainy", "Summer and Winter", "Wet and Cool"] }
];

  useEffect(() => {
    const storedBestScore = localStorage.getItem('bestScore');
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore, 10));
    }
  }, []);

  useEffect(() => {
    if (players[currentPlayerIndex].isComputer && !gameOver) {
      const randomDelay = Math.floor(Math.random() * 3000) + 1000; // Random delay between 1 and 4 seconds
      const timer = setTimeout(() => {
        const availableTiles = questions
          .map((_, index) => index)
          .filter(index => !players[currentPlayerIndex].selectedTiles.includes(index) && players[currentPlayerIndex].tileStatus[index] !== "incorrect");
        if (availableTiles.length > 0) {
          const randomTile = availableTiles[Math.floor(Math.random() * availableTiles.length)];
          handleTileClick(randomTile);
          const randomOption = questions[randomTile].options[Math.floor(Math.random() * questions[randomTile].options.length)];
          handleAnswerClick(randomTile, randomOption);
        }
      }, randomDelay);
      return () => clearTimeout(timer);
    }
  }, [currentPlayerIndex, gameOver]);

  const handleTileClick = (index) => {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer.selectedTiles.includes(index) && currentPlayer.tileStatus[index] !== "incorrect") {
      setCurrentQuestion(index);
    }
  };

  const handleAnswerClick = (questionIndex, option) => {
    const currentPlayer = players[currentPlayerIndex];
    if (questions[questionIndex].answer === option) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].selectedTiles.push(questionIndex);
      updatedPlayers[currentPlayerIndex].tileStatus[questionIndex] = "correct";
      updatedPlayers[currentPlayerIndex].score += 10;
      setPlayers(updatedPlayers);
      setCurrentQuestion(null);
      if (checkForBingo(currentPlayerIndex)) {
        setBingoMessage("BINGO!");
        setTimeout(() => setBingoMessage(""), 3000);
      }
    } else {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].tileStatus[questionIndex] = "incorrect";
      updatedPlayers[currentPlayerIndex].score = Math.max(0, updatedPlayers[currentPlayerIndex].score - 10);
      setPlayers(updatedPlayers);
      setCurrentQuestion(null);
    }
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const checkForBingo = (playerIndex) => {
    const gridSize = 5;
    const currentPlayer = players[playerIndex];
    const isRowBingo = (row) => row.every((tile) => currentPlayer.selectedTiles.includes(tile));
    const isColBingo = (col) => col.every((tile) => currentPlayer.selectedTiles.includes(tile));
    const isDiagonal1Bingo = [0, 6, 12, 18, 24].every((tile) => currentPlayer.selectedTiles.includes(tile));
    const isDiagonal2Bingo = [4, 8, 12, 16, 20].every((tile) => currentPlayer.selectedTiles.includes(tile));

    const newBingos = new Set(currentPlayer.completedBingos);
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
    currentPlayer.completedBingos = newBingos;
    setPlayers([...players]);
    return bingoFound;
  };

  const handleRestart = () => {
    if (players[0].score > bestScore) {
      setBestScore(players[0].score);
      localStorage.setItem('bestScore', players[0].score);
    }
    setPlayers([
      { id: 1, selectedTiles: [], score: 0, tileStatus: {}, completedBingos: new Set(), isComputer: false },
      { id: 2, selectedTiles: [], score: 0, tileStatus: {}, completedBingos: new Set(), isComputer: true }
    ]);
    setCurrentPlayerIndex(0);
    setCurrentQuestion(null);
    setGameOver(false);
    setBingoMessage("");
  };

  return (
    <div className="country-container">
      <h1 className="country-title">Jamaica</h1>
      <p className="country-description">
        Welcome to the Jamaica page. Here you will find information and quizzes related to Jamaica's culture and history.
      </p>
      {bingoMessage && <p className="bingo-message">{bingoMessage}</p>}
      <div className="boards-container">
        <div className="player-board-container">
          <h2>Player 1's Board</h2>
          <div className={`board ${currentPlayerIndex === 0 ? 'active' : ''}`}>
            {questions.slice(0, Math.min(25, questions.length)).map((_, index) => (
              <div
                key={index}
                className={`tile ${players[0].tileStatus[index] || ""}`}
                onClick={() => currentPlayerIndex === 0 && handleTileClick(index)}
              >
                {players[0].selectedTiles.includes(index) ? null : index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="player-board-container">
          <h2>Player 2's Board</h2>
          <div className={`board ${currentPlayerIndex === 1 ? 'active' : ''}`}>
            {questions.slice(0, Math.min(25, questions.length)).map((_, index) => (
              <div
                key={index}
                className={`tile ${players[1].tileStatus[index] || ""}`}
                onClick={() => currentPlayerIndex === 1 && handleTileClick(index)}
              >
                {players[1].selectedTiles.includes(index) ? null : index + 1}
              </div>
            ))}
          </div>
        </div>
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
        {players.map((player) => (
          <p key={player.id}>Player {player.id} Score: {player.score}</p>
        ))}
        <p>Best Score: {bestScore}</p>
      </div>
      {gameOver && (
        <div className="game-over">
          <p>Game Over! Player {players[0].score > players[1].score ? 1 : 2} wins!</p>
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

export default Jamaica;