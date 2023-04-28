// React, rutas y estilos
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// componentes
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form.jsx';
import Nav from './components/Nav/Nav.jsx';

const App = () => {
  const location = useLocation();
  const showNav = location.pathname !== '/'; 

  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path={"/detail/:id"} element={<Detail />} /> 
        <Route path="/form" element={<Form />} />    
      </Routes>  
    </>
  );
};

export default App;
