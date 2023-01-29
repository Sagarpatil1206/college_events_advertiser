import PostMessage from "../model/postMessage.js";
import mongoose from "mongoose";

//controller for getting a particular post
export const getPost = async(req,res) => {
  const {id} = req.params; //getting a id from parameter of request url
  try{
    const post = await PostMessage.findById(id); //finding the post of id in the url using model created using mongoose from database  
    res.status(200).json(post); //sending the response as a json post
  }catch(error){
    res.status(404).json({message:error});//page/resource not found
  }
}

//get all the posts
export const getPosts = async (req,res) => {
  const {page} = req.query;//page value is pass into the query .query - key-value pair - ?page=${page}
  try{

    const LIMIT = 6 ; //number of posts per page
    const startIndex = (Number(page)-1)*LIMIT;
    const total = await PostMessage.countDocuments({});//we can pass certain conditions their to get condition based count but as we arent we will get the count of total posts

    const  posts  = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
    //Skips the specified number of documents(here startInd) and setting a limit of posts to get
    res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
    //sending the posts
    //sending currentpage number 
    //sending total number of pages
  }catch(error){
    res.status(404).json({message:error})
  }
}

export const getPostsBySearch = async(req,res) => {
  const {searchQuery , tags} = req.query
  try{
    const title = RegExp(searchQuery,'i');
    //Regular expressions are patterns used to match character combinations in strings
    //The "i" modifier specifies a case-insenitive match. 
    const posts = await PostMessage.find({$or : [{title},{tags:{$in:tags.split(',')}}]});
    //inclusive or
    //if title or any of tag matches - select that post
    res.json({data:posts});
  }catch(error){
    res.status(404).json({message:error})
  }
}

export const createPost = async (req,res) => {
   const post = req.body;
   const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
   //adding a creator's id so that only that user can update it
   try{
      await newPost.save();
      res.status(201).json(newPost)
   }catch (error) {
      res.status(409).json({message:error})//resource conflict as received and targeted resiurce doesn't match in datatype or constraint etc
   }
}

export const likePost = async (req, res) => {
  const { id } = req.params;//getting a id of a post which user wanted to like

  if(!req.userId) return res.json("Unauthenticated user");//
  // validating a string for correct MongoDB ID.
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);//
  
  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id)=> id === String(req.userId));//.findindex retures -1 if it doesn.t find the given index in likes array
  if(index === -1){
    post.likes.push(req.userId);//liking the post
  }else{
    post.likes = post.likes.filter((id)=>id!==String(req.userId));//disliking the post so removing its id 
  }

  const likedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });//updating the post
  
  res.json(likedPost);//sending the new updated post
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id); //removind the post with a given id

  res.json({ message: "Post deleted successfully." });
}

export const updatePost = async (req,res) => {
  const {id} = req.params;
  const post = req.body //we are receiving the whole updated post via the request body
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const updatedPost = await PostMessage.findByIdAndUpdate(id,{...post,id},{new:true});
  res.json(updatedPost);
}

export const addComment = async (req,res) => {
  const {finalComment}  = req.body;
  const { id } = req.params;
  const post = await PostMessage.findById(id);
  post.comments.push(finalComment);//adding a new comment into comment array and updating the post
  const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});//update the post with id with post pass as 2nd argument
  res.json(updatedPost);
}

//getposts
//req.query is a request object that is populated by request query strings that are found in a URL. 
//These query strings are in key-value form. They start after the question mark in any URL. 
//And if there are more than one, they are separated with the ampersand