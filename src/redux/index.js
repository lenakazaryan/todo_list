import {combineReducers} from "redux";
import todoListReducer from "./ducks/todoDuck";
import userReducer from "./ducks/userDuck";
import authReducer from "./ducks/authDuck";

const rootReducer = combineReducers({
    todoListReducer,
    userReducer,
    authReducer
})

export default rootReducer
