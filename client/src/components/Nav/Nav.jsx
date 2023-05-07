import React, { useState, useEffect } from "react";
import styles from './Nav.module.css';

import { Link } from "react-router-dom";


const Nav = () => {
    return (
        <nav className={styles.mainContainer}>
            <Link 
                to={'/home'}>
                Home
            </Link> 

            <Link 
                to={'/about'}>
                About
            </Link> 
        </nav>
    );
};

export default Nav;

