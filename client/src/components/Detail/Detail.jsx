import React, { useState, useEffect } from "react";
import styles from './Detail.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { getRecipeDetail } from "../../redux/actions/actionsIndex.js";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams(); 

    // INICIO: IMPLEMENTACION CON LOCAL STATE Y ASYNC-AWAIT 
    const [recipeDetail, setRecipeDetail] = useState({});

    useEffect(() => {
        const getRecipeDetail = async () => {
            const detailRaw = await axios.get(`http://localhost:3001/recipes/${id}`);
            const detailClean = detailRaw.data;
            setRecipeDetail(detailClean);
        };
        getRecipeDetail(); 

        // return setRecipeDetail({}); // (unmount, esto no me funciona)
    }, [id]);
    // FIN IMPLEMENTACION CON LOCAL STATE Y ASYNC-AWAIT

    const { name, summary, healthscore, steps, image, diets } = recipeDetail;

    return (
        <div>
            <p>{id}</p>
            <h2>{recipeDetail.name}</h2>
            <p>{summary}</p>
            <p>{healthscore}</p>
            <ul>{steps?.map((step, index) => {
                return <li key={index}>{step}</li>
            })}
            </ul>
            <img src={image} alt="recipe image" width="200px" height="200px"/>
            <h4>{diets}</h4>
        </div>
    );
};

export default Detail;


    // // INICIO IMPLEMENTACION CON LOCAL STATE Y PROMISE (.THEN)
    // const [recipeDetail, setRecipeDetail] = useState({});
    // useEffect(() => {
    //     axios.get(`http://localhost:3001/recipes/${id}`)
    //         .then((res) => res.data)
    //         .then((data) => {
    //             setRecipeDetail(data)
    //         });

    //         return setRecipeDetail({});
    // }, [id]);
    // // FIN IMPLEMENTACION CON LOCAL STATE Y PROMISE (.THEN)
    
    // INICIO: IMPLEMENTACION CON REDUX.
    // useEffect(() => {
    //     dispatch(getRecipeDetail(id));
    // }, [dispatch, id]);     // selene puso en array de dependencias dispatch, no sé por qué
    // const recipeDetail = useSelector((state) => state.recipeDetail); 
    // FIN: IMPLEMENTACION CON REDUX.
