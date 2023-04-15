import React from "react";
import styles from './Sorting.module.css';

const Sorting = () => {
    return (
        <div>
            <span>Sorting</span>
            <button>Asc</button>
            <button>Desc</button>
        </div>
    );
};

export default Sorting;


// Sorting: Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por "comida saludable" (health score).