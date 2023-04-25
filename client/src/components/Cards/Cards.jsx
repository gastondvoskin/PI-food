// A futuro chequear si es mejor el nombre Cards o es preferible Recipes. 

import React, { useState } from "react";
import styles from './Cards.module.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// componentes a renderizar
import Card from "../Card/Card.jsx";

const Cards = ({ currentRecipes }) => {
    
        
    return (
        <div>
            {
                currentRecipes.map((recipe, index) => {
                    return (
                        <Card 
                            name={recipe.name} 
                            image={recipe.image} 
                            diets={recipe.diets} 
                            id={recipe.id}
                        />                 
                    )
                })
            }
        </div>
    );
};

export default Cards;