import { 
    GET_RECIPES, GET_RECIPES_BY_NAME, GET_DIETS, CREATE_RECIPE, 
    FILTER_BY_DIET, FILTER_BY_CREATOR, RESET_FILTERS, 
    SORT_RECIPES_BY_ALPHABET, SORT_RECIPES_BY_HEALTHSCORE, 
    /* GET_RECIPE_DETAIL */ 
} from "./actionsTypes.js"; 


import axios from 'axios';



// getAllRecipes
export const getAllRecipes = () => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get('http://localhost:3001/recipes');
            const allRecipes = apiData.data;
            return dispatch({
                type: GET_RECIPES,
                payload: allRecipes
            });    
        } catch (error) {
            console.log('aca');
        } 
    };
};


// getRecipesByName (filter in back)
export const getRecipesByName = (name) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            const recipesByName = apiData.data;
            return dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: recipesByName
            });
        } catch (error) {
            console.log(error.response);
            alert('There are no recipes with this name, please try another one');
        }

        // const recipesByNameRaw = await axios.get(`http://localhost:3001/recipes?name=${name}`);
        // const recipesByNameClean = recipesByNameRaw.data;
        // return dispatch({
        //     type: GET_RECIPES_BY_NAME,
        //     payload: recipesByNameClean
        // });

    };
};


export const getDiets = () => {
    return async (dispatch) => {

        ////////////////////    !!!!!!!!!!!!!!!!!!!! ///////////////////////
        // to fetch data from Spoonacular: comment next line and uncomment the two following to that.

        const diets = ['dairy free', 'fodmap friendly', 'glutenfree', 'ketogenic', 'lacto ovo vegetarian', 'paleolithic', 'pescatarian', 'primal', 'vegan', 'vegetarian', 'whole 30']; 
        // const apiData = await axios.get('http://localhost:3001/diets'); 
        // const diets = apiData.data; 

        ////////////////////    !!!!!!!!!!!!!!!!!!!! ///////////////////////

        return dispatch({
            type: GET_DIETS,
            payload: diets
        });
    };
};


// createRecipe 
export const createRecipe = (dataToCreateRecipe) => {
    return async (dispatch) => {
        const apiData = await axios.post('http://localhost:3001/recipes', dataToCreateRecipe)
        .catch(error => console.log(error));
        const createdRecipe = apiData.data;
        return dispatch({
            type: CREATE_RECIPE,
            payload: createdRecipe
        });
    };
};


// filters
export const filterRecipesByDiet = (payload) => {
    return {type: FILTER_BY_DIET, payload};
};

export const filterRecipesByCreator = (payload) => {
    return {type: FILTER_BY_CREATOR, payload}
};

export const resetFilters = () => {
    return {type: RESET_FILTERS};
};


// sorts
export const sortRecipesByAlphabet = (payload) => { 
    return {type: SORT_RECIPES_BY_ALPHABET, payload}
};

export const sortRecipesByHealthscore = (payload) => { 
    return {type: SORT_RECIPES_BY_HEALTHSCORE, payload};
};







//////////////
// OLD getRecipeDetail (replaced for local state implementation)
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

