import * as api from '../api/api'
import { AUTH } from './actionTypes';

export const signin = (formData,navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({type:AUTH,payload:data});
    navigate('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData,navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({type:AUTH,payload:data});
    navigate('/');
  } catch (error) {
    console.log(error);
  }
}