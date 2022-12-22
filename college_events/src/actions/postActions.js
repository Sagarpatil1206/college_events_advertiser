import * as api from '../api/api'
import { FETCH_ALL , CREATE, LIKE, DELETE, UPDATE ,FETCH_BY_SEARCH ,START_LOADING ,STOP_LOADING ,FETCH_POST,ADD_COMMENT} from './actionTypes';

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type:STOP_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try{
    dispatch({type:START_LOADING});
    const data = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type:STOP_LOADING});
  }catch(error){
    console.log(error);
  }
}

export const getPostsBySearch = (searchQuery,navigate) => async(dispatch) => {
  try{
    dispatch({type:START_LOADING});
    const { data : {data}} = await api.fetchPostsBySearch(searchQuery); //first destructure as we we are getting it from axios
    if(!data.length){
      navigate(`/posts/search/notmatch`)
    }else{
      //second one is because we have send it as a object where {data:posts}
      dispatch({type:FETCH_BY_SEARCH , payload: { data }})
      dispatch({type:STOP_LOADING});
    }
  }catch (error){
    console.log(error);
  }
}

export const createPost = (post,navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    navigate(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
    return data.likes;
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    dispatch(getPosts());
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id,post,navigate) => async(dispatch) => {
  try {
    const  { data } = await api.updatePost(id,post);
    navigate(`/posts/${data._id}`)
    dispatch({ type:UPDATE , payload:data})
    dispatch(getPosts());
  }catch(error){
    console.log(error);
  }
}

export const addComment = (finalComment,id) => async(dispatch) => {
  try {
    const {data} = await api.addComment(finalComment,id);
    dispatch({type:ADD_COMMENT,payload:data})
    return data.comments;
  } catch (error) {
    console.log(error);
  }
}