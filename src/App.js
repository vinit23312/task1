import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [currentTimer, setCurrentTimer] = useState('work');
  const [timerInterval, setTimerInterval] = useState(null);

  const startTimer = () => {
    setTimerInterval(setInterval(updateTimer, 1000));
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);

    if (currentTimer === 'work') {
      setWorkDuration(25 * 60);
    } else {
      setBreakDuration(5 * 60);
    }
  };

  const updateTimer = () => {
    if (currentTimer === 'work') {
      setWorkDuration((prevDuration) => prevDuration - 1);

      if (workDuration < 0) {
        setCurrentTimer('break');
        setBreakDuration(5 * 60);
      }
    } else {
      setBreakDuration((prevDuration) => prevDuration - 1);

      if (breakDuration < 0) {
        setCurrentTimer('work');
        setWorkDuration(25 * 60);
      }
    }
  };

  useEffect(() => {
    if (currentTimer === 'work') {
      setWorkDuration(25 * 60);
    } else {
      setBreakDuration(5 * 60);
    }
  }, [currentTimer]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div id="timer" className="text-4xl font-bold mb-4">
          {currentTimer === 'work'
            ? formatTime(workDuration)
            : formatTime(breakDuration)}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
          onClick={pauseTimer}
        >
          Pause
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${displayMinutes}:${displaySeconds}`;
};

export default App;
