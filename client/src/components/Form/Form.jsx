import React, { useState } from "react";
import styles from './Form.module.css';
import { createRecipe } from "../../redux/actions/actionsIndex";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



const Form = () => {

    const dispatch = useDispatch();

    const diets = useSelector((state) => state.diets); 


    // local state
    const initialState = {
        name: '',
        summary: '',
        healthscore: '',
        image: '',
        steps: [''],        // new  -------------------------------- STEPS
        diets: [], 
    };

    const [dataToCreateRecipe, setDataToCreateRecipe] = useState(initialState);


    // general inputs handler
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataToCreateRecipe({
            ...dataToCreateRecipe,
            [name]: value
        });
    };


    // steps input handler
    const handleStepsChange = (event) => {              // new -------------------------------- STEPS
        const { id, value } = event.target;
        const idParsed = Number(id);

        setDataToCreateRecipe({
            ...dataToCreateRecipe,
            steps: [...dataToCreateRecipe.steps.slice(0, idParsed), value, ...dataToCreateRecipe.steps.slice(idParsed + 1)]
        });
    };


    // addStep button handler
    const handleAddStep = () => {
        setDataToCreateRecipe({
            ...dataToCreateRecipe,
            steps: [...dataToCreateRecipe.steps, ""]      // adds an empty element to steps
        });
    };


    // diets input handler
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


    // submitting form handler (create recipe button)
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
                <br />
                <input
                    name="name"
                    type="text"
                    value={dataToCreateRecipe.name}
                    onChange={handleChange}
                    placeholder="Name...">
                </input>
                <br />

                <label htmlFor="summary">Summary</label>
                <br />
                <textarea
                    name="summary"
                    value={dataToCreateRecipe.summary}
                    onChange={handleChange}
                    placeholder="Summary..."
                    rows="5"
                    cols="50">
                </textarea>
                <br />

                <label htmlFor="healthscore">Healthscore</label>
                <br />
                <input
                    name="healthscore"
                    type="number"
                    value={dataToCreateRecipe.healthscore}
                    onChange={handleChange}
                    placeholder="0 to 100">
                </input>
                <br />



                <label htmlFor="steps">Steps</label>            {/* -------------------------------- STEPS */}
                <br />

                {
                    dataToCreateRecipe.steps.map((step, index) => { 
                        return (
                            <div key={index}>
                                <textarea
                                    id={index}
                                    value={step}
                                    onChange={handleStepsChange}
                                    placeholder={`Step ${index + 1}`}
                                    rows="2"
                                    cols="50"> 
                                </textarea>
                                <br />
                            </div>
                        )
                    })
                }


                <button 
                    type="button"
                    onClick={handleAddStep}>
                    Add step
                </button>
                <br />





                <label htmlFor="image">Image</label>
                <br />
                <input
                    name="image"
                    value={dataToCreateRecipe.image}
                    onChange={handleChange}
                    placeholder="URL...">
                </input>
                <br />


                <label htmlFor="diets">Diets</label>
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