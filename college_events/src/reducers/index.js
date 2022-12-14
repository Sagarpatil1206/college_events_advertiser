import { combineReducers } from "redux";
import postReducer from "./postReducers";

export default combineReducers({
  posts:postReducer,
})