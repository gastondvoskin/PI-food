import React, { useState } from "react";
import styles from './Filters.module.css';
import { filterRecipesByDiet, filterRecipesByCreator } from "../../redux/actions/actionsIndex";
import { useDispatch } from 'react-redux';
import { resetFilters } from "../../redux/actions/actionsIndex";

const Filters = (props) => {
    const { dietsList } = props;
    const dispatch = useDispatch();

    // local state
    const [filterDiet, setFilterDiet] = useState(''); 
    const [filterCreator, setFilterCreator] = useState('');    
    
    // changeHandlers
    const handleSelectDiet = (event) => {
        const newValueFilterDiet = event.target.value;
        setFilterDiet(newValueFilterDiet);
        dispatch(filterRecipesByDiet(newValueFilterDiet));      //
    };

    const handleSelectCreator = (event) => {
        const newValueFilterHealth = event.target.value;
        setFilterCreator(newValueFilterHealth);
        dispatch(filterRecipesByCreator(newValueFilterHealth));     //
    };

    // handleReset
    const handleReset = (event) => {
        setFilterDiet('');
        setFilterCreator('');
        dispatch(resetFilters());
    };

    // return
    return (
        <div>
            <select name="diet" value={filterDiet} onChange={handleSelectDiet}>
                <option value="" disabled selected>Diet</option>
                <option value="all">all</option>
                <option value="vegetarian">vegetarian</option> {/* harcodeado */}
                <option value="vegan">vegan</option>
            </select>
            
            <select name="all" value={filterCreator} onChange={handleSelectCreator}>
                <option value="" disabled selected>Creator</option>
                <option value="spoonacular">spoonacular</option>
                <option value="client">client</option>
            </select>
            
            <button onClick={handleReset}>Reset filters</button>

        </div>       
    );
};

export default Filters;