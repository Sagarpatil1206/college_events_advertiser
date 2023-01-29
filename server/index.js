import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from 'dotenv'
//Dotenv ]module loads environment variables from a .env file into process.env 
import path from 'path'

import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express(); //intializing app 

const __dirname = path.resolve();/*require for deployment*/
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/api/posts', postRoutes);//these routes will be use by the app every route will be starting with /api/posts
app.use('/api/user', authRoutes);

app.use(express.static(path.join(__dirname,"../client/build")));
app.get("/*",function(req,res){
  res.sendFile(
    path.join(__dirname,"../client/build/index.html"),
  );
});

// const CONNECTION_URL = 'mongodb+srv://sagarpatil1206:Sagar@1206@cluster0.n0l2nh1.mongodb.net/?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
const PORT = process.env.PORT || 5000;

//connecting mongoose to mongoDB
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }) //to not get console warnings
  .then(() => app.listen(PORT, () => console.log(`Server Running successfully on Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

//bodyparser
//app.use(bp.json()) looks at requests where the Content-Type: application/json header is present 
//and transforms the text-based JSON input into JS-accessible variables under req.body.
//bodyParser.urlencoded does the same for URL-encoded requests.

//Controls the maximum request body size. and when req is bigger than default size i.e. 100kb

//31 - So, if you want to have strict Schemas and store in the database only what is specified in you model, starting with Mongoose v7, you will have to set strict option to true manually.

//PORT - a port is a communication endpoint i.e. from where request receive or send etc.

//the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
//Unified Topology allows you to see and visualize all of the health details of your network in a single pane.

//The Promise object represents the eventual completion (or failure) of 
//an asynchronous operation and its resulting value.

//Synchronous means the code runs in a particular sequence of instructions given in the program. 
//Each instruction waits for the previous instruction to complete its execution. 