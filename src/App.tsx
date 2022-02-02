import React, { FC } from 'react';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import GuidePage from './pages/GuidePage';
import GamesPage from './pages/GamesPage';
import StatsPage from './pages/StatsPage';
import GameAudio from './components/GameAudio';
import GameSprint from './components/GameSprint';
import { Routes, Route } from 'react-router-dom';

import './style.scss';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="guide" element={<GuidePage />} />
      <Route path="games" element={<GamesPage />} />
      <Route path="games/audio" element={<GameAudio />} />
      <Route path="games/sprint" element={<GameSprint />} />
      <Route path="stats" element={<StatsPage />} />
    </Routes>
  );
};

export default App;
