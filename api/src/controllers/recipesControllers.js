const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe, Diet } = require('../db.js'); 
const { getDbRecipeByIdClean, getAllDbRecipesClean } = require('../helpers/dbRecipesHelpers.js');
const { getApiRecipeByIdClean, getAllApiRecipesClean } = require('../helpers/apiRecipesHelpers.js');


const searchAllRecipes = async () => {
    const dbAllRecipesClean = await getAllDbRecipesClean();

////////////////////    !!!!!!!!!!!!!!!!!!!! ///////////////////////
    // to fetch data from Spoonacular: comment next line and uncomment the following to that. 

    // const apiAllRecipesClean = []; 
    const apiAllRecipesClean = await getAllApiRecipesClean();

////////////////////    !!!!!!!!!!!!!!!!!!!! ///////////////////////

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

    // recipeWithDiets is created to display in the front-end form with the diets after submitting. 
    const recipeWithDiets = {
        name, image, summary, healthscore, steps, diets
    };
    return recipeWithDiets;
};



module.exports = {
    searchAllRecipes, 
    searchRecipesByName,
    searchRecipeById, 
    createRecipe
};