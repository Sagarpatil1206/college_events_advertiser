import express from "express";
import { getPosts,createPost ,likePost ,deletePost ,updatePost ,getPostsBySearch,getPost,addComment} from "../controllers/posts.js";

const router = express.Router();

router.get("/posts/search",getPostsBySearch);
router.get("/posts/:id",getPost);
router.get("/posts/", getPosts);
router.post("/posts/", createPost);
router.patch('/posts/:id/likePost', likePost);
router.post("/posts/:id/addComment",addComment)
router.delete('/posts/:id',deletePost);
router.patch('/posts/:id',updatePost)

// router.get("/search",getPostsBySearch);

export default router;
