import './App.css';
// inicio TONO
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
// fin TONO

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/landing" element={<Landing />} />
      </Routes>  
    </>
  );
};

export default App;
