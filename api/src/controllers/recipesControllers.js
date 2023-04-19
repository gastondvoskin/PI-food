const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe, Diet } = require('../db.js'); 
const { Op } = require('sequelize');
const { getDbRecipeByIdClean, getApiRecipeByIdClean, getAllDbRecipesClean, getAllApiRecipesClean } = require('../helpers/helpers.js');

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
        // let recipeByIdRaw = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        // recipeByIdRaw = recipeByIdRaw.data; 

        // // console.log(recipeByIdRaw);


        // const recipeByIdClean = cleanApiRecipes([recipeByIdRaw]);

        // recipeByIdClean = {
        //     id: recipeByIdRaw.id,
        //     name: recipeByIdRaw.title,      // ojo name y title 
        //     image: recipeByIdRaw.image,
        //     summary: recipeByIdRaw.summary,
        //     healthscore: recipeByIdRaw.healthScore,     // ojo mayúscula y minúscula
        //     instructions: recipeByIdRaw.instructions,
        //     created: false
        // }

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
    const recipesByName = allRecipes.filter((recipe) => recipe.name.toLowerCase().includes(name.toLowerCase()));
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