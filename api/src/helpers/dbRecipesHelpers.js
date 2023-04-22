const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe, Diet } = require('../db.js'); 

const { API_KEY } = process.env; 



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


///////////////////////////////////////////

const getAllDbRecipesRaw = async () => {
    const dbAllRecipesRaw = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: [/* 'id',  */'name'],     // id lo puedo omitir? 
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



module.exports = {
    getDbRecipeByIdClean,
    getAllDbRecipesClean,
}