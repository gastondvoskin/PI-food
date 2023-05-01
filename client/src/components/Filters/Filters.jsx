import React, { useState } from "react";
import styles from './Filters.module.css';
import { filterRecipes } from "../../redux/actions/actionsIndex";
import { useDispatch } from 'react-redux';

const Filters = () => {
    const dispatch = useDispatch();

    // local state for the controlled form
    const [filters, setFilters] = useState({
        diet: 'all',
        creator: 'all'
    });

    // handleSelect
    const handleSelect = (event) => {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    // handleOnSubmit
    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(filterRecipes({
            diet: filters.diet,
            creator: filters.creator
        }));
    };


    // return
    return (
        <form onSubmit={handleOnSubmit}>
            <hr />
            <label htmlFor="diet">Choose a diet</label>
            <select name="diet" value={filters.diet} onChange={handleSelect}>
                <option value="all">all</option>
                <option value="vegetarian">vegetarian</option>
                <option value="vegan">vegan</option>
            </select>

            <label htmlFor="creator">Choose a creator</label>
            <select name="creator" value={filters.creator} onChange={handleSelect}>
                <option value="all">all</option>
                <option value="spoonacular">spoonacular</option>
                <option value="client">client</option>
            </select>

            <button type="submit">Apply filters</button>
            <hr />
        </form>
    );
};

export default Filters;