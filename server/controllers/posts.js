import PostMessage from "../model/postMessage.js";
import mongoose from "mongoose";
export const getPosts = async (req,res) => {
  try{
    const  posts  = await PostMessage.find();
    res.status(200).json(posts)
  }catch(error){
    res.status(404).json({message:error})
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

export const updatePost = async(req,res) => {
  const {id} = req.params;
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const updatedPost = await PostMessage.findByIdAndUpdate(id,{...post,id},{new:true});
  res.json(updatedPost);
}