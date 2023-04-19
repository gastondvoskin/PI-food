const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe } = require('../db.js'); 

const { API_KEY } = process.env; 



const getApiRecipeByIdRaw = async (id) => {
    let apiRecipeByIdRaw = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    apiRecipeByIdRaw = apiRecipeByIdRaw.data;
    console.log(apiRecipeByIdRaw);
    return apiRecipeByIdRaw;
};

const cleanApiRecipe = (apiRecipeRaw) => {
    const { id, name, image, summary, healthscore, analyzedInstructions } = apiRecipeRaw;
    const apiRecipeByIdClean = {
        id, 
        name, 
        image, 
        summary, 
        healthscore, 
        steps: analyzedInstructions[0].steps.map((step) => step.step),
        // steps: apiRecipeRaw.instructions,
        created: false}; 
    return apiRecipeByIdClean; 
    // [0] porque analyzedInstructions es un array con sólo un elemento
};

const getApiRecipeByIdClean = async (id) => {
    const apiRecipeByIdRaw = await getApiRecipeByIdRaw(id); 
    const apiRecipeByIdClean = cleanApiRecipe(apiRecipeByIdRaw);
    return apiRecipeByIdClean;
};

///////////////////////////////////////////



const getAllApiRecipesRaw = async () => {
    let apiAllRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
    apiAllRecipesRaw = apiAllRecipesRaw.data.results;
    return apiAllRecipesRaw;
};

const cleanAllApiRecipes = (allApiRecipesRaw) => {
    const apiAllRecipesClean = allApiRecipesRaw.map((apiRecipeRaw) => {
        const apiRecipeClean = cleanApiRecipe(apiRecipeRaw);
        return apiRecipeClean;
    }); 
    return apiAllRecipesClean;
};


const getAllApiRecipesClean = async () => {
    const apiAllRecipesRaw = await getAllApiRecipesRaw();
    const apiAllRecipesClean = cleanAllApiRecipes(apiAllRecipesRaw);
    return apiAllRecipesClean;
};


module.exports = {
    getApiRecipeByIdClean, 
    getAllApiRecipesClean
}