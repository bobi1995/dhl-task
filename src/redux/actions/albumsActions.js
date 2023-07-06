import { ActionTypes } from "../constants/actionTypes";

export const setAlbums = (albums) => {
  return {
    type: ActionTypes.SET_ALBUMS,
    payload: albums,
  };
};
export const setFavourites = (album) => {
  return {
    type: ActionTypes.ADD_FAVOURITE,
    payload: album,
  };
};

export const removeFavourites = (albumId) => {
  return {
    type: ActionTypes.REMOVE_FAVOURITE,
    payload: albumId,
  };
};
