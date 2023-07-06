import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  currentPage: 1,
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};
