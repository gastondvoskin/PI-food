import React, { useState } from "react";
import styles from './Sorting.module.css';
import { sortRecipesByAlphabet, sortRecipesByHealthscore } from "../../redux/actions/actionsIndex";
import { useDispatch } from "react-redux";

const Sorting = () => {
    const dispatch = useDispatch();

    // local state for the controlled form
    // const [sorts, setSorts] = useState({         // wip borrar
    //     alphabet: '',
    //     health: ''
    // });
    
    const [sortAlphabet, setSortAlphabet] = useState('');    // wip nuevo
    const [sortHealth, setsortHealth] = useState('');    

    // handleSelect                                         // wip borrar
    // const handleSelect = (event) => {
    //     const { name, value } = event.target;
    //     setSorts({
    //         ...sorts,
    //         [name]: value 
    //     });

    //     dispatch(sortRecipes(sorts));
    // };
    
    const handleSelectAlphabet = (event) => {
        // console.log(event.target.value);  
        const newValueSortAlphabet = event.target.value;             
        setSortAlphabet(newValueSortAlphabet);                // wip nuevo
        dispatch(sortRecipesByAlphabet(newValueSortAlphabet));      // with this variable, and not with the state which may take a time to update. 
    };

    const handleSelectHealth = (event) => {               // wip nuevo
        const newValueSortHealth = event.target.value;             
        setsortHealth(newValueSortHealth);
        dispatch(sortRecipesByHealthscore(newValueSortHealth));     // with this variable, and not with the state which may take a time to update. 
    };


    // // handleOnSubmit
    // const handleOnSubmit = (event) => {
    //     event.preventDefault();
    //     dispatch(sortRecipes({
    //         alphabet: sorts.alphabet,
    //         health: sorts.health
    //     }));
    // };


    // return
    return ( 
        <div>
            <select name="alphabet" value={sortAlphabet} onChange={handleSelectAlphabet}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
            
            <select name="health" value={sortHealth} onChange={handleSelectHealth}>
                <option value="healthyFirst">Healthy first</option>
                <option value="unhealthyFirst">Unhealthy first</option>
            </select>
            <hr />
        </div>

        
    );
};

export default Sorting;



// original
// <form onSubmit={handleOnSubmit}>
// <label htmlFor="alphabet">Sort by alphabet</label>
// <select name="alphabet" value={sorts.alphabet} onChange={handleSelect}>
//     {/* <option value="none">none</option>  */}
//     <option value="asc">asc</option>
//     <option value="desc">desc</option>
// </select>

// <label htmlFor="health">Sort by health</label>
// <select name="health" value={sorts.health} onChange={handleSelect}>
//     {/* <option value="none">none</option>  */}
//     <option value="asc">asc</option>
//     <option value="desc">desc</option>
// </select>

// <button type="submit">Sort</button>
// <hr />
// </form>
