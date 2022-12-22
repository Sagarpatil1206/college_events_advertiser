import { AUTH, LOGOUT } from "../actions/actionTypes";
const authReducer = (state = {authData:null},action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile',JSON.stringify({...action?.payload}));
      return {authData:action?.payload};
    case LOGOUT:
      localStorage.clear();
      return {authData:null};
    default:
      return state;
  }
}

export default authReducer;