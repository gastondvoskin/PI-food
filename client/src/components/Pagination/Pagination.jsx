import React from "react";
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, handlePageChange }) => {

    // pageNumbers -> [0, 1, 2, 3...]
    const pageNumbers = []; 
    for (let i = 1; i < totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul>
            {
                pageNumbers.map((pageNumber, index) => {
                    return (
                        <button 
                            key={index}
                            onClick={() => handlePageChange(pageNumber)}>{pageNumber}
                        </button>
                    )
                })
            }
        </ul>
    );
};

export default Pagination;