const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe, Diet } = require('../db.js'); 
const { Op } = require('sequelize');

const { API_KEY } = process.env; 


const getAllDbRecipesRaw = async () => {
    const dbAllRecipesRaw = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['id', 'name'],     // id lo puedo omitir? 
            through: {
                attributes: []
            }
        }
    }); 
    return dbAllRecipesRaw;
}


const cleanDbRecipes = (dbRecipesRaw) => {
    const dbRecipesClean = dbRecipesRaw.map((dbRecipe) => dbRecipe.dataValues);
    return dbRecipesClean;
}

const getAllDbRecipesClean = async () => {
    const dbAllRecipesRaw = await getAllDbRecipesRaw();
    const dbAllRecipesClean = cleanDbRecipes(dbAllRecipesRaw);
    return dbAllRecipesClean;
};

////
const getAllApiRecipesRaw = async () => {
    let apiAllRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
    apiAllRecipesRaw = apiAllRecipesRaw.data.results;
    return apiAllRecipesRaw;
};

const cleanApiRecipes = (apiRecipesRaw) => {
    const apiRecipesClean = apiRecipesRaw.map((apiRecipe) => {
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
    return apiRecipesClean;
};

const getAllApiRecipesClean = async () => {
    const apiAllRecipesRaw = await getAllApiRecipesRaw();
    const apiAllRecipesClean = cleanApiRecipes(apiAllRecipesRaw);
    return apiAllRecipesClean;
};

////



module.exports = {
    getAllDbRecipesClean,
    getAllApiRecipesClean
}