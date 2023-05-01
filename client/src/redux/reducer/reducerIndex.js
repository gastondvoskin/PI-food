import { GET_RECIPES, FILTER_BY_DIET, SORT_RECIPES } from "../actions/actionsIndex.js";


const initialState = {
    allRecipes: [],
    filteredRecipes: [],
    filteredAndSortedRecipes: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES: 
            return {
                ...state,
                allRecipes: action.payload,
                filteredRecipes: action.payload,
                filteredAndSortedRecipes: action.payload
            }

        case FILTER_BY_DIET: 
            const { diet, creator } = action.payload;

            const filteredRecipesByDiet = diet === 'all'
            ? state.allRecipes
            : state.allRecipes.filter((recipe) => recipe.diets.includes(diet))

            const filteredRecipesByDietsAndCreator = creator === 'all'
            ? filteredRecipesByDiet
            : filteredRecipesByDiet.filter((recipe) => {
                if (creator === "client") {
                    return recipe.created === true;
                } else {
                    return recipe.created === false;
                }
            });

            return {
                ...state,
                filteredRecipes: filteredRecipesByDietsAndCreator
            }

        case SORT_RECIPES: 
            const { alphabet, health } = action.payload;
            // make a copy because sort method changes the original array. It also resets to none.  
            let sortedRecipesByAlphabet = [...state.filteredRecipes];
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

            console.log(sortedRecipesByAlphabetAndHealthscore);

            return {
                ...state,
                filteredAndSortedRecipes: sortedRecipesByAlphabetAndHealthscore
            }

        default:
            return {...state}
            
    };
};

export default reducer;