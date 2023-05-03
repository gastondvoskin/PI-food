import React, { useState } from "react";
import styles from './Form.module.css';
import { createRecipe } from "../../redux/actions/actionsIndex";
import { useDispatch } from "react-redux";

const Form = () => {
    const dispatch = useDispatch();

    const initialState = {
        name: '',
        summary: '',
        healthscore: '',
        image: '',
        steps: ["step example"],                  // hardcodeado. Modificar. Cambiar back para que no sea más un array, sino string.  
        diets: ['vegetarian'],          // hardcodeado. Modificar. 
    }

    const [dataToCreateRecipe, setDataToCreateRecipe] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataToCreateRecipe({
            ...dataToCreateRecipe,
            [name]: value
        });
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        // logica: dispatch createRecipe pasándole un objeto con toda la info
        console.log('dataToCreateRecipe: ', dataToCreateRecipe); 
        dispatch(createRecipe(dataToCreateRecipe));
        setDataToCreateRecipe(initialState);
    };


    return (
        <form onSubmit={handleOnSubmit}>
            <p>Create your own recipe</p>

            <label htmlFor="name">Name</label>
            <input
                name="name"
                type="text"
                value={dataToCreateRecipe.name}
                onChange={handleChange}
                placeholder="eg. Fried sausages">
            </input>
            <br />

            <label htmlFor="summary">Summary</label>
            <textarea
                name="summary"
                value={dataToCreateRecipe.summary}
                onChange={handleChange}
                placeholder="eg. This is a recipe from Argentina..."
                rows="5"
                cols="50">
            </textarea>
            <br />

            <label htmlFor="healthscore">Healthscore</label>
            <input
                name="healthscore"
                type="number"
                value={dataToCreateRecipe.healthscore}
                onChange={handleChange}
                placeholder="0 to 100">
            </input>
            <br />

            {/* <label htmlFor="steps">Steps</label>
            <textarea
                name="steps"
                value={dataToCreateRecipe.steps}
                onChange={handleChange}
                placeholder="eg. Firts prepare the sausages..."
                rows="5"
                cols="50">
            </textarea>
            <br /> */}

            <label htmlFor="image">Image</label>
            <input
                name="image"
                value={dataToCreateRecipe.image}
                onChange={handleChange}
                placeholder="eg. https://thumbs.dreamstime.com/b/boiled-sausages-basil-isolated-white-background-boiled-sausages-basil-isolated-white-background-147745454.jpg">
            </input>
            <br />

            <label htmlFor="vegetarian">Vegetarian</label>
            <input
                name="vegetarian"
                type="checkbox"
                /* value="vegetarian" checked={selectedOptions.includes("vegetarian")} onChange={handleOptionChange} */
            >
            </input>

            <br />


            <button type="submit">Create recipe</button>

        </form>
    );
};

export default Form;


/* 📍 FORM PAGE |: en esta vista se encontrará el formulario para crear una nueva receta.

Este formulario debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

Nombre.
Resumen del plato.
Nivel de comida saludable (health score).
Paso a paso.
Imagen.
Posibilidad de seleccionar/agregar varios tipos de dieta en simultáneo.
Botón para crear la receta.
[IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre de la receta no pueda contener números, o que el health score no pueda exceder determinado valor, etc. */