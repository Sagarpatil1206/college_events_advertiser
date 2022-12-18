import axios from 'axios'

const url = 'http://localhost:5000'

export const fetchPosts = (page) => axios.get(`${url}/posts?page=${page}`);
export const fetchPost = (id) => axios.get(`${url}/posts/${id}`)
export const createPost = (newPost) => axios.post(`${url}/posts`,newPost);
export const likePost = (id) => axios.patch(`${url}/posts/${id}/likePost`);
export const addComment = (finalComment,id) => axios.post(`${url}/posts/${id}/addComment`,{finalComment})
export const deletePost = (id) => axios.delete(`${url}/posts/${id}`);
export const updatePost = (id,updatedPost) => axios.patch(`${url}/posts/${id}`,updatedPost)

export const fetchPostsBySearch = (searchQuery) => axios.get(`${url}/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
//we have sent the searchqueery containing the search keyword and tags