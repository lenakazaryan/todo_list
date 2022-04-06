import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./index";
import { createStore } from 'redux';
export const store = createStore(rootReducer, composeWithDevTools());
