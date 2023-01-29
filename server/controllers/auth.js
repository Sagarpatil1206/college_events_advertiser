import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../model/userSchema.js';

export const signin = async(req,res) => {
  const {email,password} = req.body;//getting through body of a request
  try {
    const existingUser = await User.findOne({email});//findone : returns the first document satisfying the condition.
    if(!existingUser) return res.status(404).json({message:"User doesn't exist"});//if no user is found
    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);//if password is matching then returns a true
    if(!isPasswordCorrect) return res.status(404).json({message:"Invalid Credentials"});

    const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.secret,{expiresIn:'1h'});
    //creating a user token using email and userid with max one hour validity
    res.status(200).json({result : existingUser,token})//sending the encrypted jwt to client
    //returninh thr user info and created token
  } catch (error) {
    res.status(500).json("something went wrong")
    //500 - the server encountered an unexpected condition that prevented it from fulfilling the request.
    console.log(error);
  }
}

export const signup = async(req,res) => {
  const {email,password,confirmPassword,firstName,lastName} = req.body;
  try {
    const existingUser = await User.findOne({email});//find if user with given email already exists
    if(existingUser) return res.status(400).json({message:'User already exists'});
    if(password !==confirmPassword) return res.status(400).json({message:"Password doesn't match"});

    const hashPassword = await bcrypt.hash(password,12);
    //bcrypt is a password-hashing function
    //12 - cost factor , higher the cost factor higher the security(hashing)
    const result = await User.create({email,password:hashPassword,name:`${firstName} ${lastName}`});

    const token = jwt.sign({email:result.email,id:result._id},process.env.secret,{expiresIn:'1h'});
    //generating a signature
    //a private key is shared between two entities, say your application's server and 
    //an authentication server. This private key is used both to generate signatures for outgoing JWTs, 
    //and to validate signatures from incoming JWTs
    res.status(200).json({result,token});
  } catch (error) {
    res.status(500).json("something went wrong")
    console.log(error);
  }
}

//JSON Web Token (JWT) is an open standard that defines a compact way 
//a private key is shared between two entities, say your application's server and 
//an authentication server. This private key is used both to generate signatures for outgoing JWTs, 
//and to validate signatures from incoming JWTs
//for securely transmitting information between parties as a JSON object
//When your authentication server receives an incoming JWT, it uses the incoming JWT's header and payload segments and the shared private key to generate a signature.
//If the signature matches, then your application knows that the incoming JWT can be trusted.
//https://www.freecodecamp.org/news/how-to-sign-and-validate-json-web-tokens/