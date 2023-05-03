import axios from 'axios';

// actions-types
export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_BY_DIET_AND_ALPHABET = 'FILTER_BY_DIET_AND_ALPHABET';     // modificar a futuro.    // wip: agregado: _AND_ALPHABET
export const SORT_RECIPES = 'SORT_RECIPES';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
// export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const CREATE_RECIPE = 'CREATE_RECIPE';




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
        type: FILTER_BY_DIET_AND_ALPHABET,              // wip: agregado: _AND_ALPHABET
        payload
    }
};

export const sortRecipes = (payload) => {
    return {
        type: SORT_RECIPES,
        payload
    }
};

export const getRecipesByName = (name) => {
    return async (dispatch) => {
        const recipesByNameRaw = await axios.get(`http://localhost:3001/recipes?name=${name}`);
        // console.log('recipesByNameRaw: ', recipesByNameRaw);
        const recipesByNameClean = recipesByNameRaw.data;
        return dispatch({
            type: GET_RECIPES_BY_NAME,
            payload: recipesByNameClean
        });
    };
};

// // Implementación del Componente Detail con Redux (lo reemplacé por local state)
// export const getRecipeDetail = (idRecipe) => {
//     return async (dispatch) => {
//         const recipeDetailRaw = await axios.get(`http://localhost:3001/recipes/${idRecipe}`);
//         const recipeDetailClean = recipeDetailRaw.data;
//         return dispatch({
//             type: GET_RECIPE_DETAIL,
//             payload: recipeDetailClean
//         });
//     };
// };

export const createRecipe = (dataToCreateRecipe) => {
    return async (dispatch) => {
        const createdRecipeRaw = await axios.post('http://localhost:3001/recipes', dataToCreateRecipe)
        .catch(error => console.log(error));
        const createdRecipeClean = createdRecipeRaw.data;
        return dispatch({
            type: CREATE_RECIPE,
            payload: createdRecipeClean
        });
    };
};
