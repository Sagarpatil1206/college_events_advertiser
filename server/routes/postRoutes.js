import express from "express";
import { getPosts,createPost ,likePost ,deletePost ,updatePost ,getPostsBySearch,getPost,addComment} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search",getPostsBySearch);
router.get("/:id",getPost);
router.get("/", getPosts);
router.post("/",auth, createPost);
router.patch('/:id/likePost',auth, likePost);
router.post("/:id/addComment",addComment)
router.delete('/:id',auth,deletePost);
router.patch('/:id',auth,updatePost)

// router.get("/search",getPostsBySearch);

export default router;
