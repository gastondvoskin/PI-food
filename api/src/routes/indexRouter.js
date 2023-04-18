// (api)

const { Router } = require('express');

const recipesRouter = require('./recipesRouter.js');
const dietsRouter = require('./dietsRouter.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

// Configurar los routers
mainRouter.use('/recipes', recipesRouter); 
mainRouter.use('/diets', dietsRouter);



module.exports = mainRouter;


