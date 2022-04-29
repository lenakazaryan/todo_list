import { createAction } from "../helpers/redux";
import { Todo } from '../../Interface/Todo';

const ADD_TODO = "todoListReducer/ADD_TODO";
const DELETE_TODO = "todoListReducer/DELETE_TODO";
const UPDATE_TODO = "todoListReducer/UPDATE_TODO";
const SET_COMPLETED_TODO = "todoListReducer/SET_COMPLETED_TODO";
const SET_FILTER = "todoListReducer/SET_FILTER";

export const addTodo = createAction(ADD_TODO);
export const deleteTodo = createAction(DELETE_TODO);
export const updateTodo = createAction(UPDATE_TODO);
export const setCompleteTodo = createAction(SET_COMPLETED_TODO);
export const setFilter = createAction(SET_FILTER);

const initialState = {
  todo: [],
  filter: "",
};

const todoListReducer = (state = initialState, { type, payload }) => {
  console.log('todoListReducer', type, payload);
  
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [...state.todo, payload],
      };

    case DELETE_TODO:
      const filtered = state.todo.filter(
        (item: { id: number }) => item.id !== payload
      );
      return {
        ...state,
        todo: filtered,
      };

    case UPDATE_TODO:
      const todosCopy: Todo[] = [...state.todo];
      console.log(payload, "payload");
      todosCopy.splice(payload.id - 1, 1, payload);
      return {
        ...state,
        todo: todosCopy,
      };

    case SET_FILTER:
      return {
        ...state,
        filter: payload,
      };

    case SET_COMPLETED_TODO:
      const completed = state.todo.map(
        (item: { id: number; isCompleted: boolean }) => {
          if (payload === item.id) {
            if (item.isCompleted) {
              item.isCompleted = false;
            } else {
              item.isCompleted = true;
            }
          }
          return item;
        }
      );
      return {
        ...state,
        todo: completed,
      };
    default:
      return state;
  }
};
export default todoListReducer;
