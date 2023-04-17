const { searchRecipeById } = require('../controllers/recipesControllers.js');


const getRecipeByIdHandler = async (req, res) => {
    try {
        const id = req.params.idRecipe;
        const recipeById = await searchRecipeById(id);
        res.status(200).send(recipeById);        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const getRecipesHandler = (req, res) => {
    res.status(200).send('getRecipesHandler');

};

const createRecipeHandler = (req, res) => {
    res.status(200).send('createRecipeHandler');
};



module.exports = {
    getRecipeByIdHandler,
    getRecipesHandler, 
    createRecipeHandler
}
