import * as api from '../api/api'
import { AUTH ,ERROR,START_LOADING,STOP_LOADING} from './actionTypes';

//signin action creator
export const signin = (formData,navigate) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data } = await api.signin(formData);
    console.log(data);
    dispatch({type:AUTH,payload:data}); //dispatching the action of auth type
    dispatch({type:STOP_LOADING});
    navigate('/');
  } catch (error) {
    console.log(error);
    dispatch({type:ERROR,payload:error?.response?.data?.message});//this action will set the errorMessage if there's any
    // console.log(error?.response?.data?.message);
  }
}

//signup action creator
export const signup = (formData,navigate) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data } = await api.signup(formData);//getting data from backend
    dispatch({type:AUTH,payload:data});//dispatching the action with type : auth
    dispatch({type:STOP_LOADING});
    navigate('/');
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    dispatch({type:ERROR,payload:error?.response?.data?.message});//this action will set the errorMessage if there's any
  }
}