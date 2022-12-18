import PostMessage from "../model/postMessage.js";
import mongoose from "mongoose";

export const getPost = async(req,res) => {
  const {id} = req.params;
  try{
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  }catch(error){
    res.status(404).json({message:error});
  }
}

export const getPosts = async (req,res) => {
  const {page} = req.query;
  try{

    const LIMIT = 6 ; //number of posts per page
    const startIndex = (Number(page)-1)*LIMIT;
    const total = await PostMessage.countDocuments({});//we can pass certain conditin their but as we arent we will get the number of posts

    const  posts  = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
    //Skips over the specified number of documents that pass into the stage and passes the remaining documents to the next stage in the pipeline.
    res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
  }catch(error){
    res.status(404).json({message:error})
  }
}

export const getPostsBySearch = async(req,res) => {
  const {searchQuery , tags} = req.query //change Query by just search
  try{
    const title = RegExp(searchQuery,'i');
    const posts = await PostMessage.find({$or : [{title},{tags:{$in:tags.split(',')}}]});
    res.json({data:posts});
  }catch(error){
    console.log(error);
  }
}

export const createPost = async (req,res) => {
   const post = req.body;
   
   const newPost = new PostMessage(post);
   try{
      await newPost.save();
      
      res.status(201).json(newPost)
   }catch (error) {
      res.status(409).json({message:error})
   }
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const likedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  
  res.json(likedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}

export const updatePost = async (req,res) => {
  const {id} = req.params;
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const updatedPost = await PostMessage.findByIdAndUpdate(id,{...post,id},{new:true});
  res.json(updatedPost);
}

export const addComment = async (req,res) => {
  const {finalComment}  = req.body;
  const { id } = req.params;
  const post = await PostMessage.findById(id);
  post.comments.push(finalComment);
  const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});
  res.json(updatedPost);
}