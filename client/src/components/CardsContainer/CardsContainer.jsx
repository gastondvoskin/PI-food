// A futuro chequear si es mejor el nombre Cards o es preferible Recipes. 

import React, { useState } from "react";
import styles from "./CardsContainer.module.css";
import { useSelector } from "react-redux";
// componentes a renderizar
import Card from "../Card/Card.jsx";

const Cards = ({ currentRecipes }) => {
    
        
    return (
        <div className={styles.mainContainer}>
            {
                currentRecipes.map((recipe, index) => {
                    return (
                        <Card 
                            name={recipe.name} 
                            image={recipe.image} 
                            diets={recipe.diets} 
                            id={recipe.id}
                            healthscore={recipe.healthscore}       /* healthscore to check sort */
                            key={index}
                        />                 
                    )
                })
            }
        </div>
    );
};

export default Cards;