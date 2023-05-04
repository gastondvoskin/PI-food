import React, { useState } from "react";
import styles from './SearchBar.module.css';
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../redux/actions/actionsIndex";


const SearchBar = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setName('');
        dispatch(getRecipesByName(name)); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <hr />
            <input 
                type="text"
                placeholder="Search recipe by name"
                value={name}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
            <hr />
        </form>
    );
};

export default SearchBar;

