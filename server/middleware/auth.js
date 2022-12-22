import jwt from 'jsonwebtoken'

const auth = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500 ;//if yes ,then it is customauth
    
    let decodedData ;
    if(token && isCustomAuth){
      decodedData = jwt.verify(token,process.env.secret);
      // console.log(decodedData);
      req.userId = decodedData?.id;
    }else{
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
}

export default auth;