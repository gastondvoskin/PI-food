import React, { useState } from "react";
import styles from './Sorting.module.css';
import { sortRecipes } from "../../redux/actions/actionsIndex";
import { useDispatch } from "react-redux";

const Sorting = () => {
    const dispatch = useDispatch();

    // local state for the controlled form
    const [sorts, setSorts] = useState({
        alphabet: 'none',
        health: 'none'
    });
    
    // handleSelect
    const handleSelect = (event) => {
        const { name, value } = event.target;
        setSorts({
            ...sorts,
            [name]: value
        });
    };
    
    // handleOnSubmit
    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(sortRecipes({
            alphabet: sorts.alphabet,
            health: sorts.health
        }));
    };


    // return
    return ( 
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="alphabet">Sort by alphabet</label>
            <select name="alphabet" value={sorts.alphabet} onChange={handleSelect}>
                <option value="none">none</option> 
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>

            <label htmlFor="health">Sort by health</label>
            <select name="health" value={sorts.health} onChange={handleSelect}>
                <option value="none">none</option> 
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>

            <button type="submit">Sort</button>
            <hr />
        </form>
    );
};

export default Sorting;