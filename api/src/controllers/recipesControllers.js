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
        // console.log('aca... ');

        // console.log('name... ', name);
        // console.log('name.toLowerCase()... ', name.toLowerCase());

        // console.log('recipe... ', recipe);
        // console.log('recipe.name... ', recipe.name);
        // console.log('recipe.name.toLowerCase()... ', recipe.name.toLowerCase());
        // console.log('recipe.name.toLowerCase().includes(name.toLowerCase())... ', recipe.name.toLowerCase().includes(name.toLowerCase()));
        if (recipe.name) {
            return recipe.name.toLowerCase().includes(name.toLowerCase());
        }
    });
    return recipesByName; 
};



const createRecipe = async (name, image, summary, healthscore, instructions) => {
    // NIY: relacionar la nueva receta con los tipos de dieta solicitados. La receta debe estar relacionada con los tipos de dieta indicados (al menos uno). Ver atributo diets en archivo Recipe.js . También rever ruta GET /recipes para que traiga también el atributo diets. 
    // Para los tipos de dieta debes tener en cuenta las propiedades vegetarian, vegan y glutenFree por un lado, y también analizar las que se incluyan dentro de la propiedad diets por otro.
    const newRecipe = await Recipe.create({
        name, image, summary, healthscore, instructions
    });
    return newRecipe;
};



module.exports = {
    searchRecipeById, 
    searchAllRecipes, 
    searchRecipesByName,
    createRecipe
}