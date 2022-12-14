import express from "express";
import { getPosts,createPost ,likePost ,deletePost ,updatePost} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch('/:id/likePost', likePost);
router.delete('/:id',deletePost);
router.patch('/:id',updatePost);

export default router;
