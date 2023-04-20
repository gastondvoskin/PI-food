const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe } = require('../db.js'); 

const { API_KEY } = process.env; 
const baseURL = 'https://api.spoonacular.com/recipes';



const getApiRecipeByIdRaw = async (id) => {
    let apiRecipeByIdRaw = await axios.get(`${baseURL}/${id}/information?apiKey=${API_KEY}`);
    apiRecipeByIdRaw = apiRecipeByIdRaw.data;
    return apiRecipeByIdRaw;
};

let i = 0;
const cleanApiRecipe = (apiRecipeRaw) => {
    const { id, title: name, image, summary, healthScore: healthscore, analyzedInstructions } = apiRecipeRaw;
    // const steps = analyzedInstructions[0].steps.map((step) => step.step);
    // console.log(analyzedInstructions)
    let stepsClean = [];        // si no hay analyzedInstructions en la api externa, steps retornará []; 
    if (analyzedInstructions.length) {
        const stepsRaw = analyzedInstructions[0].steps;
        stepsClean = stepsRaw.map((step) => step.step);
    }

    const apiRecipeByIdClean = {
        id, 
        name, 
        image, 
        summary, 
        healthscore, 
        steps: stepsClean,
        // analyzedInstructions,
        // steps: analyzedInstructions[0].steps.map((step) => step.step),           // a futuro descomentar y corregir. por ahora con algunas recpes me retorna "error": "Cannot read properties of undefined (reading 'steps')"
        // steps: apiRecipeRaw.instructions,
        created: false,
        myId: 'myId' + i++                      // a futuro borrar
    }; 
    // console.log('aquiiii');
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
    const numberOfRecipesPerPage = 10;  
    const numberOfResults = 100;        // 100 is the minimum asked in the readme. --------> Por qué al cambiar de 20 a 30 me devuelve "error": "Cannot read properties of undefined (reading 'steps')" ?
    const numberOfPages = numberOfResults / numberOfRecipesPerPage;     

    let apiAllRecipesRaw = []; 
    for (let i=0; i<numberOfPages; i++) {
        const offset = i * numberOfRecipesPerPage; 
        console.log('i: ', i);
        console.log('offset: ', offset);
        let tenApiRecipesRaw = await axios.get(`${baseURL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${numberOfRecipesPerPage}&offset=${offset}`);
        tenApiRecipesRaw = tenApiRecipesRaw.data.results; 
        apiAllRecipesRaw.push(...tenApiRecipesRaw);
    };  
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
        // console.log('hola');
        // console.log(apiAllRecipesClean);
    return apiAllRecipesClean;
};


module.exports = {
    getApiRecipeByIdClean, 
    getAllApiRecipesClean
}