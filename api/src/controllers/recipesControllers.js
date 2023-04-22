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
    const apiAllRecipesClean = await getAllApiRecipesClean();
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
    return recipesByName; 
};



const createRecipe = async (name, image, summary, healthscore, steps, diets) => {
    const newRecipe = await Recipe.create({
        name, image, summary, healthscore, steps
    });

    // selene. inicio. sin chequear. 
    let dietsDb = await Diet.findAll({
        where: {
            name: diets     // y si diets es un [] ???
        }
    });

    newRecipe.addDiets(dietsDb);   
    // falta relaciona con propiedad vegetarian
    // no requiere await???
    // selene. fin. sin chequear. 

    return newRecipe;
};





module.exports = {
    searchRecipeById, 
    searchAllRecipes, 
    searchRecipesByName,
    createRecipe
}