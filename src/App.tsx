import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import AboutPage from './pages/AboutPage';
import GlobalStatsPage from './pages/GlobalStatsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/stats" element={<GlobalStatsPage />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
