import React from "react";
import styles from './SearchBar.module.css';


const SearchBar = () => {
    return (
        <div>
            <span>SearchBar</span>
            <input 
                placeholder="Search recipe by name"
            />
        </div>
    );
};

export default SearchBar;

