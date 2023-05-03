import React, { useState, useEffect } from "react";
import styles from './Nav.module.css';
// import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Filters from "../Filters/Filters.jsx";
import Sorting from "../Sorting/Sorting.jsx";
import axios from "axios";


const Nav = () => {
    const [dietsList, setDietsList] = useState([]);
    
    useEffect(() => {
        // ------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>> HARDCODEADO PARA NO HACER PETICIONES. MODIFICAR. 
        // const getDietsList = async () => {
        //     const dietsListRaw = await axios.get('http://localhost:3001/diets');
        //     const dietsListClean = dietsListRaw.data;
        //     setDietsList(dietsListClean);
        // }
        // getDietsList();
        setDietsList(['vegetarian', 'vegan', 'ketogenic']);
    }, []);


    return (
        <nav>
            <NavLink 
                to={'/home'}
                activeClassName={styles.activeLink} 
                className={styles.link}> 
                Home
            </NavLink> 
            <SearchBar />
            <Filters dietsList={dietsList} />
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

