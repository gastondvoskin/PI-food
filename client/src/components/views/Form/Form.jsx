import React, { useState, useEffect } from "react";
import styles from './Form.module.css';
import { createRecipe } from "../../../redux/actions/actionsIndex";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



const Form = () => {

    const dispatch = useDispatch();

    const diets = useSelector((state) => state.diets); 

    // local state
    const initialFormState = {
        name: '',
        summary: '',
        healthscore: '',
        image: '',
        steps: [''], 
        diets: [], 
    };

    const initialErrorsState = {
        name: '',
        summary: '',
        healthscore: '',
        image: '',
        // steps: '', 
        // diets: '', 
    };


    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState(initialErrorsState);



    // validation
    const validateName = (form) => {
        if (form.name.length > 10) { // update number          
            setErrors({...errors, name: 'Max 10 characters'});
        } else if(form.name === '') { // update number
            setErrors({...errors, name: 'Required field'});
        } else {
            setErrors({...errors, name: ''}); 
        };
    };

    const validateSummary = (form) => {
        if (form.summary.length > 15) {
            setErrors({...errors, summary: 'Max 15 characters'});
        } else if (form.summary === '') {
            setErrors({...errors, summary: 'Required field'})
        } else {
            setErrors({...errors, summary: ''}); 
        };
    };

    const validateHealthscore = (form) => {
        if (form.healthscore < 0) {
            setErrors({...errors, healthscore: 'Min value: 0'});
        } else if (form.healthscore > 100) {
            setErrors({...errors, healthscore: 'Max value: 100'});
        } else if (form.healthscore === '') {
            setErrors({...errors, healthscore: 'Required field'})
        } else {
            setErrors({...errors, healthscore: ''}); 
        };
    };

    const validateImage = (form) => {
        if (form.image === '') {
            setErrors({...errors, image: 'Required field'})
        } else if (!urlRegex.test(form.image)) {
            setErrors({...errors, image: 'Invalid URL'});
        } else {
            setErrors({...errors, image: ''}); 
        };
    };


    const urlRegex = /\bhttps?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/i;

    // general inputs handler
    const handleChange = (event) => { 
        const { name, value } = event.target;
        console.log('name: ', name);
        const updatedForm = {
            ...form,
            [name]: value
        }
        setForm(updatedForm);
        // the local state takes some time to update. I didn't do it with useEffect because I want the first state to be with no errors set. 
        // I validate with different functions, so each one validates only the event.target.name
        switch (name) {
            case 'name':
                validateName(updatedForm);
                break;
            case 'summary':
                validateSummary(updatedForm);
                break;
            case 'healthscore':
                validateHealthscore(updatedForm);
                break;
            case 'image': 
                validateImage(updatedForm);
                break;
            default:
                break;
        };
      };
    

    // steps input handler
    const handleStepsChange = (event) => { 
        const { id, value } = event.target;
        const idParsed = Number(id);

        setForm({
            ...form,
            steps: [...form.steps.slice(0, idParsed), value, ...form.steps.slice(idParsed + 1)]
        });
    };


    // addStep button handler
    const handleAddStep = () => {
        setForm({
            ...form,
            steps: [...form.steps, ""]      // adds an empty element to steps
        });
    };


    // diets input handler
    const handleDietsChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setForm({
                ...form,
                diets: [...form.diets, name]
            });
        } else {
            setForm({
                ...form,
                diets: [...form.diets.filter((diet) => diet !== name)]
            });
        };
    };


    // submitting form handler (create recipe button)
    const handleSubmit = (event) => {
        event.preventDefault();
        // logica: dispatch createRecipe pasándole un objeto con toda la info
        // console.log('form: ', form); 
        dispatch(createRecipe(form));
        ///// agregar validación (mostrar objeto que me devuelve el back) o rechazo
        setForm(initialFormState);
    };


    // return
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create your own recipe</h2>

                <div>
                    <label htmlFor="name">Name: </label>
                    <br />
                    <input 
                        name="name" type="text" placeholder="Name..."
                        value={form.name} onChange={handleChange} 
                    /> 
                    {errors.name && <p>{errors.name}</p>}
                    <br />
                </div>

                <div>
                    <label htmlFor="summary">Summary: </label>
                    <br />
                    <textarea 
                        name="summary" placeholder="Summary..."
                        rows="5" cols="50"
                        value={form.summary} onChange={handleChange}
                    />
                    {errors.summary && <p>{errors.summary}</p>}
                    <br />
                </div>

                <div>
                    <label htmlFor="healthscore">Healthscore: </label>
                    <br />
                    <input
                        name="healthscore" type="number" placeholder="0 to 100"
                        value={form.healthscore} onChange={handleChange}
                    />
                    <br />
                    {errors.healthscore && <p>{errors.healthscore}</p>}
                </div>


                <div>
                    <label htmlFor="steps">Steps: </label> 
                    <br />

                    {
                        form.steps.map((step, index) => { 
                            return (
                                <div key={index}>
                                    <textarea
                                        id={index} placeholder={`Step ${index + 1}`} rows="2" cols="50" 
                                        value={step} onChange={handleStepsChange}
                                    />
                                    <br />
                                </div>
                            )
                        })
                    }

                    <button type="button" onClick={handleAddStep}>Add step</button>
                    <br />
                </div>
                
                <div>
                    <label htmlFor="image">Image: </label>
                    <br />
                    <input
                        name="image" type="text" placeholder="URL..."
                        value={form.image} onChange={handleChange}
                    />
                    <br />
                    {errors.image && <p>{errors.image}</p>}
                </div>
                
                <div>
                    <label htmlFor="diets">Diets: </label>
                    {
                        diets.map((diet, index) => {
                            return (
                                <div key={index}>
                                    <label htmlFor={diet}>{diet}</label>
                                    <input
                                        name={diet} 
                                        type="checkbox"
                                        onChange={handleDietsChange}
                                    />
                                </div> 
                            );
                        })
                    }
                </div>

                    {/* disable button in cases of ...  */}
                <button 
                    type="submit" 
                    disabled={
                        // !Object.values(errors).some(error => error) &&
                        errors.name !== '' || errors.summary !== '' || errors.healthscore !== '' || errors.image !== '' || 
                        form.name === '' || form.summary === '' || form.healthscore === '' || form.image === ''                         
                        ? "true" 
                        : ""
                    } 
                    >Create recipe
                </button>

            </form>

            <Link to={'/home'}>
                <button>Go back Home</button>
            </Link>
        </div>

    );
};



export default Form;

// a futuro agregar validaciones