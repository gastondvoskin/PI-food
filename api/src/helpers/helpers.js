const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe, Diet } = require('../db.js'); 
const { Op } = require('sequelize');

const { API_KEY } = process.env; 


////
const getDbRecipeByIdRaw = async (id) => {
    const dbRecipeByIdRaw = await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['id', 'name'],     // id lo puedo omitir? 
            through: {
                attributes: []
            }
        } 
    });
    return dbRecipeByIdRaw;
};

const cleanDbRecipe = (dbRecipeRaw) => {
    const dbRecipeByIdClean = dbRecipeRaw.dataValues;
    return dbRecipeByIdClean;
}; 

const getDbRecipeByIdClean = async (id) => {
    const dbRecipeByIdRaw = await getDbRecipeByIdRaw(id);
    const dbRecipeByIdClean = cleanDbRecipe(dbRecipeByIdRaw);
    return dbRecipeByIdClean;
};


////

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

const cleanAllDbRecipes = (allDbRecipesRaw) => {
    const dbAllRecipesClean = allDbRecipesRaw.map((dbRecipe) => dbRecipe.dataValues);
    return dbAllRecipesClean;
}

const getAllDbRecipesClean = async () => {
    const dbAllRecipesRaw = await getAllDbRecipesRaw();
    const dbAllRecipesClean = cleanAllDbRecipes(dbAllRecipesRaw);
    return dbAllRecipesClean;
};


///////////////////////////////////////////
////
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
////



const getAllApiRecipesRaw = async () => {
    let apiAllRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
    apiAllRecipesRaw = apiAllRecipesRaw.data.results;
    return apiAllRecipesRaw;
};

const cleanAllApiRecipes = (allApiRecipesRaw) => {
    const apiAllRecipesClean = allApiRecipesRaw.map((apiRecipeRaw) => {
        const apiRecipeClean = cleanApiRecipe(apiRecipeRaw);
        return apiRecipeClean;
        // return {
            // id: apiRecipe.id,
            // name: apiRecipe.title,                      // ojo name en vez de title
            // image: apiRecipe.image,
            // summary: apiRecipe.summary,
            // healthscore: apiRecipe.healthScore,         // ojo la mayúscula y minúscula
            // instructions: apiRecipe.analyzedInstructions[0].steps.map((step) => step.step),       // [0] porque analyzedInstructions es un array con sólo un elemento
            // created: false
        // }
    }); 
    return apiAllRecipesClean;
};


const getAllApiRecipesClean = async () => {
    const apiAllRecipesRaw = await getAllApiRecipesRaw();
    const apiAllRecipesClean = cleanAllApiRecipes(apiAllRecipesRaw);
    return apiAllRecipesClean;
};

////



module.exports = {
    getDbRecipeByIdClean,
    getApiRecipeByIdClean, 
    getAllDbRecipesClean,
    getAllApiRecipesClean
}