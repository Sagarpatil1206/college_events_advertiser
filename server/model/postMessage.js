import mongoose from "mongoose";

//creating a mongoose schema for post
const postSchema = mongoose.Schema({
    title:String,                  //type checking and validatison will be check while getting and saving data
    message:String,                //using mongoose here
    organizer:String,
    creator:String,
    tags:[String],
    event_poster:String,//convert image into string
    date:String,
    time:String,
    venue:String,
    comments :{
        type:[String],
        default:[]
    },
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
});

var PostMessage = mongoose.model('PostMessage',postSchema);//turning schema into model

export default PostMessage;//we are exporting a mongoose model from postMessage file
//on this model we can run commands like find delete update etc.
//mongoose allows us to give some sort of uniformity to our document

//validations like default=25, min=18 ,require:true etc

//Model. A Mongoose model is a wrapper on the Mongoose schema. 
//A Mongoose schema defines the structure of the document, default values, 
//validators, etc., whereas a Mongoose model provides an interface to the database for 
//creating, querying, updating, deleting records, etc.

//mongoose creates Model abstraction which makes it easier to work with, so it looks like you are working with 
//just objects rather than pure data.