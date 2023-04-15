import React from "react";
import styles from './Nav.module.css';
import { NavLink } from "react-router-dom";


const Nav = () => {
    return (
        <nav>
            NIY: Nav. 
            <NavLink to='/form'>FORM</NavLink>
        </nav>
    );
};

export default Nav;


// Tono. Nav: componente Nav que se renderice en Home por fuera de las rutas. Este componente Nav debe tener un link al Form. A futuro, incluir dentro del Nav los componentes SearchBar, Filters y Sorting. 