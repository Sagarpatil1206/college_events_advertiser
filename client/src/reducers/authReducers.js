import { AUTH, LOGOUT ,ERROR, START_LOADING, STOP_LOADING} from "../actions/actionTypes";

const authReducer = (state = {authData:null,isLoadingTrue:false},action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile',JSON.stringify({...action?.payload}));
      //here we are setting a user (email and token) by name profile in localstorage in a string form
      return {authData:action?.payload};
    case LOGOUT:
      localStorage.clear();
      //after logout we will erase the user data
      return {authData:null};
    case ERROR :
      console.log(action?.payload);
      return {authData:null,errorMessage:action.payload,isLoadingTrue:false};
      //if theres a error occur on backend while sign in or sign up the error message will be the response we get
      //we are saving that in a errorMessage state
    case START_LOADING :
      return {...state,isLoadingTrue:true};
    case STOP_LOADING :
      return {...state,isLoadingTrue:false};
    default:
      return state;
  }
}

export default authReducer;