const axios = require("axios"); 
require('dotenv').config(); 
const { Recipe, Diet } = require('../db.js'); 
const { Op } = require('sequelize');
const { getAllDbRecipesClean, getAllApiRecipesClean } = require('../helpers/helpers.js');

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


const searchAllRecipes = async () => {
    const dbAllRecipesClean = await getAllDbRecipesClean();
    const apiAllRecipesClean = await getAllApiRecipesClean();
    const allRecipes = [...dbAllRecipesClean, ...apiAllRecipesClean];
    return allRecipes;
};
    // Comentado porque ya se modularizó en helpers.js
    // // A futuro implementar que no retorne sólo 10 recetas. 
    // // nuevo modificaciones
    // const dbAllRecipesRaw = await Recipe.findAll({
    //     include: {
    //         model: Diet,
    //         attributes: ['id', 'name'],     // id lo puedo omitir? 
    //         through: {
    //             attributes: []
    //         }
    //     }
    // }); 
    // // fin modificaciones
    // const dbAllRecipesClean = dbAllRecipesRaw.map((dbRecipe) => dbRecipe.dataValues);
    

    // let apiAllRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
    // apiAllRecipesRaw = apiAllRecipesRaw.data.results;

    // const apiAllRecipesClean = apiAllRecipesRaw.map((apiRecipe) => {
    //     return {
    //         id: apiRecipe.id,
    //         name: apiRecipe.title,                      // ojo name en vez de title
    //         image: apiRecipe.image,
    //         summary: apiRecipe.summary,
    //         healthscore: apiRecipe.healthScore,         // ojo la mayúscula y minúscula
    //         instructions: apiRecipe.analyzedInstructions[0].steps.map((step) => step.step),       // [0] porque analyzedInstructions es un array con sólo un elemento
    //         created: false
    //     }
    // }); 

    // const allRecipes = [...dbAllRecipesClean, ...apiAllRecipesClean];
    // return allRecipes;
// };



const searchRecipesByName = async (name) => {
    const allRecipes = await searchAllRecipes();
    const recipesByName = allRecipes.filter((recipe) => recipe.name.toLowerCase().includes(name.toLowerCase()));
    return recipesByName; 
    // const dbRecipesByNameRaw = await Recipe.findAll({ 
    //     where: {
    //          name: {
    //             [Op.iLike]: `%${name.toLowerCase()}%`           // nuevo
    //          }
    //     }
    // });
    // const dbRecipesByNameClean = dbRecipesByNameRaw.map((dbRecipe) => dbRecipe.dataValues);


    // let apiAllRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
    // apiAllRecipesRaw = apiAllRecipesRaw.data.results;

    // const apiRecipesByNameRaw = apiAllRecipesRaw.filter((apiRecipe) => apiRecipe.title.toLowerCase().includes(name.toLowerCase()));  // nuevo. ojo name en vez de title

    // const apiRecipesByNameClean = apiRecipesByNameRaw.map((apiRecipe) => {
    //     return {
    //         id: apiRecipe.id,
    //         name: apiRecipe.title,                      // ojo name en vez de title
    //         image: apiRecipe.image,
    //         summary: apiRecipe.summary,
    //         healthscore: apiRecipe.healthScore,         // ojo la mayúscula y minúscula
    //         instructions: apiRecipe.analyzedInstructions[0].steps.map((step) => step.step),       // [0] porque analyzedInstructions es un array con sólo un elemento
    //         created: false
    //     }
    // }); 

    // const recipesByName = [...dbRecipesByNameClean, ...apiRecipesByNameClean];
    // return recipesByName; 
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