const { Router } = require('express');
const axios = require("axios");     // tono
require('dotenv').config();         // tono

const { API_KEY } = process.env;    // tono

const { Recipe } = require('../db.js');     // tono. importo el Modelo. A futuro modularizar. 

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);            // ??


// tono inicio


//

router.get('/recipes/:idRecipe', async (req, res) => {
    try {
        const { idRecipe } = req.params;
        const source = isNaN(idRecipe) ? "DB" : "apiExterna";       // DB tiene UUID (NaN), apiExterna tiene id numérico
        // console.log('source:' , source);

        let recipeById;
        if(source === "DB") {
            recipeById = await Recipe.findByPk(idRecipe); 
            // console.log('recipeById: ', recipeById.dataValues);
        } else {    // API externa
        // let recipeById = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`);
        // recipeById = recipeById.data; 
        }

        res.status(200).send(recipeById);        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

// Para hacer pruebas en la DB:
// \dt
// SELECT * FROM "Recipes";

// INSERT INTO "Recipes" (id, name, image, summary, healthscore, instructions)
// VALUES ('d936ed1c-3a3e-43b3-b013-f328e10cfa87', 'Spaghetti Carbonara', 'https://www.example.com/spaghetti-carbonara.jpg', 'A classic Italian dish.', '90', '1. Cook the pasta. 2. Fry.');
// INSERT INTO "Recipes" (id, name, image, summary, healthscore, instructions)
// VALUES ('d936ed1c-3a3e-43b3-b013-f328e10cfa80', 'Spaghetti Carbonara', 'https://www.example.com/spaghetti-carbonara.jpg', 'A classic Italian dish.', '90', '1. Cook the pasta. 2. Fry.');
// INSERT INTO "Recipes" (id, name, image, summary, healthscore, instructions)
// VALUES ('d936ed1c-3a3e-43b3-b013-f328e10cfa81', 'pollo', 'https://www.example.com/spaghetti-carbonara.jpg', 'A classic Italian dish.', '90', '1. Cook the pasta. 2. Fry.');
// INSERT INTO "Recipes" (id, name, image, summary, healthscore, instructions)
// VALUES ('d936ed1c-3a3e-43b3-b013-f328e10cfa82', 'Cannellini Bean and Asparagus Salad with Mushrooms', 'https://www.example.com/spaghetti-carbonara.jpg', 'A classic Italian dish.', '90', '1. Cook the pasta. 2. Fry.');



   
router.get('/recipes', async (req, res) => {        // puede tener query: name?=ejemplo 
    // A futuro implementar que busque con mayúsculas o minúsculas y que la búsqueda no requiera ser exacta. 
    try {
        const { name } = req.query;

        // implementación para la DB
        const dbRecipesByNameRaw = await Recipe.findAll({ 
            where: { name }
        });
        const dbRecipesByNameClean = dbRecipesByNameRaw.map((dbRecipe) => dbRecipe.dataValues);
        console.log('dbRecipesByNameClean: ', dbRecipesByNameClean);

        // implementación para la API externa
        let apiRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
        apiRecipesRaw = apiRecipesRaw.data.results;

        const apiRecipesByNameRaw = apiRecipesRaw.filter((apiRecipe) => apiRecipe.title === name);
        const apiRecipesByNameClean = apiRecipesByNameRaw.map((apiRecipe) => {
            return {
                id: apiRecipe.id,
                title: apiRecipe.title,
                image: apiRecipe.image,
                summary: apiRecipe.summary,
                healthscore: apiRecipe.healthScore,         // ojo la mayúscula y minúscula
                instructions: apiRecipe.analyzedInstructions,
                created: false
            }
        }); 
        console.log('apiRecipesByNameClean: ', apiRecipesByNameClean);

        // unificación de DB con API externa
        const allRecipesByName = [...dbRecipesByNameClean, ...apiRecipesByNameClean];
        console.log('allRecipesByName: ', allRecipesByName);

        // response
        res.status(200).send(allRecipesByName); 
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});  


// Tono: ruta 3. 
// NIY: relacionar la nueva receta con los tipos de dieta solicitados. La receta debe estar relacionada con los tipos de dieta indicados (al menos uno). Ver atributo diets en archivo Recipe.js . También rever ruta GET /recipes para que traiga también el atributo diets. 
router.post('/recipes', async (req, res) => {
    try {
        const { id, name, image, summary, healthscore, instructions } = req.body;
        const newRecipe = await Recipe.create({
            id, name, image, summary, healthscore, instructions
        });
        res.status(201).send("NIY: New recipe created!");     
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});




//tono fin

module.exports = router;
