import React, { useState } from "react";
import styles from './Filters.module.css';
import { filterRecipes } from "../../redux/actions/actionsIndex";
import { useDispatch } from 'react-redux';
import { resetFilters } from "../../redux/actions/actionsIndex";

const Filters = (props) => {
    const { dietsList } = props;
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
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(filterRecipes({
            diet: filters.diet,
            creator: filters.creator
        }));
    };

    // handleReset
    const handleReset = (event) => {
        dispatch(resetFilters());
    }

    // return
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <hr />
                <label htmlFor="diet">Diet:</label>
                <select name="diet" value={filters.diet} onChange={handleSelect}>
                    <option value="all">all</option>
                    {/* map dietsList (received though props) */}
                    {
                        dietsList.map((diet) => {
                            return <option value={diet}>{diet}</option>
                        })
                    }
                </select>

                <label htmlFor="creator">Creator:</label>
                <select name="creator" value={filters.creator} onChange={handleSelect}>
                    <option value="all">all</option>
                    <option value="spoonacular">spoonacular</option>
                    <option value="client">client</option>
                </select>

                <button type="submit">Apply filters</button>
            </form>
            
            <button onClick={handleReset}>Reset filters</button>
            <hr />

        </div>
    );
};

export default Filters;