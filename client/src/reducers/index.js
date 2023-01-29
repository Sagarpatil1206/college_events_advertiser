import { combineReducers } from "redux";
import authReducer from "./authReducers";
import postReducer from "./postReducers";

//combining the posts and auth reducers
export default combineReducers({
  posts:postReducer,
  auth:authReducer,
})