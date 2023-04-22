const axios = require("axios"); 
require('dotenv').config(); 
const { Diet } = require('../db.js'); 
const { getAllApiRecipesRaw } = require('../helpers/apiRecipesHelpers.js');

const { API_KEY } = process.env; 



const getDietsFromApi = async () => {
    let apiAllRecipesRaw = await getAllApiRecipesRaw();

    let allDiets = ['vegetarian'];      // ["vegetarian", "vegan", "glutenFree"] ?

    apiAllRecipesRaw.forEach((apiRecipe) => {
        apiRecipe.diets.forEach((diet) => {
            if(!allDiets.includes(diet)) {
                allDiets.push(diet);
            };
        });
    });

    // console.log(1);

    for (let diet of allDiets) {        // sería más óptimo Promise.all y map
        await Diet.findOrCreate({
            where: {
                name: diet
            }
        }); 
    }
    // console.log(2);


    return(allDiets);   
};


const getDietsFromDb = async () => {
    let allDietsRaw = await Diet.findAll({
        attributes: ['name'],
        order: [['name', 'ASC']]
    });

    const allDietsClean = allDietsRaw.map((diet) => diet.dataValues.name);

    return allDietsClean;
};



module.exports = {
    getDietsFromApi, 
    getDietsFromDb
};


    // Promise.all(allDiets.map( (diet) => {
    //     return Diet.findOrCreate({          // retorna una promesa
    //         where: {
    //             name: diet
    //         }
    //     })
    //     // .then((result) => {
    //     //     return result[0]; 
    //     // });
    // }));




