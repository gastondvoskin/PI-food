import React, { useState, useEffect } from "react";
import styles from './Home.module.css';

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from "../../redux/actions/actionsIndex.js";

// componentes a renderizar
import Cards from "../Cards/Cards.jsx";
import Pagination from "../Pagination/Pagination.jsx";





const Home = () => {

    const dispatch = useDispatch();

    useEffect( () => { 
        dispatch(getRecipes())
    }, []); 

    const allRecipes = useSelector((state) => state.recipes);

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setrecipesPerPage] = useState(9);            // por qué como state y no como simple constante? 
    
    const indexOfFirstRecipe = currentPage * recipesPerPage - recipesPerPage;        // inicia en 0. para currentPage = 2, será 2*9-9 = 9
    const indexOfLastRecipe = currentPage * recipesPerPage - 1;      // inicia en 8. siguiente es 2*9-1 = 17         
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe + 1);     // 0 al 9 sin incluirlo. después 9 al 18 sin incluirlo
    
    // pag 1: 0     1   2   3   4   5   6   7   8
    // pag 2: 9     10  11  12  13  14  15  16  17
    // pag 3: 18    19  ... 


    const totalPages = Math.ceil(allRecipes.length / recipesPerPage);
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div>
            <Cards 
                currentRecipes={currentRecipes}
            />
            <Pagination 
                totalPages={totalPages} 
                handlePageChange={handlePageChange}
            />

        </div>
    );
};





export default Home;




