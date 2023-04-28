import React from "react";
import styles from './Nav.module.css';
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Filters from "../Filters/Filters.jsx";
import Sorting from "../Sorting/Sorting.jsx";


const Nav = () => {
    return (
        <nav>
            <NavLink 
                to={'/home'}
                activeClassName={styles.activeLink} 
                className={styles.link}> 
                Home
            </NavLink> 
            <SearchBar />
            <Filters />
            <Sorting />
            <NavLink 
                to={'/form'}
                activeClassName={styles.activeLink} 
                className={styles.link}> 
                Create a recipe
            </NavLink> 

        </nav>
    );
};

export default Nav;

