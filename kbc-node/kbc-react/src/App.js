import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameStart from './components/GameStart';
import GameScreen from './components/GameScreen';
import QuitScreen from './components/QuitScreen';


const App = () => {
  const [gameState, setGameState] = useState('start'); // 'start' or 'playing'
  const [displayName, setDisplayName] = useState('');

  const handleStartGame = (name) => {
    // Perform any necessary actions before starting the game, if needed
    console.log('Starting the game for', name);

    // Update game state to switch to the playing screen
    setGameState('playing');
    setDisplayName(name);
  };
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<GameStart onStartGame={handleStartGame} />}></Route>
        <Route path="/playing" element={<GameScreen displayName={displayName} />} />
        <Route path="/quit" element={<QuitScreen />} />
        <Route path="/winner" element={<QuitScreen />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
