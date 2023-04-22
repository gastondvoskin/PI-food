const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe } = require('../db.js'); 

const { API_KEY } = process.env; 
const baseURL = 'https://api.spoonacular.com/recipes';



const getApiRecipeByIdRaw = async (id) => {
    let apiRecipeByIdRaw = await axios.get(`${baseURL}/${id}/information?apiKey=${API_KEY}`);
    // if (!dbRecipeByIdRaw) throw Error('There is no recipe with this id');       // esto no funciona porque el endpoint con falso id da 404
    apiRecipeByIdRaw = apiRecipeByIdRaw.data;
    return apiRecipeByIdRaw;
};

const cleanApiRecipe = (apiRecipeRaw) => {
    const { id, title: name, image, summary, healthScore: healthscore, analyzedInstructions, diets } = apiRecipeRaw;

    let stepsClean = [];        // si no hay analyzedInstructions en la api externa, steps retornará []; 
    if (analyzedInstructions.length) {
        const stepsRaw = analyzedInstructions[0].steps; 
        // [0] porque analyzedInstructions es un array con sólo un elemento
        stepsClean = stepsRaw.map((step) => step.step);
    }

    const apiRecipeByIdClean = {id, name, image, summary, healthscore, steps: stepsClean, diets, created: false}; 
    return apiRecipeByIdClean; 
};


const getApiRecipeByIdClean = async (id) => {
    const apiRecipeByIdRaw = await getApiRecipeByIdRaw(id); 
    const apiRecipeByIdClean = cleanApiRecipe(apiRecipeByIdRaw);
    return apiRecipeByIdClean;
};

///////////////////////////////////////////
///////////////////////////////////////////



const getAllApiRecipesRaw = async () => {
    const numberOfRecipesPerPage = 10;  
    const numberOfResults = 100;         // reducido a 10 para hacer una sola request a Spoonacular. a futuro, 100.  
    const numberOfPages = numberOfResults / numberOfRecipesPerPage;     

    let apiAllRecipesRaw = []; 
    for (let i=0; i<numberOfPages; i++) {
        const offset = i * numberOfRecipesPerPage; 
        let tenApiRecipesRaw = await axios.get(`${baseURL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${numberOfRecipesPerPage}&offset=${offset}`);
        tenApiRecipesRaw = tenApiRecipesRaw.data.results; 
        apiAllRecipesRaw.push(...tenApiRecipesRaw);
    };  
    return apiAllRecipesRaw;
};

const cleanAllApiRecipes = (allApiRecipesRaw) => {
    const apiAllRecipesClean = allApiRecipesRaw.map((apiRecipeRaw) => cleanApiRecipe(apiRecipeRaw)); 
    return apiAllRecipesClean;
};


const getAllApiRecipesClean = async () => {
    const apiAllRecipesRaw = await getAllApiRecipesRaw();
    const apiAllRecipesClean = cleanAllApiRecipes(apiAllRecipesRaw);
    return apiAllRecipesClean;
};


module.exports = {
    getApiRecipeByIdClean, 
    getAllApiRecipesClean,
    getAllApiRecipesRaw
};