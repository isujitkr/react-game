// src/components/Game.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../api/api'; 
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/authenticationSlice';
import Cookies from 'js-cookie'; 

const Game = () => {
  const { user } = useSelector((state) => state.authentication);
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user ) {
      navigate('/login'); // Redirect to login if user is not authenticated
      return;
    }

    if (user) {
      fetchHighScore(user.user._id);
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await API.post('/user/logout');
    Cookies.remove('access_token', { path: '/' }); 
   
    localStorage.removeItem('access_token'); 
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    dispatch(logout()); 
    navigate('/login'); 
  };

  const handlePlayAgain = () => {
    setGameOver(false);
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setFeedback('');
    setScore(0);
    setAttempts(0);
  };

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    if (gameOver) return;
    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setFeedback('Please enter a number between 1 and 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (numGuess === targetNumber) {
      const newScore = score + (100 - attempts);
      setFeedback(`Congratulations! You guessed the number in ${attempts + 1} attempts.`);
      setScore(newScore);
      checkHighScore(newScore);
      sendScore(newScore); 
      setGameOver(true); 
      setTargetNumber(generateRandomNumber());
      setAttempts(0);
    } else if (numGuess < targetNumber) {
      setFeedback('Too low! Try again.');
    } else {
      setFeedback('Too high! Try again.');
    }
  };

  const sendScore = (newScore) => {
    if (!user) {
      setError('User not authenticated.');
      return;
    }
    setLoading(true);
    API.post('/game/submit', { userId: user.user._id, score: newScore })
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Error submitting score: ' + error.message);
      });
  };

  const fetchHighScore = (userId) => {
    setLoading(true);
    API.get(`/game/highscore/${userId}`)
      .then((response) => {
        setHighScore(response.data.highScore || 0);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Error fetching high score: ' + error.message);
      });
  };

  const checkHighScore = (newScore) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      setShowConfetti(true); 
      setTimeout(() => setShowConfetti(false), 5000); 
    }
  };

  if (!user) {
    return <p>Please log in to play the game.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Number Guessing Game</h2>
      {user && <p className="text-lg text-center">Welcome, {user.user.name}!</p>}
      <p className="text-lg mb-4 text-center">Guess a number between 1 and 100.</p>

      <div className="flex flex-col items-center">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter your guess"
        />
        <button onClick={handleGuess} className="p-2 bg-blue-500 text-white rounded">
          Guess
        </button>
        <p className="mt-4 text-center">{feedback}</p>

        <div className="mt-4">
          <p className="text-lg">Score: {score}</p>
          <p className="text-lg">Attempts: {attempts}</p>
          <p className="text-lg">High Score: {highScore}</p>
        </div>

        <button
          onClick={handlePlayAgain}
          className="p-2 mt-6 bg-green-500 text-white rounded"
        >
          Play Again
        </button>

        <button
          onClick={handleLogout}
          className="p-2 mt-6 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>

      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Game;
