const getRecipeByIdHandler = async (req, res) => {
    res.status(200).send('getRecipeByIdHandler');
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