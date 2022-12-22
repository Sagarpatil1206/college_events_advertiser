import * as api from '../api/api'
import { AUTH ,ERROR,START_LOADING,STOP_LOADING} from './actionTypes';

export const signin = (formData,navigate) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data } = await api.signin(formData);
    dispatch({type:AUTH,payload:data});
    dispatch({type:STOP_LOADING});
    navigate('/');
  } catch (error) {
    console.log(error);
    dispatch({type:ERROR,payload:error?.response?.data?.message});
    // console.log(error?.response?.data?.message);
  }
}

export const signup = (formData,navigate) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data } = await api.signup(formData);
    dispatch({type:AUTH,payload:data});
    dispatch({type:STOP_LOADING});
    navigate('/');
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    dispatch({type:ERROR,payload:error?.response?.data?.message});
  }
}