const { searchAllRecipes, searchRecipesByName, searchRecipeById, createRecipe } = require('../controllers/recipesControllers.js');


const getRecipesHandler = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) { 
            const allRecipes = await searchAllRecipes();
            res.status(200).send(allRecipes);
        } 
        if (name) {  
            const recipesByName = await searchRecipesByName(name);
            res.status(200).send(recipesByName);
        }
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getRecipeByIdHandler = async (req, res) => {
    try {
        const id = req.params.idRecipe;
        const recipeById = await searchRecipeById(id);
        res.status(200).send(recipeById);        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};



const createRecipeHandler = async (req, res) => {
    try {
        const { name, image, summary, healthscore, steps, diets } = req.body;
        const recipeWithDiets = await createRecipe(name, image, summary, healthscore, steps, diets); 
        res.status(201).send(recipeWithDiets);     
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};



module.exports = {
    getRecipesHandler, 
    getRecipeByIdHandler,
    createRecipeHandler
};
