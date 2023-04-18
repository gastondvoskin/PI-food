const { searchRecipeById, searchAllRecipes, searchRecipesByName } = require('../controllers/recipesControllers.js');


const getRecipeByIdHandler = async (req, res) => {
    try {
        const id = req.params.idRecipe;
        const recipeById = await searchRecipeById(id);
        res.status(200).send(recipeById);        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};





// nuevo. inicio.
const getRecipesHandler = async (req, res) => {
    try {
        const { name } = req.query;
        // nuevo inicio
        if (!name) {        // si no hay query, trae todas las recetas
            const allRecipes = await searchAllRecipes();
            res.status(200).send(allRecipes);
        } else {            // si hay query, trae las recetas que coinciden con el name
            const recipesByName = await searchRecipesByName();
            res.status(200).send(recipesByName);
        }
    } catch (error) {
        res.status(400).send({error: error.message});
    }
        // nuevo fin

    //     if (!name) {       // si no hay query, traer todas las recipes
    //         const dbAllRecipesRaw = await Recipe.findAll();
    //         const dbAllRecipesClean = dbAllRecipesRaw.map((dbRecipe) => dbRecipe.dataValues);

    //         let apiAllRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
    //         apiAllRecipesRaw = apiAllRecipesRaw.data.results;

    //         const apiAllRecipesClean = apiAllRecipesRaw.map((apiRecipe) => {
    //             return {
    //                 id: apiRecipe.id,
    //                 name: apiRecipe.title,                      // ojo name en vez de title
    //                 image: apiRecipe.image,
    //                 summary: apiRecipe.summary,
    //                 healthscore: apiRecipe.healthScore,         // ojo la mayúscula y minúscula
    //                 instructions: apiRecipe.analyzedInstructions,
    //                 created: false
    //             }
    //         }); 

    //         const allRecipes = [...dbAllRecipesClean, ...apiAllRecipesClean];
    //         return res.status(200).send(allRecipes);


    //     } else {            // si hay query, traer recetas filtrada por name
    //         const dbRecipesByNameRaw = await Recipe.findAll({ 
    //             where: { name }
    //         });
    //         const dbRecipesByNameClean = dbRecipesByNameRaw.map((dbRecipe) => dbRecipe.dataValues);

    //         let apiRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
    //         apiRecipesRaw = apiRecipesRaw.data.results;

    //         const apiRecipesByNameRaw = apiRecipesRaw.filter((apiRecipe) => apiRecipe.title === name);
    //         const apiRecipesByNameClean = apiRecipesByNameRaw.map((apiRecipe) => {
    //             return {
    //                 id: apiRecipe.id,
    //                 name: apiRecipe.title,                      // ojo name en vez de title
    //                 image: apiRecipe.image,
    //                 summary: apiRecipe.summary,
    //                 healthscore: apiRecipe.healthScore,         // ojo la mayúscula y minúscula
    //                 instructions: apiRecipe.analyzedInstructions,
    //                 created: false
    //             }
    //         }); 

    //         const allRecipesByName = [...dbRecipesByNameClean, ...apiRecipesByNameClean];

    //         return res.status(200).send(allRecipesByName); 
    //     }
    // } catch (error) {
    //     res.status(400).send({error: error.message});
    // }

};
// nuevo. fin.







const createRecipeHandler = (req, res) => {
    res.status(200).send('createRecipeHandler');
};



module.exports = {
    getRecipeByIdHandler,
    getRecipesHandler, 
    createRecipeHandler
}
