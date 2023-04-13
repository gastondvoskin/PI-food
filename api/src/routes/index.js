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

router.get('/recipes/:idRecipe', async (req, res) => {
    try {
        const { idRecipe } = req.params;
        const source = isNaN(idRecipe) ? "DB" : "apiExterna";       // DB tiene UUID (NaN), apiExterna tiene id numérico
        console.log('source:' , source);

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








// "https://api.spoonacular.com/recipes/{id}/information"


// localhost:3001/recipes/:idRecipe


//tono fin

module.exports = router;
