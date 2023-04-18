const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe } = require('../db.js'); 
const { Op } = require('sequelize');

const { API_KEY } = process.env; 


const searchRecipeById = async (id) => {
    const source = isNaN(id) ? 'DB' : 'apiExterna'; 

    let recipeByIdClean; 
    if (source === "DB") {
        recipeByIdClean = await Recipe.findByPk(id); 
        // console.log('recipeById: ', recipeById.dataValues);
    } 
    if (source === 'apiExterna') {
        let recipeByIdRaw = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        recipeByIdRaw = recipeByIdRaw.data; 
        recipeByIdClean = {
            id: recipeByIdRaw.id,
            name: recipeByIdRaw.title,      // ojo name y title 
            image: recipeByIdRaw.image,
            summary: recipeByIdRaw.summary,
            healthscore: recipeByIdRaw.healthScore,     // ojo mayúscula y minúscula
            instructions: recipeByIdRaw.instructions,
            created: false
        }
    }
    return recipeByIdClean;
};



const searchAllRecipes = async () => {
    // A futuro implementar que no retorne sólo 10 recetas. 
    const dbAllRecipesRaw = await Recipe.findAll(); 
    const dbAllRecipesClean = dbAllRecipesRaw.map((dbRecipe) => dbRecipe.dataValues);
    
    let apiAllRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
    apiAllRecipesRaw = apiAllRecipesRaw.data.results;

    const apiAllRecipesClean = apiAllRecipesRaw.map((apiRecipe) => {
        return {
            id: apiRecipe.id,
            name: apiRecipe.title,                      // ojo name en vez de title
            image: apiRecipe.image,
            summary: apiRecipe.summary,
            healthscore: apiRecipe.healthScore,         // ojo la mayúscula y minúscula
            instructions: apiRecipe.analyzedInstructions[0].steps.map((step) => step.step),       // [0] porque analyzedInstructions es un array con sólo un elemento
            created: false
        }
    }); 

    const allRecipes = [...dbAllRecipesClean, ...apiAllRecipesClean];
    return allRecipes;
};



// nuevo. inicio.
const searchRecipesByName = async (name) => {
    // A futuro implementar que busque con mayúsculas o minúsculas y que la búsqueda no requiera ser exacta.
    const dbRecipesByNameRaw = await Recipe.findAll({ 
        where: {
             name: {
                [Op.iLike]: `%${name.toLowerCase()}%`           // nuevo
             }
        }
    });
    const dbRecipesByNameClean = dbRecipesByNameRaw.map((dbRecipe) => dbRecipe.dataValues);


    let apiAllRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
    apiAllRecipesRaw = apiAllRecipesRaw.data.results;

    const apiRecipesByNameRaw = apiAllRecipesRaw.filter((apiRecipe) => apiRecipe.title.toLowerCase().includes(name.toLowerCase()));  // nuevo. ojo name en vez de title

    const apiRecipesByNameClean = apiRecipesByNameRaw.map((apiRecipe) => {
        return {
            id: apiRecipe.id,
            name: apiRecipe.title,                      // ojo name en vez de title
            image: apiRecipe.image,
            summary: apiRecipe.summary,
            healthscore: apiRecipe.healthScore,         // ojo la mayúscula y minúscula
            instructions: apiRecipe.analyzedInstructions[0].steps.map((step) => step.step),       // [0] porque analyzedInstructions es un array con sólo un elemento
            created: false
        }
    }); 

    const recipesByName = [...dbRecipesByNameClean, ...apiRecipesByNameClean];
    return recipesByName; 
};
// nuevo. fin. 




module.exports = {
    searchRecipeById, 
    searchAllRecipes, 
    searchRecipesByName
}