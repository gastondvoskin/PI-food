import React from "react";
import styles from './Filters.module.css';

const Filters = () => {
    return (
        <div>
            <span>Filters</span>
            <input 
                placeholder="Filter by diet"
            />
            <input 
                placeholder="Filter by created by user"
            />
        </div>
    );
};

export default Filters;