const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe, Diet } = require('../db.js'); 

const { API_KEY } = process.env; 


// objeto para los helpers getDbRecipeByIdRaw y getAllDbRecipesRaw
const includeObject = {
    include: {
        model: Diet,
        attributes: ['name'], 
        through: {
            attributes: []
        }
    } 
}

///////////////////////////////////////////

const getDbRecipeByIdRaw = async (id) => {
    const dbRecipeByIdRaw = await Recipe.findByPk(id, includeObject);
    if (!dbRecipeByIdRaw) throw Error('There is no recipe with this id'); 
    return dbRecipeByIdRaw;
};

const cleanDbRecipe = (dbRecipeRaw) => {
    const { id, name, image, summary, healthscore, steps, created, Diets } = dbRecipeRaw;   
    const diets = Diets.map((diet) => diet.name);   // para reemplazar Diets (array de objetos) por diets (array de strings, igual que en api)
    
    const dbRecipeByIdClean = {id, name, image, summary, healthscore, steps, diets, created};
    return dbRecipeByIdClean;
}; 


const getDbRecipeByIdClean = async (id) => {
    const dbRecipeByIdRaw = await getDbRecipeByIdRaw(id);
    const dbRecipeByIdClean = cleanDbRecipe(dbRecipeByIdRaw);
    return dbRecipeByIdClean;
};

///////////////////////////////////////////
///////////////////////////////////////////

const getAllDbRecipesRaw = async () => {
    const dbAllRecipesRaw = await Recipe.findAll(includeObject); 
    return dbAllRecipesRaw;
}

const cleanAllDbRecipes = (allDbRecipesRaw) => {
    // const dbAllRecipesClean = allDbRecipesRaw.map((dbRecipe) => dbRecipe.dataValues);
    // return dbAllRecipesClean;
    const dbAllRecipesClean = allDbRecipesRaw.map((dbRecipeRaw) => cleanDbRecipe(dbRecipeRaw));
    return dbAllRecipesClean;
}


const getAllDbRecipesClean = async () => {
    const dbAllRecipesRaw = await getAllDbRecipesRaw();
    const dbAllRecipesClean = cleanAllDbRecipes(dbAllRecipesRaw);
    return dbAllRecipesClean;
};



module.exports = {
    getDbRecipeByIdClean,
    getAllDbRecipesClean,
};