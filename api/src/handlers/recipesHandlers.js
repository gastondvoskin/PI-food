const { searchRecipeById, searchAllRecipes, searchRecipesByName, createRecipe } = require('../controllers/recipesControllers.js');


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



const createRecipeHandler = async (req, res) => {
    // NIY: creo que con diets de req.body tengo que pasarlo como argumento a una función controller que se encargue de mapear los datos del array para cargar la tabla intermedia RecipeDiet. 
    try {
        const { name, image, summary, healthscore, instructions, diets } = req.body;
        const newRecipe = await createRecipe(name, image, summary, healthscore, instructions); 
        res.status(201).send(newRecipe);     
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};



module.exports = {
    getRecipeByIdHandler,
    getRecipesHandler, 
    createRecipeHandler
}
