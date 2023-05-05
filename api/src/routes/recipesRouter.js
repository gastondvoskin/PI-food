const { Router } = require('express');
const { getRecipeByIdHandler, getRecipesHandler, createRecipeHandler } = require('../handlers/recipesHandlers');

const recipesRouter = Router(); 

recipesRouter.get('/', getRecipesHandler);
recipesRouter.get('/:idRecipe', getRecipeByIdHandler);
recipesRouter.post('/', createRecipeHandler);


module.exports = recipesRouter;