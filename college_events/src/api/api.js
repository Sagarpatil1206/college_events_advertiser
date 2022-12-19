import axios from 'axios'

const url = "https://college-events.onrender.com/api/posts";

export const fetchPosts = (page) => axios.get(`${url}?page=${page}`);
export const fetchPost = (id) => axios.get(`${url}/${id}`)
export const createPost = (newPost) => axios.post(url,newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const addComment = (finalComment,id) => axios.post(`${url}/${id}/addComment`,{finalComment})
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const updatePost = (id,updatedPost) => axios.patch(`${url}/${id}`,updatedPost)

export const fetchPostsBySearch = (searchQuery) => axios.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
//we have sent the searchqueery containing the search keyword and tags
