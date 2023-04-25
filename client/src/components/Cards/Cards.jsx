// A futuro chequear si es mejor el nombre Cards o es preferible Recipes. 

import React from "react";
import styles from './Cards.module.css';
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import { useSelector } from "react-redux";


const Cards = () => {
    const allRecipes = useSelector((state) => state.recipes);

    return (
        <div>
            {
                allRecipes.map((recipe, index) => {
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


// Cards: Sector en el que se vea un listado de cards con las recetas. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /recipes y deberá mostrar su:
// Imagen.
// Nombre.
// Tipos de dietas.
// Cuando se le hace click a una Card deberá redirigir al detalle de esa receta específica.