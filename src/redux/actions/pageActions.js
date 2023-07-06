import { ActionTypes } from "../constants/actionTypes";

export const setPage = (page) => {
  return {
    type: ActionTypes.SET_CURRENT_PAGE,
    payload: page,
  };
};
