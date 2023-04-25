import React from "react";
import styles from './Card.module.css';
import { Link } from "react-router-dom";

const Card = ({ name, image, diets, id }) => {
    return (
        <div>
            <h2>{name}</h2>
            <img src={image} alt="recipe image" width="200px" heigth="200px"/>
            <h4>{diets}</h4>
            <Link to={`/detail/${id}`}>View details</Link>
        </div>
    );
};

export default Card;
