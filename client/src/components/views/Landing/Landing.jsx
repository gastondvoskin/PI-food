// React, estilos, imagen
import React from "react";
import styles from './Landing.module.css';
import bgImage from '../../../assets/2.png';
// Link
import { Link } from "react-router-dom";


const Landing = () => {
    return (
        <div >

            <h1>Welcome to our food website! </h1>

            <p>Our mission is to provide you with delicious recipes to make your kitchen experience enjoyable and hassle-free. Whether you're an experienced chef or just starting, we have something for everyone!</p> 
            <br />
            
            <Link to={'/home'}>
                <button>Let's get started!</button>
            </Link>

            <img className={styles.background} src={bgImage} alt="background image with food" />

        </div>
    );
};


export default Landing;



