// React, estilos, imagen
import React from "react";
import styles from './Landing.module.css';
import bgImage from '../../assets/2.png';
// NavLink
import { NavLink } from "react-router-dom";


const Landing = () => {
    return (
        <div >
            <h1>Welcome to our food website! </h1>
            <p>Our mission is to provide you with delicious recipes to make your kitchen experience enjoyable and hassle-free. Whether you're an experienced chef or just starting, we have something for everyone!</p> 
            <NavLink 
                to="/home"
                activeClassName={styles.activeLink} 
                className={styles.link}> 
                LET'S GET STARTED!
            </NavLink> 
            <img className={styles.background} src={bgImage} alt="background image with food" />
        </div>
    );
};


export default Landing;



