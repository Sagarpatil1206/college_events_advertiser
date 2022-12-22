import { combineReducers } from "redux";
import authReducer from "./authReducers";
import postReducer from "./postReducers";

export default combineReducers({
  posts:postReducer,
  auth:authReducer,
})