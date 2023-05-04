import React, { useState } from "react";
import styles from './SearchBar.module.css';
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../redux/actions/actionsIndex";


const SearchBar = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    // no se actualiza con el onChange porque implicaría hacer demasiadas peticiones a Spoonacular 
    const handleChange = (event) => {
        const newValueName = event.target.value;
        setName(newValueName);
    };

    const handleClick = () => {
        dispatch(getRecipesByName(name)); 
        setName('');
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

            <hr />
        </div>
    )
};

export default SearchBar;


