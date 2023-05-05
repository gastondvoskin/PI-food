import React, { useState } from "react";
import styles from './Sorting.module.css';
import { sortRecipesByAlphabet, sortRecipesByHealthscore } from "../../redux/actions/actionsIndex";
import { useDispatch } from "react-redux";

const Sorting = () => {
    const dispatch = useDispatch();

    // local state
    const [selectedAlphabet, setSelectedAlphabet] = useState(''); 
    const [selectedHealth, setSelectedHealth] = useState('');    

    
    // changeHandlers
    const handleSelectAlphabet = (event) => {
        const selectedAlphabet = event.target.value;             
        setSelectedAlphabet(selectedAlphabet); 
        dispatch(sortRecipesByAlphabet(selectedAlphabet));      //
    };

    const handleSelectHealth = (event) => { 
        const selectedHealth = event.target.value;             
        setSelectedHealth(selectedHealth);
        dispatch(sortRecipesByHealthscore(selectedHealth));     //
    };


    // return
    return ( 
        <div>
            <select name="alphabet" value={selectedAlphabet} onChange={handleSelectAlphabet}>
                <option value="" disabled selected>A-Z or Z-A</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
            
            <select name="health" value={selectedHealth} onChange={handleSelectHealth}>
                <option value="" disabled selected>Health score</option>
                <option value="healthyFirst">Healthy first</option>
                <option value="unhealthyFirst">Unhealthy first</option>
            </select>
            <hr />
        </div>       
    );
};

export default Sorting;

