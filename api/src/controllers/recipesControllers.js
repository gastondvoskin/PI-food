const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe, Diet } = require('../db.js'); 
const { Op } = require('sequelize');
const { getDbRecipeByIdClean, getAllDbRecipesClean } = require('../helpers/dbRecipesHelpers.js');
const { getApiRecipeByIdClean, getAllApiRecipesClean } = require('../helpers/apiRecipesHelpers.js');


const { API_KEY } = process.env; 


const searchRecipeById = async (id) => {
    const source = isNaN(id) ? 'DB' : 'apiExterna'; 
    let recipeByIdClean; 
    if (source === "DB") {
        const dbRecipeByIdClean = await getDbRecipeByIdClean(id);
        return dbRecipeByIdClean;
    } 
    if (source === 'apiExterna') {
        const apiAllRecipesClean = getApiRecipeByIdClean(id);
        return apiAllRecipesClean;
    }
    return recipeByIdClean;
};


const searchAllRecipes = async () => {
    const dbAllRecipesClean = await getAllDbRecipesClean();
    // const apiAllRecipesClean = await getAllApiRecipesClean();           // comentado para desarrollar filters del front-end sin hacer requests a la api. a futuro, descomentar y comentar línea de abajo    ------------------------------------------------>>>>>>>>>>>>>>>>>>>>>> ATENCION!!!!!!!!!!!!!!!!
    const apiAllRecipesClean = [];
    const allRecipes = [...dbAllRecipesClean, ...apiAllRecipesClean];
    return allRecipes;
};


const searchRecipesByName = async (name) => {
    const allRecipes = await searchAllRecipes();
    const recipesByName = allRecipes.filter((recipe) => {
        if (recipe.name) {
            return recipe.name.toLowerCase().includes(name.toLowerCase());
        }
    });
    if (!recipesByName.length) throw Error('There are no recipes with this name');
    return recipesByName; 
};



const createRecipe = async (name, image, summary, healthscore, steps, diets) => {
    const newRecipe = await Recipe.create({
        name, image, summary, healthscore, steps
    });
    // selecciono los registros en tabla Diet (instancias de Diet) cuyos nombres estén contenidos en el array diets
    const dietsArrOfObjFromDb = await Diet.findAll({      
        where: {
            name: diets     
        }
    });
    await newRecipe.addDiets(dietsArrOfObjFromDb);
    return newRecipe;
    // return 'Recipe created';
};



module.exports = {
    searchRecipeById, 
    searchAllRecipes, 
    searchRecipesByName,
    createRecipe
};