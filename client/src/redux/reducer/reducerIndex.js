import { GET_RECIPES, FILTER_BY_DIET, FILTER_BY_CREATOR, RESET_FILTERS, SORT_RECIPES_BY_ALPHABET, SORT_RECIPES_BY_HEALTHSCORE, GET_RECIPES_BY_NAME/* , GET_RECIPE_DETAIL */, CREATE_RECIPE } from "../actions/actionsIndex.js"; 
// wip SORT_RECIPES_BY_HEALTHSCORE


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
                filteredAndSortedRecipes: action.payload
            }

        // Filters
        // original
        // case FILTER_BY_DIET_AND_ALPHABET: 
        //     const { diet, creator } = action.payload;

        //     const filteredRecipesByDiet = diet === 'all'
        //     ? [...state.allRecipes] 
        //     : state.allRecipes.filter((recipe) => recipe.diets.includes(diet))

        //     const filteredRecipesByDietsAndCreator = creator === 'all'
        //     ? [...filteredRecipesByDiet] 
        //     : filteredRecipesByDiet.filter((recipe) => {
        //         if (creator === "client") {
        //             return recipe.created === true;
        //         } else {
        //             return recipe.created === false;
        //         }
        //     });

        //     return {
        //         ...state,
        //         filteredAndSortedRecipes: [...filteredRecipesByDietsAndCreator] 
        //     }
        

        case FILTER_BY_DIET: 
            // const { diet, creator } = action.payload;
            const filterDiet = action.payload;        // 'A-Z'

            const filteredRecipesByDiet = filterDiet === 'all'
            ? [...state.allRecipes] 
            : state.allRecipes.filter((recipe) => recipe.diets.includes(filterDiet))

            return {
                ...state,
                filteredAndSortedRecipes: [...filteredRecipesByDiet] 
            }

        case FILTER_BY_CREATOR: 
            // const { diet, creator } = action.payload;
            const filterCreator = action.payload;        // 'client'

            const filteredRecipesByCreator = filterCreator === 'all'
            ? [...state.allRecipes] 
            : state.allRecipes.filter((recipe) => {
                if (filterCreator === "client") {
                    return recipe.created === true;
                } else {
                    return recipe.created === false;
                }
            });

            return {
                ...state,
                filteredAndSortedRecipes: [...filteredRecipesByCreator] 
            }


        
        case RESET_FILTERS:
            const filteredAndSortedRecipes = state.allRecipes;
            return {
                ...state,
                filteredAndSortedRecipes
            }



        // Sorts
        case SORT_RECIPES_BY_ALPHABET:              // wip: _BY_ALPHABET
            const sortAlphabet = action.payload;        // 'A-Z'
            // console.log(sortAlphabet)
            let sortedRecipesByAlphabet = [...state.filteredAndSortedRecipes]; 
            if (sortAlphabet === 'A-Z') {                   // wip A-Z
                console.log('aca');
                sortedRecipesByAlphabet.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }); 
            } else if (sortAlphabet === 'Z-A') {            // wip Z-A
                sortedRecipesByAlphabet.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });             
            };

            return {
                ...state,
                filteredAndSortedRecipes: sortedRecipesByAlphabet           // wip sin healtscore
            }

        case SORT_RECIPES_BY_HEALTHSCORE:                                        // wip: nuevo case
            const sortHealth = action.payload;

            let sortedRecipesByHealthscore = [...state.filteredAndSortedRecipes];       // wip sin Alphabet
            if (sortHealth === 'healthyFirst') {
                sortedRecipesByHealthscore.sort((a, b) => {
                    if (a.healthscore < b.healthscore) return -1;
                    if (a.healthscore > b.healthscore) return 1;
                    return 0;
                }); 
            } else if (sortHealth === 'unhealthyFirst') {
                sortedRecipesByHealthscore.sort((a, b) => {
                    if (a.healthscore > b.healthscore) return -1;
                    if (a.healthscore < b.healthscore) return 1;
                    return 0;
                }); 
            };

            return {
                ...state,
                filteredAndSortedRecipes: sortedRecipesByHealthscore
            }


        // Filter by name (filtered in the back)
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
        

        // Create a recipe
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