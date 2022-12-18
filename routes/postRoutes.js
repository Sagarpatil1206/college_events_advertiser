import express from "express";
import { getPosts,createPost ,likePost ,deletePost ,updatePost ,getPostsBySearch,getPost,addComment} from "../controllers/posts.js";

const router = express.Router();

router.get("/search",getPostsBySearch);
router.get("/:id",getPost);
router.get("/", getPosts);
router.post("/", createPost);
router.patch('/:id/likePost', likePost);
router.post("/:id/addComment",addComment)
router.delete('/:id',deletePost);
router.patch('/:id',updatePost)

// router.get("/search",getPostsBySearch);

export default router;
