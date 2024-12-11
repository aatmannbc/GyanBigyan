import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Country.css';

function Ghana() {
  const [players, setPlayers] = useState([
    { id: 1, selectedTiles: [], score: 0, tileStatus: {}, completedBingos: new Set(), isComputer: false },
    { id: 2, selectedTiles: [], score: 0, tileStatus: {}, completedBingos: new Set(), isComputer: true }
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [bingoMessage, setBingoMessage] = useState("");
  const [bestScore, setBestScore] = useState(0);
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const navigate = useNavigate();

  const questions = [
    { question_text: "What is the capital city of Ghana?", answer: "Accra", options: ["Accra", "Kumasi", "Tamale"] },
    { question_text: "Which river is the largest in Ghana?", answer: "Volta River", options: ["Volta River", "Pra River", "Densu River"] },
    { question_text: "What is the name of Ghana’s currency?", answer: "Ghanaian Cedi", options: ["Ghanaian Cedi", "Naira", "Dalasi"] },
    { question_text: "What is Ghana known as the first African nation to do?", answer: "Gain independence from colonial rule", options: ["Gain independence from colonial rule", "Host the Olympics", "Establish a national park"] },
    { question_text: "What is the most widely spoken language in Ghana?", answer: "Twi", options: ["Twi", "Ga", "Ewe"] },
    { question_text: "What is Ghana's most famous traditional fabric?", answer: "Kente", options: ["Kente", "Adinkra", "Batakari"] },
    { question_text: "Which region in Ghana is known for its ancient slave trade castles?", answer: "Central Region", options: ["Central Region", "Ashanti Region", "Northern Region"] },
    { question_text: "Which natural resource is Ghana a leading exporter of?", answer: "Gold", options: ["Gold", "Diamonds", "Copper"] },
    { question_text: "What is Ghana’s national dish?", answer: "Jollof Rice", options: ["Jollof Rice", "Fufu", "Banku"] },
    { question_text: "Which festival in Ghana celebrates the harvest of yams?", answer: "Homowo", options: ["Homowo", "Hogbetsotso", "Adae Kese"] },
    { question_text: "What body of water is formed by Ghana's Akosombo Dam?", answer: "Lake Volta", options: ["Lake Volta", "Lake Bosomtwe", "Lake Chad"] },
    { question_text: "What is the name of Ghana’s independence square?", answer: "Black Star Square", options: ["Black Star Square", "Golden Jubilee Square", "Kwame Nkrumah Square"] },
    { question_text: "Who was the first president of Ghana?", answer: "Kwame Nkrumah", options: ["Kwame Nkrumah", "Jerry Rawlings", "John Kufuor"] },
    { question_text: "Which animal appears on Ghana’s coat of arms?", answer: "Eagle", options: ["Eagle", "Lion", "Elephant"] },
    { question_text: "What is the main religion practiced in Ghana?", answer: "Christianity", options: ["Christianity", "Islam", "Traditional African Religions"] },
    { question_text: "What sport is most popular in Ghana?", answer: "Football (Soccer)", options: ["Football (Soccer)", "Basketball", "Cricket"] },
    { question_text: "What is the significance of Ghana's Black Star?", answer: "Symbol of African freedom", options: ["Symbol of African freedom", "Unity of Ghanaian tribes", "Victory in sports"] },
    { question_text: "Which UNESCO World Heritage Site in Ghana was a center of the trans-Atlantic slave trade?", answer: "Cape Coast Castle", options: ["Cape Coast Castle", "Elmina Castle", "Fort James"] },
    { question_text: "What is the name of Ghana's only natural lake?", answer: "Lake Bosomtwe", options: ["Lake Bosomtwe", "Lake Volta", "Lake Chad"] },
    { question_text: "Which region in Ghana is known for its rich Ashanti culture and golden stool?", answer: "Ashanti Region", options: ["Ashanti Region", "Northern Region", "Volta Region"] },
    { question_text: "What is the primary export crop of Ghana?", answer: "Cocoa", options: ["Cocoa", "Coffee", "Cashew"] },
    { question_text: "Which annual festival in Ghana commemorates the migration of the Ewe people?", answer: "Hogbetsotso Festival", options: ["Hogbetsotso Festival", "Adae Festival", "Homowo Festival"] },
    { question_text: "What is the name of the iconic Ghanaian dish made from cassava and plantains?", answer: "Fufu", options: ["Fufu", "Kenkey", "Banku"] },
    { question_text: "How many regions are there in Ghana?", answer: "16", options: ["16", "10", "12"] },
    { question_text: "What is the name of Ghana's vibrant national football team?", answer: "The Black Stars", options: ["The Black Stars", "The Golden Eagles", "The Lions"] },
    { question_text: "Which Ghanaian city is known as the 'Garden City'?", answer: "Kumasi", options: ["Kumasi", "Tamale", "Accra"] },
    { question_text: "Which Ghanaian festival honors ancestors and the Ashanti chiefs?", answer: "Adae Kese", options: ["Adae Kese", "Homowo", "Aboakyir"] },
    { question_text: "What is Ghana's Independence Day?", answer: "March 6th", options: ["March 6th", "July 4th", "August 1st"] }
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
      updatedPlayers[currentPlayerIndex].score = Math.max(0, updatedPlayers[currentPlayerIndex].score - 5);
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

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    setIsUsernameSet(true);
  };

  return (
    <div className="country-container">
      <h1 className="country-title">Ghana</h1>
      <p className="country-description">
        Welcome to the Ghana page. Here you will find information and quizzes related to Ghana's culture and history.
      </p>
      {!isUsernameSet ? (
        <form onSubmit={handleUsernameSubmit} className="username-form">
          <label>
            Player's name:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <button type="submit">Start Game</button>
        </form>
      ) : (
        <>
          {bingoMessage && <p className="bingo-message">{bingoMessage}</p>}
          <div className="boards-container">
            <div className="player-board-container">
              <h2>{username}'s Board</h2>
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
            {players.map((player, index) => (
              <p key={player.id}>
                {index === 0 ? username : `Player ${player.id}`} Score: {player.score}
              </p>
            ))}
            <p>Best Score: {bestScore}</p>
          </div>
          {gameOver && (
            <div className="game-over">
              <p>Game Over! {players[0].score > players[1].score ? username : 'Player 2'} wins!</p>
              <button onClick={handleRestart}>Play Again</button>
            </div>
          )}
          {!gameOver && (
            <button onClick={handleRestart} className="restart-button">
              Restart
            </button>
          )}
          <button onClick={() => navigate('/')} className="back-button">
            Home
          </button>
        </>
      )}
    </div>
  );
}

export default Ghana;