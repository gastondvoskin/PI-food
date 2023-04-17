const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe } = require('../db.js'); 

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



module.exports = {
    searchRecipeById
}