// react, estados, estilos, Link
import React, { useState, useEffect } from "react";
import styles from './Home.module.css';
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets } from "../../redux/actions/actionsIndex.js";

// componentes a renderizar
import SearchBar from "../SearchBar/SearchBar.jsx";
import Filters from "../Filters/Filters.jsx";
import Sorting from "../Sorting/Sorting.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import Cards from "../Cards/Cards.jsx";


const Home = () => {

    // local state
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // dipatch the getRecipes and getDiets actions.
    const dispatch = useDispatch();

    useEffect( () => {
        const fetchRecipesAndDiets = async () => {
            try {
                await dispatch(getRecipes());
                await dispatch(getDiets());
                setIsLoading(false);
            } catch (error) {
                console.log("in the catch");
                console.log(error.response?.data?.error);
            }
        };
        fetchRecipesAndDiets();
    }, [dispatch]);             // va el dispatch en el array de dependencias? Por qué? 


    // receive filteredAndSortedRecipes from redux. 
    const filteredAndSortedRecipes = useSelector((state) => state.filteredAndSortedRecipes);

    const recipesPerPage = 9;

    // currentRecipes (it rerenders with onClick in Pagination handled by handlePageChange). Uaseful for Pagination and for Cards. 
    const indexOfFirstRecipe = currentPage * recipesPerPage - recipesPerPage;  //p1->0. p2-> 9.
    const indexOfLastRecipe = currentPage * recipesPerPage - 1; //p1->8. p2->17. 
    const currentRecipes = filteredAndSortedRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe + 1); // p1-> 0 al 9 sin incluirlo. p1-> 9 al 18 sin incluirlo.

    // totalPages. Useful for Pagination. 
    const totalPages = Math.ceil(filteredAndSortedRecipes.length / recipesPerPage);

    // handlePageChange -> handles onClick in Pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // render SearchBar, Filters, Sorting, Form's Link, Pagination and Cards components
    return (
        isLoading 
        ? (<h2>Loading...</h2>) 
        : (
            <div>
                <SearchBar />
                <Filters />
                <Sorting />
                <Link to={'/form'}>
                    <button>Create new recipe</button>
                </Link>
                <Pagination 
                    totalPages={totalPages} 
                    handlePageChange={handlePageChange}
                />
                <Cards 
                    currentRecipes={currentRecipes}
                />
            </div>        
        )
    );
};


export default Home;




