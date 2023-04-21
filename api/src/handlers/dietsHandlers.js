const { getDietsFromApi, getDietsFromDb } = require('../controllers/dietsControllers.js');


let sourceToGetDiets = 'api';   // it changes to db after first query

const getDietsHandler = async (req, res) => {
    try {
        let allDiets;
        if (sourceToGetDiets === 'api') {
            sourceToGetDiets = 'db';
            allDiets = await getDietsFromApi(); 
        } else {
            allDiets = await getDietsFromDb();
        };
        res.status(200).send(allDiets); 
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};




module.exports = {
    getDietsHandler
}