// A futuro chequear si es mejor el nombre Cards o es preferible Recipes. 

import React from "react";
import styles from './Cards.module.css';
import { Link } from "react-router-dom";


const Cards = () => {
    return (
        <div>
            <div className="consinga"> 
            NYI Cards: Sector en el que se vea un listado de cards con las recetas. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /recipes y deberá mostrar su:
            Imagen.
            Nombre.
            Tipos de dietas.

            Cuando se le hace click a una Card deberá redirigir al detalle de esa receta específica.

            </div>NIY: 
            <Link to='/detail/id'>Ir al detail. A futuro tiene que ser dinámico y envolver un div con la imagen, etc. Para eso, cambiar también la ruta en App.jsx</Link>
        </div>
    );
};

export default Cards;


// Cards: Sector en el que se vea un listado de cards con las recetas. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /recipes y deberá mostrar su:
// Imagen.
// Nombre.
// Tipos de dietas.
// Cuando se le hace click a una Card deberá redirigir al detalle de esa receta específica.