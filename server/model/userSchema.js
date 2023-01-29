import mongoose from "mongoose";

//creating a schema for user
const userSchema = mongoose.Schema({
  name : {type:String,required:true} ,
  email : {type:String,required:true},
  password : {type:String,required:true},
  id: {type:String}
})

var User = mongoose.model("User",userSchema);

export default User;