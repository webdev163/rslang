import React, { FC } from 'react';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import GuidePage from './pages/GuidePage';
import HardWordsPage from './components/Guide/HardWordsPage';
import GamesPage from './pages/GamesPage';
import StatsPage from './pages/StatsPage';
import GameAudio from './components/GameAudio';
import GameSprint from './components/GameSprint';
import NavMenu from './components/NavMenu';
import { Routes, Route } from 'react-router-dom';

import './style/style.scss';

const App: FC = () => {
  return (
    <div className="app">
      <NavMenu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="guide/" element={<GuidePage />} />
        <Route path="guide/group:group/page:page" element={<GuidePage />} />
        <Route path="guide/hard" element={<HardWordsPage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="games/audio" element={<GameAudio />} />
        <Route path="games/sprint" element={<GameSprint />} />
        <Route path="stats" element={<StatsPage />} />
      </Routes>
    </div>
  );
};

export default App;
