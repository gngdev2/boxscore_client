import React, { useEffect, useContext } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import GameStats from './pages/gameStats';

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <GameStats />
          }
        />
      </Routes>
    </>
  );
}

export default App;
