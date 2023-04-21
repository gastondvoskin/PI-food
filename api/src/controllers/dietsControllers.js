const axios = require("axios"); 
require('dotenv').config(); 
const { Diet } = require('../db.js'); 
const { getAllApiRecipesRaw } = require('../helpers/apiRecipesHelpers.js');

const { API_KEY } = process.env; 

const getDiets = async () => {
    // nuevo
    let apiAllRecipesRaw = await getAllApiRecipesRaw();
    console.log(apiAllRecipesRaw);

    // fin nuevo
    // let apiAllRecipesRaw = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`); 
    // apiAllRecipesRaw = apiAllRecipesRaw.data.results;
    // fin copiado de ruta 2. Luego modularizar.

    let allDiets = ['vegetarian'];
    // let allDiets = ["vegetarian", "vegan", "glutenFree"]; // inicializado con las propiedades mencionadas en el enunciado general. Chequear si esto se considera harcodeado o si está ok. 

    apiAllRecipesRaw.forEach((apiRecipe) => {
        apiRecipe.diets.forEach((diet) => {
            if(!allDiets.includes(diet)) {
                allDiets.push(diet);
            };
        });
    });
    // console.log('allDiets: ', allDiets);
    // El arreglo allDiets tiene un elemento glutenFree y un elemento gluten Free. Rever a futuro si está ok. 

    // allDiets.forEach((diet) => {
    //     Diet.create({
    //         name: diet
    //     });    
    // });

    Promise.all(allDiets.map( (diet) => {
        return Diet.findOrCreate({          // retorna una promesa
            where: {
                name: diet
            }
        })
        // .then((result) => {
        //     return result[0]; 
        // });
    }));


    console.log(allDiets);

    return(allDiets);   
};


module.exports = getDiets;


    // Consigna:
    // // Obtiene un arreglo con todos los tipos de dietas existentes.
    // En una primera instancia, cuando no exista ninguna dieta, deberás precargar la base de datos con las dietas de la documentación.
    // Estas deben ser obtenidas de la API (se evaluará que no haya hardcodeo). Luego de obtenerlas de la API, deben ser guardadas en la base de datos para su posterior consumo desde allí.
    // A futuro, chequear si para acceder a las dietas tengo que crear una nueva ruta para acceder a la tabla Diets
    // A futuro, creo que debería cambiar método create por findOrCreate para que no se carguen dos veces los mismos registros. 

