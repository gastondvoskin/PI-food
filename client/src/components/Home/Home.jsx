// react, estados, estilos
import React, { useState, useEffect } from "react";
import styles from './Home.module.css';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from "../../redux/actions/actionsIndex.js";

// componentes a renderizar
import Cards from "../Cards/Cards.jsx";
import Pagination from "../Pagination/Pagination.jsx";


const Home = () => {
    // dipatch the getRecipes action to the reducer to modify the global state
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getRecipes())
    }, []); 

    // receive filteredRecipes from the global state. 
    const filteredRecipes = useSelector((state) => state.filteredRecipes);


    // handlePageChange -> handles onClick in Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // currentRecipes (it rerenders with onClick in Pagination handled by handlePageChange). Uaseful for Pagination and for Cards. 
    const indexOfFirstRecipe = currentPage * recipesPerPage - recipesPerPage;  //p1->0. p2-> 9.
    const indexOfLastRecipe = currentPage * recipesPerPage - 1; //p1->8. p2->17. 
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe + 1); // p1-> 0 al 9 sin incluirlo. p1-> 9 al 18 sin incluirlo.

    // totalPages. Useful for Pagination. 
    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);


    // render Pagination and Cards components
    return (
        <div>
            <Pagination 
                totalPages={totalPages} 
                handlePageChange={handlePageChange}
            />
            <Cards 
                currentRecipes={currentRecipes}
            />
        </div>
    );
};


export default Home;




