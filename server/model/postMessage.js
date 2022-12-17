import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    organizer:String,
    tags:[String],
    event_poster:String,//convert image into string
    date:String,
    time:String,
    venue:String,
    comments :{
        type:[String],
        default:[]
    },
    likeCount:{
        type:Number,
        default:0,//additional information
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