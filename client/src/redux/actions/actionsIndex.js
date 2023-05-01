import axios from 'axios';

// actions-types
export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';     // modificar a futuro. 
export const SORT_RECIPES = 'SORT_RECIPES';


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
};

export const sortRecipes = (payload) => {
    return {
        type: SORT_RECIPES,
        payload
    }
}


// ej: filterRecipes({vegetarian, spoonacular})