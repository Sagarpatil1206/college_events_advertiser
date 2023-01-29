import express from "express"
import { signup,signin } from "../controllers/auth.js";

//routes for authorization
const router = express.Router();

router.post('/signup',signup);//here we will add a user in a data
router.post('/signin',signin);//here we will send a data and verify if its the same user

export default router;

//A POST request is typically sent via an HTML form and results in a change on the server.