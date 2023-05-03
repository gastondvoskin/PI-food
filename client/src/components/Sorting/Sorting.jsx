import React, { useState } from "react";
import styles from './Sorting.module.css';
import { sortRecipesByAlphabet, sortRecipesByHealthscore } from "../../redux/actions/actionsIndex";
import { useDispatch } from "react-redux";

const Sorting = () => {
    const dispatch = useDispatch();

    // local state
    const [sortAlphabet, setSortAlphabet] = useState(''); 
    const [sortHealth, setsortHealth] = useState('');    

    
    // changeHandlers
    const handleSelectAlphabet = (event) => {
        const newValueSortAlphabet = event.target.value;             
        setSortAlphabet(newValueSortAlphabet); 
        dispatch(sortRecipesByAlphabet(newValueSortAlphabet));      //
    };

    const handleSelectHealth = (event) => { 
        const newValueSortHealth = event.target.value;             
        setsortHealth(newValueSortHealth);
        dispatch(sortRecipesByHealthscore(newValueSortHealth));     //
    };


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

