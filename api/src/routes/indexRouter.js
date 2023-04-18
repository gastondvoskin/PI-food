// (api)

const { Router } = require('express');

const recipesRouter = require('./recipesRouter.js');
const dietsRouter = require('./dietsRouter.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);            // ??

// tono inicio

// están creados los archivos en los que voy a modularizar index.js pero todavía no les pasé el código de este archivo index a los handlers. 
mainRouter.use('/recipes', recipesRouter); 
mainRouter.use('/diets', dietsRouter);


// Tono: ruta 4. 
// GET | /diets
// Obtiene un arreglo con todos los tipos de dietas existentes.
// En una primera instancia, cuando no exista ninguna dieta, deberás precargar la base de datos con las dietas de la documentación.
// Estas deben ser obtenidas de la API (se evaluará que no haya hardcodeo). Luego de obtenerlas de la API, deben ser guardadas en la base de datos para su posterior consumo desde allí.
mainRouter.get('/diets', async (req, res) => {
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

module.exports = mainRouter;


