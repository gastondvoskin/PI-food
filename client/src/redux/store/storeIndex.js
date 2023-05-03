import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer/reducerIndex.js";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;         // typo corrected: EXTENSION INSTEAD OF EXTENSIONS
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));


export default store; 