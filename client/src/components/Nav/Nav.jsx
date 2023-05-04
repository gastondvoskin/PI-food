import React, { useState, useEffect } from "react";
import styles from './Nav.module.css';

import { NavLink } from "react-router-dom";


const Nav = () => {
    return (
        <nav>
            <NavLink 
                to={'/home'}
                activeClassName={styles.activeLink} 
                className={styles.link}> 
                Home
            </NavLink> 

            <NavLink 
                to={'/about'}
                activeClassName={styles.activeLink} 
                className={styles.link}> 
                About
            </NavLink> 
        </nav>
    );
};

export default Nav;

