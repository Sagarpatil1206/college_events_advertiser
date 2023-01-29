import * as api from '../api/api'
import { FETCH_ALL , CREATE, LIKE, DELETE, UPDATE ,FETCH_BY_SEARCH ,START_LOADING ,STOP_LOADING ,FETCH_POST,ADD_COMMENT} from './actionTypes';

//defining action creators here

//from here we are extracting posts for a given page number
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    //started loading before api fetches the data
    const { data } = await api.fetchPosts(page);//geting the data from backend using api request
    dispatch({ type: FETCH_ALL, payload: data });//dispatching the action of type: FETCH_ALL
    dispatch({type:STOP_LOADING});
    //dispatching the action to stop loading
  }catch (error) {
    console.log(error);
  }
};

//getting a single post specified by the id provided in parameter
export const getPost = (id) => async (dispatch) => {
  try{
    dispatch({type:START_LOADING});
    const data = await api.fetchPost(id);//getting the post and storing it in data
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type:STOP_LOADING});
  }catch(error){
    console.log(error);
  }
}

export const getPostsBySearch = (searchQuery,navigate) => async(dispatch) => {
  try{
    dispatch({type:START_LOADING});
    const { data : {data}} = await api.fetchPostsBySearch(searchQuery);
    if(!data.length){//if posts are not available then it will redirect to nomatch page
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
    navigate(`/posts/${data._id}`)//it ensures that after creating a new post we will be redirected to pageDetails page
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
    return data.likes;//returning the likes count to frontend so that instant change in likesCount will be reflected
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
    navigate(`/posts/${data._id}`)//returning to post_details page of post created
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
    return data.comments;//returning the comments so that instant change will be reflected on frontend
  } catch (error) {
    console.log(error);
  }
}