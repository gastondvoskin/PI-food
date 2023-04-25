import React from "react";
import styles from './Home.module.css';
// import { NavLink } from "react-router-dom";
import { usteState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from "../../redux/actions/actionsIndex.js";
// importo los componentes a renderizar
import Cards from "../Cards/Cards.jsx";
import Card from '../Card/Card.jsx';
import Pagination from "../Pagination/Pagination.jsx";
import { Link } from "react-router-dom";


const Home = () => {
    const dispatch = useDispatch();
    // const allRecipes = useSelector((state) => state.recipes);

    useEffect( () => {          /* no va async await? */
        dispatch(getRecipes())
    }, []); 



    // export const getRecipes = () => {
    //     return async (dispatch) => {
    //         const json = await axios.get('http://localhost:3001/recipes');
    //         return dispatch({
    //             type: GET_RECIPES,
    //             payload: json.data
    //         })
    //     }
    // };

    return (
        <div>
            {/* {
                allRecipes?.map((recipe) => {
                    return (
                        <Card name={recipe.name} image={recipe.image} diets={recipe.diets} />
                    )
                })
            } */}
            <Cards />
            <hr />
            <h1>NIY - Home</h1>
            <Pagination />
        </div>
    );
};

export default Home;




