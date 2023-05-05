import React, { useState } from "react";
import styles from './Form.module.css';
import { createRecipe } from "../../redux/actions/actionsIndex";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Form = () => {
    const dispatch = useDispatch();

    const diets = useSelector((state) => state.diets); 

    const initialState = {
        name: '',
        summary: '',
        healthscore: '',
        image: '',
        steps: ["step example"],        // hardcodeado. Modificar. Cambiar back para que no sea más un array, sino string.  
        diets: [], 
    };

    const [dataToCreateRecipe, setDataToCreateRecipe] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataToCreateRecipe({
            ...dataToCreateRecipe,
            [name]: value
        });
    };

    const handleDietsChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setDataToCreateRecipe({
                ...dataToCreateRecipe,
                diets: [...dataToCreateRecipe.diets, name]
            });
        } else {
            setDataToCreateRecipe({
                ...dataToCreateRecipe,
                diets: [...dataToCreateRecipe.diets.filter((diet) => diet !== name)]
            });
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // logica: dispatch createRecipe pasándole un objeto con toda la info
        // console.log('dataToCreateRecipe: ', dataToCreateRecipe); 
        dispatch(createRecipe(dataToCreateRecipe));
        ///// agregar validación (mostrar objeto que me devuelve el back) o rechazo
        setDataToCreateRecipe(initialState);
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
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

                {
                    diets.map((diet, index) => {
                        return (
                            <div key={index}>
                                <label htmlFor={diet}>{diet}</label>
                                <input
                                    name={diet}
                                    type="checkbox"
                                    onChange={handleDietsChange}
                                    >
                                </input>
                            </div> 
                        );
                    })
                }

                <button type="submit">Create recipe</button>

            </form>

            <Link to={'/home'}>
                <button>Go back Home</button>
            </Link>
        </div>

    );
};

export default Form;

// a futuro agregar validaciones