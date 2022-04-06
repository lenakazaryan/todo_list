import { createAction } from "../../helpers/redux";
const SET_USER = "userReducer/SET_USER";

export const setUser = createAction(SET_USER);

const initialState = {
  user: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default userReducer;