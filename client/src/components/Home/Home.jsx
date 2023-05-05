// react, estados, estilos, Link
import React, { useState, useEffect } from "react";
import styles from './Home.module.css';
import { NavLink } from "react-router-dom";
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
    // nuevo. viene del Nav para pasar por props a Filters. Modificar para hacerlo a través de redux. 
    // const [dietsList, setDietsList] = useState([]);
    // useEffect(() => {
        // ------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>> HARDCODEADO PARA NO HACER PETICIONES. MODIFICAR. 
        // const getDietsList = async () => {
        //     const dietsListRaw = await axios.get('http://localhost:3001/diets');
        //     const dietsListClean = dietsListRaw.data;
        //     setDietsList(dietsListClean);
        // }
        // getDietsList();
    //     setDietsList(['vegetarian', 'vegan', 'ketogenic']);
    // }, []);


    // dipatch the getRecipes and getDiets actions.
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(getRecipes());
        dispatch(getDiets());       // new
    }, []); 

    // receive diets from redux
    // const diets = useSelector((state) => state.diets);          // new
    // receive filteredAndSortedRecipes from redux. 
    const filteredAndSortedRecipes = useSelector((state) => state.filteredAndSortedRecipes);


    // handlePageChange -> handles onClick in Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // currentRecipes (it rerenders with onClick in Pagination handled by handlePageChange). Uaseful for Pagination and for Cards. 
    const indexOfFirstRecipe = currentPage * recipesPerPage - recipesPerPage;  //p1->0. p2-> 9.
    const indexOfLastRecipe = currentPage * recipesPerPage - 1; //p1->8. p2->17. 
    const currentRecipes = filteredAndSortedRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe + 1); // p1-> 0 al 9 sin incluirlo. p1-> 9 al 18 sin incluirlo.

    // totalPages. Useful for Pagination. 
    const totalPages = Math.ceil(filteredAndSortedRecipes.length / recipesPerPage);


    // render SearchBar, Filters, Sorting, Form's Link, Pagination and Cards components
    return (
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
    );
};


export default Home;




