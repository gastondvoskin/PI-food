import React, { useState } from "react";
import styles from './SearchBar.module.css';
import { useDispatch } from "react-redux";
import { getRecipesByName, resetFilters } from "../../redux/actions/actionsIndex";


const SearchBar = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    // no se actualiza con el onChange porque implicaría hacer demasiadas peticiones a Spoonacular 
    const handleChange = (event) => {
        const newValueName = event.target.value;
        setName(newValueName);
    };

    const handleClick = () => {
        setName('');
        dispatch(getRecipesByName(name)); 

        // por qué el try catch no funciona acá pero sí funciona en actionsIndex.js???? Lo quiero hacer con try catch para renderizar condicionalmente un mensaje que diga "No recipes found"
        
        // try {
        //     dispatch(getRecipesByName(name)); 
        // } catch (error) {
        //     console.log('acsdfsdf');
        //     console.log(error.response?.data.error);
        // }
    };

    // handleReset (copied from Filters.jsx)
    const handleReset = (event) => {
        setName('');
        dispatch(resetFilters());
    };
    

    return (
        <div>
            <hr />
            <input 
                type="text"
                placeholder="Search a recipe..."
                value={name}
                onChange={handleChange}
            />

            <button
                onClick={handleClick}>
                Search
            </button>

            <button onClick={handleReset}>Reset</button>

            <hr />
        </div>
    )
};

export default SearchBar;


