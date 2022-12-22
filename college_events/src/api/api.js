import axios from 'axios'

const API = axios.create({baseURL:"http://localhost:5000/api"});
// const url = "https://college-events.onrender.com/api/posts";

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  }
);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const createPost = (newPost) => API.post('/posts',newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const addComment = (finalComment,id) => API.post(`/posts/${id}/addComment`,{finalComment})
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
//we have sent the searchqueery containing the search keyword and tags

export const signin = (formdata) => API.post('/user/signin',formdata);
export const signup = (formdata) => API.post('/user/signup',formdata);