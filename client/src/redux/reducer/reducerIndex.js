import { GET_RECIPES } from "../actions/actionsIndex.js";

const initialState = {
    recipes: [],
    recipeDetail: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES: 
            return {
                ...state,
                recipes: action.payload
            }
        default:
            return {...state}
            
    };
};

export default reducer;