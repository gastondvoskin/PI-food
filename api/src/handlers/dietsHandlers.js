const getDiets = require('../controllers/dietsControllers.js');

const getDietsHandler = async (req, res) => {
    try {
        const diets = await getDiets();
        res.status(200).send(diets);  
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};




module.exports = {
    getDietsHandler
}