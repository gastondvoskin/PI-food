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




const getRecipesHandler = async (req, res) => {
    try {
        const { name } = req.query;
        // nuevo inicio
        if (!name) {        // si no hay query, trae todas las recetas
            const allRecipes = await searchAllRecipes();
            res.status(200).send(allRecipes);
        } else {            // si hay query, trae las recetas que coinciden con el name
            const recipesByName = await searchRecipesByName(name);
            res.status(200).send(recipesByName);
        }
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};



const createRecipeHandler = (req, res) => {
    res.status(200).send('createRecipeHandler');
};



module.exports = {
    getRecipeByIdHandler,
    getRecipesHandler, 
    createRecipeHandler
}
