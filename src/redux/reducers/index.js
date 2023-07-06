import { combineReducers } from "redux";
import { albumReducer } from "./albumReducer";
import { pageReducer } from "./pageReducer";

const reducers = combineReducers({
  albums: albumReducer,
  page: pageReducer,
});

export default reducers;
