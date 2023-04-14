import React from "react";
import styles from './Landing.module.css';
import bgImage from '../../assets/2.png';
import { NavLink } from "react-router-dom";

const Landing = () => {
    return (
        <div >
            <img className={styles.background} src={bgImage} alt="background image with food" />
            <h1>Welcome to our food website! </h1>
            <p>Our mission is to provide you with delicious recipes to make your kitchen experience enjoyable and hassle-free. Whether you're an experienced chef or just starting, we have something for everyone!</p>
            <NavLink to="/home">HOME</NavLink> 
            {/* este NavLink fue lo último que agregué */}
        </div>
    );
};

export default Landing;


// 📍 LANDING PAGE | deberás crear una página de inicio o bienvenida con:

// Alguna imagen de fondo representativa al proyecto.
// Botón para ingresar a la home page.