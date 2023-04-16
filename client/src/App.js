import './App.css';

import React from 'react';    // el archivo debería ser .jsx?
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form.jsx';
import Nav from './components/Nav/Nav.jsx';
import axios from 'axios';

const App = () => {
  const [recipes, setRecipes] = useState([]); 

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipes?name=Cannellini Bean and Asparagus Salad with Mushrooms');  // hardcodeado. a futuro, corregir
      setRecipes(response.data);  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect( async () => {
    await fetchRecipes();
  }, []);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/id" element={<Detail />} /> 
        <Route path="/form" element={<Form />} />    
      </Routes>  
    </>
  );
};

export default App;



    // console.log('hola')
    // console.log('recipes: ', recipes);
    // axios.get('http://localhost:3001/recipes')
    //   .then((response) => setRecipes(response.data))
    //   .catch((error) => console.error(error));
