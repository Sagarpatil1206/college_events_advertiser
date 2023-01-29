import { Alert, Avatar, Button, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleLogin} from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google';
// import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import './authcss.css'
import jwt_decode from 'jwt-decode'
import { AUTH } from '../../actions/actionTypes';
// import GoogleIcon from './GoogleIcon';
import {signup,signin} from '../../actions/authActions'

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''};

const Auth = () => {
  const [formData,setFormData] = useState(initialState)
  const [showPassword,setShowPassword] = useState(false);
  const [isSignUp,setSignUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowPassword = () => setShowPassword(!showPassword);
  const {errorMessage , isLoadingTrue} = useSelector((state)=> state?.auth);
  //retrieving the errormessage and loadingstate from auth state

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp){
      dispatch(signup(formData,navigate));
    }else{
      dispatch(signin(formData,navigate));
    }
  }
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const switchMode = () => {
    setSignUp(!isSignUp);
    handleShowPassword(false);//as we pass through screens password visibility should be off
  }

  const googleSuccess = async(res) =>{
    const result = jwt_decode(res?.credential);
    const token = res?.credential;
    try {
      dispatch({type:AUTH , payload : {result , token}});
      navigate('/posts')
    } catch (error) {
      console.log(error);
    }
  }
  const googleError = (error) => {
    console.log("Google sign in unsuccessfull. "+error);
  }

  if(isLoadingTrue) return (<div className='progress'><CircularProgress size='4em'/></div>)

  //code for authorization form(sign up/sign in)
  return (
    <div className='maindiv'>
    <Container component="main" maxWidth='xs' className='root'>
      <Paper className='paper' elevation={3} style={{padding:'16px',borderRadius:'7px'}}>
        <Avatar style={{backgroundColor:'#f83636',margin:'8px'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant='h5'>{isSignUp ? `Sign Up` : `Sign In`}</Typography> 
        {/*if the user is in signUp mode isSignUp will be true else false */}

        {errorMessage?.length && <Alert severity="warning" style={{marginTop:'10px'}}>{errorMessage}</Alert>}
        {/*Displaying the error message if there's any as an alert*/}

        {/*Form starts from here*/}
        <form className='form' onSubmit={handleSubmit} style={{width:'100%'}}>
          <Grid container spacing={2}> {/*spacing={1} is of 8px*/}
            {
              isSignUp && ( //if sign up mode is present only then do this
                <>
                  <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half/>
                  {/* Input is define in input.js in same folder */}
                  <Input name='lastName' label="Last Name" handleChange={handleChange} half/>
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
            {/*Here in password if we click on icon showPassword become text which will be shown and if type=password password will be hidden */}
            {
              isSignUp && 
              <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>
            }
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' style={{ margin: '24px 0px 16px 0px'}}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          {/*Google authorization code*/}
          <GoogleOAuthProvider style={{margin:'100px'}}>
          <GoogleLogin client_id='194974084529-b573d191ilvmt6s058rtqfmjd3uugo3b.apps.googleusercontent.com'
          onSuccess={googleSuccess} onFailure={googleError} cookiePolicy='single_host_origin'/>
          </GoogleOAuthProvider>

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? 'Already have an account ? sign In' : `Don't have an account ? Sign Up`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </div>
  );
};

export default Auth;

//xs = 6 takes half of grid
//spacing 1 = 8px