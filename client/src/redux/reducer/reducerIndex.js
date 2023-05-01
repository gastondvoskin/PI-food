import { GET_RECIPES, FILTER_BY_DIET } from "../actions/actionsIndex.js";


const initialState = {
    allRecipes: [],
    filteredRecipes: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES: 
            return {
                ...state,
                allRecipes: action.payload,
                filteredRecipes: action.payload
            }
        case FILTER_BY_DIET: 
            // console.log('state.allRecipes: ', state.allRecipes);
            // console.log('state.filteredRecipes: ', state.filteredRecipes);
            // console.log('action.payload: ', action.payload);
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

            // console.log('filteredRecipesByDietsAndCreator: ', filteredRecipesByDietsAndCreator);
            return {
                ...state,
                filteredRecipes: filteredRecipesByDietsAndCreator
            }
        default:
            return {...state}
            
    };
};

export default reducer;