import jwt from 'jsonwebtoken'

const auth = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];//getting the current user's token
    //`Bearer ${JSON.parse(localStorage.getItem('profile')).token`
    const isCustomAuth = token.length < 500 ;//if yes ,then it is customauth
    
    let decodedData ;
    if(token && isCustomAuth){
      decodedData = jwt.verify(token,process.env.secret);//verify the custometoken using secret key
      //validating and retriving the token
      //console.log(decodedData);
      req.userId = decodedData?.id;
    }else{//using google's login
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();//go to next function i.e. controller in our case
  } catch (error) {
    console.log(error);
  }
}

export default auth;