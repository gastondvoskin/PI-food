import React from "react";
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, handlePageChange }) => {

    const pageNumbers = []; 
    
    for (let i = 1; i < totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul>
            {
                pageNumbers.map((pageNumber) => {
                    return (
                        <button onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                    )
                })
            }
        </ul>
    );
};

export default Pagination;