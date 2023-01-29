//routes fot posts
import express from "express";
import { getPosts,createPost ,likePost ,deletePost ,updatePost ,getPostsBySearch ,getPost,addComment} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();//creating a router from express

router.get("/search",getPostsBySearch);//respond with getpostNysearch method when get requeste with '/search'
router.get("/:id",getPost);//dynamic id so after / anything(except search) will be consider as id if its get request
router.get("/", getPosts);
router.post("/",auth, createPost);
router.patch('/:id/likePost',auth, likePost);
router.post("/:id/addComment",addComment)
router.delete('/:id',auth,deletePost);
router.patch('/:id',auth,updatePost)

// router.get("/search",getPostsBySearch);

export default router;

//Routing refers to how an application’s endpoints respond to client requests
//methods 
//post - to create , it sends new data to the server
//get - read
//patch - modify the existing data
//delete - to delete