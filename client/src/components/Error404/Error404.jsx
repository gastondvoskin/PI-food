import React from "react";
import styles from './Error404.module.css';
import { Link } from "react-router-dom";

const Error404 = (props) => {

    const { errorMessage } = props;

    return (
        <div>
            <h1>Page not found</h1>
            <h2>Error 404</h2>
            <Link to={'/home'}>
                <button>Go back Home</button>
            </Link>

        </div>
    )
};

export default Error404;