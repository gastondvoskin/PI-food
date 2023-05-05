// React, rutas y estilos
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// componentes
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form.jsx';
import Nav from './components/Nav/Nav.jsx';
import Error404 from './components/Error404/Error404';

const App = () => {
  const location = useLocation();
  const showNav = location.pathname !== '/'; 

  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path={"/detail/:id"} element={<Detail />} /> 
        <Route path="/form" element={<Form />} /> 
        <Route path="*" element={<Error404 />} />
      </Routes>  
    </>
  );
};

export default App;
