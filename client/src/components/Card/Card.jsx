import React from "react";
import styles from './Card.module.css';
import { NavLink } from "react-router-dom";

const Card = ({ name, image, diets, id }) => {
    return (
        <div>
            <h2>{name}</h2>
            <img src={image} alt="recipe image" width="200px" heigth="200px"/>
            <h4>{diets}</h4>
            <NavLink 
                to={`/detail/${id}`}
                activeClassName={styles.activeLink} 
                className={styles.link}> 
                View details
            </NavLink> 

        </div>
    );
};

export default Card;

            {/* <Link to={`/detail/${id}`}>View details</Link> */}
