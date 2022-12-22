import { AUTH, LOGOUT ,ERROR, START_LOADING, STOP_LOADING} from "../actions/actionTypes";
const authReducer = (state = {authData:null,isLoadingTrue:false},action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile',JSON.stringify({...action?.payload}));
      return {authData:action?.payload};
    case LOGOUT:
      localStorage.clear();
      return {authData:null};
    case ERROR :
      console.log(action?.payload);
      return {authData:null,errorMessage:action.payload,isLoadingTrue:false};
    case START_LOADING :
      return {...state,isLoadingTrue:true};
    case STOP_LOADING :
      return {...state,isLoadingTrue:false};
    default:
      return state;
  }
}

export default authReducer;