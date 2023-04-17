const { Router } = require('express');
const { getRecipeByIdHandler, getRecipesHandler, createRecipeHandler } = require('../handlers/recipesHandlers');

const recipesRouter = Router(); 

recipesRouter.get('/:idRecipe', getRecipeByIdHandler);
recipesRouter.get('/', getRecipesHandler);
recipesRouter.post('/', createRecipeHandler);


module.exports = recipesRouter;