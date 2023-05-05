import { 
    GET_RECIPES, GET_RECIPES_BY_NAME, GET_DIETS, CREATE_RECIPE, 
    FILTER_BY_DIET, FILTER_BY_CREATOR, RESET_FILTERS, 
    SORT_RECIPES_BY_ALPHABET, SORT_RECIPES_BY_HEALTHSCORE, 
    /* GET_RECIPE_DETAIL */ 
} from "../actions/actionsIndex.js"; 


const initialState = {
    allRecipes: [],
    filteredAndSortedRecipes: [],
    diets: []
    // recipeDetail: {}         // OLD (implementation replaced by localState)
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        // getRecipes (all)
        case GET_RECIPES: 
            return {
                ...state,
                allRecipes: action.payload,
                filteredAndSortedRecipes: action.payload
            }

        // getRecipesByName (filter in back)
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                filteredAndSortedRecipes: action.payload
            }

        // getDiets             // new
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }

        // createRecipe 
        case CREATE_RECIPE:
            console.log('action.payload: ', action.payload);
            return {
                ...state,
                allRecipes: [...state.allRecipes, action.payload]        
            }

                    
        // filters
        case FILTER_BY_DIET: 
            const filterDiet = action.payload;        // 'A-Z'

            const filteredRecipesByDiet = filterDiet === 'all'
            ? [...state.allRecipes] 
            : state.allRecipes.filter((recipe) => recipe.diets.includes(filterDiet))

            return {
                ...state,
                filteredAndSortedRecipes: [...filteredRecipesByDiet] 
            }


        case FILTER_BY_CREATOR: 
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
        case SORT_RECIPES_BY_ALPHABET: 
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
                filteredAndSortedRecipes: sortedRecipesByAlphabet  
            }


        case SORT_RECIPES_BY_HEALTHSCORE:  
            const sortHealth = action.payload;

            let sortedRecipesByHealthscore = [...state.filteredAndSortedRecipes]; 
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

        
        // default
        default:
            return {...state}
            
    };
};

export default reducer;




//////////////
// OLD getRecipeDetail (replaced for local state implementation)
// case GET_RECIPE_DETAIL: 
//     return {
//         ...state,
//         recipeDetail: action.payload
//     }
