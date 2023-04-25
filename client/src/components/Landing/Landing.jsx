import React from "react";
import styles from './Landing.module.css';
import bgImage from '../../assets/2.png';
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div >
            <img className={styles.background} src={bgImage} alt="background image with food" />
            <h1>Landing</h1>
            <h1>Welcome to our food website! </h1>
            {/* <p>Our mission is to provide you with delicious recipes to make your kitchen experience enjoyable and hassle-free. Whether you're an experienced chef or just starting, we have something for everyone!</p>         */}
            <Link to="/home">HOME</Link> 
        </div>
    );
};

export default Landing;