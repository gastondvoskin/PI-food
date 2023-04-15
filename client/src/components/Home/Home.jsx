import React from "react";
import styles from './Home.module.css';
import { NavLink } from "react-router-dom";
// importo los componentes a renderizar
import SearchBar from "../SearchBar/SearchBar.jsx";
import Cards from "../Cards/Cards.jsx";
import Filters from "../Filters/Filters.jsx";
import Sorting from "../Sorting/Sorting.jsx";
import Pagination from "../Pagination/Pagination.jsx";


const Home = () => {
    return (
        <div>
            NIY: Home
            <SearchBar />
            <Cards />
            <Filters />
            <Sorting />
            <Pagination />
        </div>
    );
};

export default Home;




