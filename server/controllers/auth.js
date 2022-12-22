import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../model/userSchema.js';

export const signin = async(req,res) => {
  const {email,password} = req.body;
  try {
    const existingUser = await User.findOne({email});//email:email = find email as email in one word
    if(!existingUser) return res.status(404).json({message:"User doesn't exist"});
    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
    if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"});
    const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:'1h'});
    res.status(200).json({result : existingUser,token})
  } catch (error) {
    res.status(500).json("something went wrong")
    console.log(error);
  }
}

export const signup = async(req,res) => {
  const {email,password,confirmPassword,firstName,lastName} = req.body;
  try {
    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({message:'User already exists'});
    if(password !==confirmPassword) return res.status(400).json({message:"Password doesn't match"});
    const hashPassword = await bcrypt.hash(password,12);
    const result = await User.create({email,password:hashPassword,name:`${firstName} ${lastName}`});
    const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'1h'});
    res.status(200).json({result,token});//result equals to whole user as defined in userschema
  } catch (error) {
    res.status(500).json("something went wrong")
    console.log(error);
  }
}