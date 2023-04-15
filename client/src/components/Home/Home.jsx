import React from "react";
import styles from './Home.module.css';
import { NavLink } from "react-router-dom";
// importo los componentes a renderizar
import Cards from "../Cards/Cards.jsx";
import Pagination from "../Pagination/Pagination.jsx";


const Home = () => {
    return (
        <div>
            <hr />
            <h1>NIY - Home</h1>
            <Cards />
            <Pagination />
        </div>
    );
};

export default Home;




