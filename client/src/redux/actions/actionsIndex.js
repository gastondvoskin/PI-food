import axios from 'axios';

// actions-types
export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';


// actions-creators
export const getRecipes = () => {
    return async (dispatch) => {
        const recipesRaw = await axios.get('http://localhost:3001/recipes');
        const recipesClean = recipesRaw.data;
        return dispatch({
            type: GET_RECIPES,
            payload: recipesClean
        })
    }
};


export const filterRecipes = (payload) => {
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

// ej: filterRecipes({vegetarian, spoonacular})