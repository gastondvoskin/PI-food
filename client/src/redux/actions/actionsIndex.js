import axios from 'axios';

// actions-types

// getRecipes (all)
export const GET_RECIPES = 'GET_RECIPES';

// getRecipesByName (filter in back)
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';

// getDiets 
export const GET_DIETS = 'GET_DIETS'; 

// create_recipe 
export const CREATE_RECIPE = 'CREATE_RECIPE';

// filters
export const FILTER_BY_DIET = 'FILTER_BY_DIET'; 
export const FILTER_BY_CREATOR = 'FILTER_BY_CREATOR'; 
export const RESET_FILTERS = 'RESET_FILTERS';

// sorts
export const SORT_RECIPES_BY_ALPHABET = 'SORT_RECIPES_BY_ALPHABET'; 
export const SORT_RECIPES_BY_HEALTHSCORE = 'SORT_RECIPES_BY_HEALTHSCORE'; 

// OLD getRecipeDetail (replaced for local state implementation)
// export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';


////////////////////////////////////////
// actions-creators
// getRecipes (all)
export const getRecipes = () => {
    return async (dispatch) => {
        try {
            const recipesRaw = await axios.get('http://localhost:3001/recipes');
            const recipesClean = recipesRaw.data;
            return dispatch({
                type: GET_RECIPES,
                payload: recipesClean
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
            const recipesByNameRaw = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            const recipesByNameClean = recipesByNameRaw.data;
            return dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: recipesByNameClean
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

        const dietsClean = ['dairy free', 'fodmap friendly', 'glutenfree', 'ketogenic', 'lacto ovo vegetarian', 'paleolithic', 'pescatarian', 'primal', 'vegan', 'vegetarian', 'whole 30']; 
        // const dietsRaw = await axios.get('http://localhost:3001/diets'); 
        // const dietsClean = dietsRaw.data; 

        ////////////////////    !!!!!!!!!!!!!!!!!!!! ///////////////////////

        return dispatch({
            type: GET_DIETS,
            payload: dietsClean
        });
    };
};


// createRecipe 
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


// filters
export const filterRecipesByDiet = (payload) => {
    return {
        type: FILTER_BY_DIET, 
        payload
    };
};

export const filterRecipesByCreator = (payload) => {
    return {
        type: FILTER_BY_CREATOR, 
        payload
    }
};

export const resetFilters = () => {
    return {
        type: RESET_FILTERS
    };
};


// sorts
export const sortRecipesByAlphabet = (payload) => { 
    return {
        type: SORT_RECIPES_BY_ALPHABET,
        payload
    }
};

export const sortRecipesByHealthscore = (payload) => { 
    return {
        type: SORT_RECIPES_BY_HEALTHSCORE,
        payload
    };
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

