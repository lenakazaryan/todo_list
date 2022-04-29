import { createAction } from "../helpers/redux";
import { AUTH_ROUTES } from "../helpers/constants";

const SET_AUTH_TAB = "userReducer/SET_AUTH_TAB";

const [LOGIN] = AUTH_ROUTES;
export const setAuthtab = createAction(SET_AUTH_TAB);

const initialState = {
  authActiveTab: LOGIN,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTH_TAB:
      return {
        ...state,
        authActiveTab: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
