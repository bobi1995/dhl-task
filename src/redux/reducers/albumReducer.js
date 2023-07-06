import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  albums: [],
  favourites: [],
};

export const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ALBUMS:
      return {
        ...state,
        albums: action.payload,
      };
    case ActionTypes.ADD_FAVOURITE:
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    case ActionTypes.REMOVE_FAVOURITE:
      return {
        ...state,
        favourites: state.favourites.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
