import React from "react";
import styles from './Nav.module.css';
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Filters from "../Filters/Filters.jsx";
import Sorting from "../Sorting/Sorting.jsx";


const Nav = () => {
    return (
        <nav>
            <h1>NIY - Nav</h1>
            <SearchBar />
            <Filters />
            <Sorting />
            <NavLink to='/form'>Form para crear recetas</NavLink>
        </nav>
    );
};

export default Nav;