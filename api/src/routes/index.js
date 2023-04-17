// (api)

const { Router } = require('express');
const axios = require("axios");     // tono
require('dotenv').config();         // tono

const { API_KEY } = process.env;    // tono

const { Recipe, Diet } = require('../db.js');     // tono. importo el Modelo. A futuro modularizar. 

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);            // ??


// tono inicio
const API_URL =

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
// INSERT INTO "Recipes" (id, name, image, summary, healthscore, instructions)
// VALUES ('d936ed1c-3a3e-43b3-b013-f328e10cfa83', 'Another dish name', 'https://www.example.com/spaghetti-carbonara.jpg', 'A classic Italian dish.', '90', '1. Cook the pasta. 2. Fry.');

   
router.get('/recipes', async (req, res) => {        // puede tener query: name?=ejemplo 
    // A futuro implementar que busque con mayúsculas o minúsculas y que la búsqueda no requiera ser exacta. 
    try {
        const { name } = req.query;
        if (!name) {       // si no hay query, traer todas las recipes
            const dbAllRecipesRaw = await Recipe.findAll();
            const dbAllRecipesClean = dbAllRecipesRaw.map((dbRecipe) => dbRecipe.dataValues);

            let apiAllRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
            apiAllRecipesRaw = apiAllRecipesRaw.data.results;

            const apiAllRecipesClean = apiAllRecipesRaw.map((apiRecipe) => {
                return {
                    id: apiRecipe.id,
                    name: apiRecipe.title,                      // ojo name en vez de title
                    image: apiRecipe.image,
                    summary: apiRecipe.summary,
                    healthscore: apiRecipe.healthScore,         // ojo la mayúscula y minúscula
                    instructions: apiRecipe.analyzedInstructions,
                    created: false
                }
            }); 

            const allRecipes = [...dbAllRecipesClean, ...apiAllRecipesClean];

            return res.status(200).send(allRecipes);
        } else {            // si hay query, traer recetas filtrada por name
            const dbRecipesByNameRaw = await Recipe.findAll({ 
                where: { name }
            });
            const dbRecipesByNameClean = dbRecipesByNameRaw.map((dbRecipe) => dbRecipe.dataValues);

            let apiRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
            apiRecipesRaw = apiRecipesRaw.data.results;

            const apiRecipesByNameRaw = apiRecipesRaw.filter((apiRecipe) => apiRecipe.title === name);
            const apiRecipesByNameClean = apiRecipesByNameRaw.map((apiRecipe) => {
                return {
                    id: apiRecipe.id,
                    name: apiRecipe.title,                      // ojo name en vez de title
                    image: apiRecipe.image,
                    summary: apiRecipe.summary,
                    healthscore: apiRecipe.healthScore,         // ojo la mayúscula y minúscula
                    instructions: apiRecipe.analyzedInstructions,
                    created: false
                }
            }); 

            const allRecipesByName = [...dbRecipesByNameClean, ...apiRecipesByNameClean];

            return res.status(200).send(allRecipesByName); 
        }
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});  


// Tono: ruta 3. 
// NIY: relacionar la nueva receta con los tipos de dieta solicitados. La receta debe estar relacionada con los tipos de dieta indicados (al menos uno). Ver atributo diets en archivo Recipe.js . También rever ruta GET /recipes para que traiga también el atributo diets. 
// Para los tipos de dieta debes tener en cuenta las propiedades vegetarian, vegan y glutenFree por un lado, y también analizar las que se incluyan dentro de la propiedad diets por otro.
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



// Tono: ruta 4. 
// GET | /diets
// Obtiene un arreglo con todos los tipos de dietas existentes.
// En una primera instancia, cuando no exista ninguna dieta, deberás precargar la base de datos con las dietas de la documentación.
// Estas deben ser obtenidas de la API (se evaluará que no haya hardcodeo). Luego de obtenerlas de la API, deben ser guardadas en la base de datos para su posterior consumo desde allí.
router.get('/diets', async (req, res) => {
    try {
        // inicio copiado de ruta 2. Luego modularizar. 
        // A futuro, hacer que la petición a la API externa traiga todos los recipes, no solamente 10 (es la misma función que voy a necesitar para la ruta 2). 
        let apiRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
        apiRecipesRaw = apiRecipesRaw.data.results;
        // fin copiado de ruta 2. Luego modularizar.

        const allDiets = ["vegetarian", "vegan", "glutenFree"]; // inicializado con las propiedades mencionadas en el enunciado general. Chequear si esto se considera harcodeado o si está ok. 

        apiRecipesRaw.forEach((apiRecipe) => {
            apiRecipe.diets.forEach((diet) => {
                if(!allDiets.includes(diet)) {
                    allDiets.push(diet);
                };
            });
        });
        // console.log('allDiets: ', allDiets);
        // El arreglo allDiets tiene un elemento glutenFree y un elemento gluten Free. Rever a futuro si está ok. 

        allDiets.forEach((diet) => {
            Diet.create({
                name: diet
            });    
        });

        res.status(200).send(allDiets);     
        // res.status(200).send("NIY: arreglo con todos los tipos de dietas existentes");     
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});
// Para chequear en psql:
// SELECT * FROM "Diets";

//tono fin

module.exports = router;


