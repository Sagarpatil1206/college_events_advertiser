import axios from 'axios'

// const API = axios.create({baseURL:"http://localhost:5000/api"});
const API = axios.create({baseURL:"https://college-events.onrender.com/api/"});
//Here we are here creating the axios instance

//below code is use for adding user info in req.headers.auth so that on backend we can extract that
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  }
);

//crrating apis for each request
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const createPost = (newPost) => API.post('/posts',newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const addComment = (finalComment,id) => API.post(`/posts/${id}/addComment`,{finalComment})
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost)
//so here in updatepost api posts/${id} id is pass as req.param and updated post as req.body
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
//we have sent the searchqueery containing the search keyword and tags

//api_s for user authorization
export const signin = (formdata) => API.post('/user/signin',formdata);
export const signup = (formdata) => API.post('/user/signup',formdata);