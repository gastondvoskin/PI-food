import { GET_RECIPES, FILTER_BY_DIET_AND_ALPHABET, SORT_RECIPES, GET_RECIPES_BY_NAME/* , GET_RECIPE_DETAIL */, CREATE_RECIPE } from "../actions/actionsIndex.js";       // wip: agregado: _AND_ALPHABET


const initialState = {
    allRecipes: [],
        // filteredRecipes: [],         // wip: borrar
    filteredAndSortedRecipes: [],
    // recipeDetail: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES: 
            return {
                ...state,
                allRecipes: action.payload,
                // filteredRecipes: action.payload,         // wip: borrar
                filteredAndSortedRecipes: action.payload
            }

        case FILTER_BY_DIET_AND_ALPHABET:               // wip: agregado: _AND_ALPHABET
            const { diet, creator } = action.payload;

            const filteredRecipesByDiet = diet === 'all'
            ? [...state.allRecipes]                     // wip: copia del valor en vez de copia de la referencia
            : state.allRecipes.filter((recipe) => recipe.diets.includes(diet))

            const filteredRecipesByDietsAndCreator = creator === 'all'
            ? [...filteredRecipesByDiet]                // wip: copia del valor en vez de copia de la referencia. en este caso es sólo para no borrar variable anterior, aunque es prescindible. 
            : filteredRecipesByDiet.filter((recipe) => {
                if (creator === "client") {
                    return recipe.created === true;
                } else {
                    return recipe.created === false;
                }
            });

            return {
                ...state,
                filteredAndSortedRecipes: [...filteredRecipesByDietsAndCreator]          // wip: copia del valor en vez de copia de la referencia. en este caso es sólo para no borrar variable anterior, aunque es prescindible. 
            }

        case SORT_RECIPES: 
            const { alphabet, health } = action.payload;
            // make a copy because sort method changes the original array. It also resets to none.  
            let sortedRecipesByAlphabet = [...state.filteredRecipes];               // modificar filteredRecipes por filteredAnd... 
            if (alphabet === 'asc') {
                sortedRecipesByAlphabet.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }); 
            } else if (alphabet === 'desc') {
                sortedRecipesByAlphabet.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });             
            };

            let sortedRecipesByAlphabetAndHealthscore = sortedRecipesByAlphabet;
            if (health === 'asc') {
                sortedRecipesByAlphabetAndHealthscore.sort((a, b) => {
                    if (a.healthscore < b.healthscore) return -1;
                    if (a.healthscore > b.healthscore) return 1;
                    return 0;
                }); 
            } else if (health === 'desc') {
                sortedRecipesByAlphabetAndHealthscore.sort((a, b) => {
                    if (a.healthscore > b.healthscore) return -1;
                    if (a.healthscore < b.healthscore) return 1;
                    return 0;
                }); 
            };

            return {
                ...state,
                filteredAndSortedRecipes: sortedRecipesByAlphabetAndHealthscore
            }

        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                filteredAndSortedRecipes: action.payload
            }
                        
            
        // Implementación del Componente Detail con Redux (lo reemplacé por local state)
        // case GET_RECIPE_DETAIL: 
        //     return {
        //         ...state,
        //         recipeDetail: action.payload
        //     }
        
        case CREATE_RECIPE:
            return {
                ...state,
                // es innecesario modificar el state porque para ver las recipes hay que ir al Home (salir del Form) que se rerenderiza. 
                // allRecipes: [...state.allRecipes, action.payload]        
            }
        
        default:
            return {...state}
            
    };
};

export default reducer;