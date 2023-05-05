import React, { useState } from "react";
import styles from './Filters.module.css';
import { filterRecipesByDiet, filterRecipesByCreator } from "../../redux/actions/actionsIndex";
import { useDispatch, useSelector } from 'react-redux';
import { resetFilters } from "../../redux/actions/actionsIndex";

const Filters = () => {
    const dispatch = useDispatch();

    const diets = useSelector((state) => state.diets); 

    // local state
    const [selectedDiet, setSelectedDiet] = useState(''); 
    const [selectedCreator, setSelectedCreator] = useState('');    
    
    // changeHandlers
    const handleSelectDiet = (event) => {
        const selectedDiet = event.target.value;
        setSelectedDiet(selectedDiet);
        dispatch(filterRecipesByDiet(selectedDiet));      //
    };

    const handleSelectCreator = (event) => {
        const selectedCreator = event.target.value;
        setSelectedCreator(selectedCreator);
        dispatch(filterRecipesByCreator(selectedCreator));     //
    };

    // handleReset
    const handleReset = (event) => {
        setSelectedDiet('');
        setSelectedCreator('');
        dispatch(resetFilters());
    };

    // return
    return (
        <div>
            <select name="diet" value={selectedDiet} onChange={handleSelectDiet}>
                <option value="" disabled selected>Diet</option>
                <option value="all">all</option>
                { 
                    diets.map((diet) => {
                        return (
                            <option value={diet}>{diet}</option>
                        );
                    })
                }
            </select>
            
            <select name="all" value={selectedCreator} onChange={handleSelectCreator}>
                <option value="" disabled selected>Creator</option>
                <option value="spoonacular">spoonacular</option>
                <option value="client">client</option>
            </select>
            
            <button onClick={handleReset}>Reset filters</button>

        </div>       
    );
};

export default Filters;