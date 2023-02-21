import React from 'react';
import pict_logo from '../../pictures/pict_logo.png'
import { AppBar,Avatar,Button,Dialog,DialogContent,DialogContentText,DialogTitle,Toolbar,Typography,useMediaQuery,IconButton, Paper, MenuItem } from '@mui/material';
import {Menu} from '@mui/icons-material';
import './Styles.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../actions/actionTypes';
import decode from 'jwt-decode'



const Navbar = () => {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [open,setOpen] = useState(false);
  const [isMobileMenuToggeled,setMobileMenuToggled] = useState(false);
  //open variable is use for dialog box if opne=true dialog box is open otherwise its close
  // console.log(user);
  const location = useLocation();
  // useLocation() returns the location object that represents the current URL
  const dispatch = useDispatch();
  //return dispatch method which is use to dispatch actions as needed
  const navigate = useNavigate();
  //return navigate method which can redirect us to location given in parameter

  const isMobileScreen = useMediaQuery('(min-width:500px)');


  const logoutHandler = () => {//this function dispatches the logout action
    //then redirect us to a home page and sets a user as null as user is logout
    dispatch({type:LOGOUT});
    navigate('/');
    setUser(null);
  }

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')));//
    //it convers the string into JS object and sets it as a user
    const token = user?.token;

    if(token){
      const decoded_token = decode(token);
      if((decoded_token.exp*1000)<(new Date().getTime())){//exp time is in milisecond thats why multiplying by 1000
        logoutHandler();//if token has expired we are logging out of the system
      }
    }
  },[location])//so we will check the token everytime we change a URL so that after a token time user cant able to perform any action

  const handleClickOpen = () => {//sets a open true which opnens a dialog box
    setOpen(true);
  };

  const handleClose = () => {//sets a open false which closes a dialog box
    setOpen(false);
  };

  return (
    <>
    {/*below dialog box pops up when we click on logout button */}
    <Dialog
      open={open}
      onClose={handleClose}>
      <DialogContent>
        <DialogTitle style={{display:'flex',justifyContent:'center',fontSize:'22px'}}>
          Logout ?
        </DialogTitle>
        <DialogContent>
        <DialogContentText style={{fontSize:'18px'}}>Are you sure you want to log out ?</DialogContentText></DialogContent>
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
        <Button variant="contained" color="primary" onClick={()=>{handleClose();logoutHandler()}}>Yes</Button>
        <Button variant="contained" color="primary" onClick={()=>{handleClose()}}>No</Button>
        </div>
      </DialogContent>
    </Dialog>

    {/*Actual Appbar */}
    {isMobileScreen && 
    <AppBar className='appbar' position="static" color="inherit" 
      style={{display:'flex' , flexDirection:'row' ,borderRadius:'15px',margin:'30px 8px',padding:'5px 60px',alignItems:'center'}}>

      {/*LOGO and Name of website */}
      <div className='brandContainer'>
        <Link to='/' style={{display:'flex',alignItems:'center',textDecoration:'none',color:'black'}}>{/*so when someone click on logo or name it will redirect us to home page */}
        <img className='image' src={pict_logo} alt='pict_logo' height="80px" width="80px" style={{margin:'5px 15px'}}></img>
          <Typography className='heading' variant='h3' align='center' width='100%' style={{whiteSpace:'nowrap'}}>PICT EVENTS</Typography>
        </Link>
      </div>

      {/*toolbar  = avtar+name of user+logout/signIn button */}
      <Toolbar className='toolbar'>
        {
          user?.result ? ( //if user is present i.e. if logged in
            <div className='profile'>
              <Avatar className='purple' alt={user?.result.name} src={user?.result.picture}
              style={{color:'white',backgroundColor:'#1976D2'}}>{user?.result.name.charAt(0)}</Avatar>
              <Typography className='userName' variant='h6'>{user?.result.name}</Typography>
              <Button variant='contained' style={{backgroundColor:'#1976D2'}} onClick={handleClickOpen}>Logout</Button>
              {/*After clicking on logout we are setting the open=true rhroughh handleclickopen which opens a dialogbox */}
              {/* <Button component={Link} to='/'variant='contained' style={{marginRight:'30px'}} >Home</Button> */}
            </div>
          ) : ( //if not logged in
              <div>
                <Button component={Link} to='/'variant='contained' style={{marginRight:'30px'}} >Home</Button>
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
              </div>
            )
        }
        
      </Toolbar>
    </AppBar>
}
    {!isMobileScreen && 
     <AppBar className='appbar' position="static" color="inherit" style={{display:'flex' , flexDirection:'row' ,borderRadius:'15px',margin:'10px 2px',padding:'5px 10px 5px 0px',alignItems:'center'}}>
      <div className='brandContainer'>
        <Link to='/' style={{display:'flex',alignItems:'center',textDecoration:'none',color:'black'}}>{/*so when someone click on logo or name it will redirect us to home page */}
        <img className='image' src={pict_logo} alt='pict_logo' height="50px" width="50px" style={{margin:'5px 15px'}}></img>
          <Typography className='heading' variant='h4' style={{fontSize:'28px'}} align='center' width='100%'>PICT EVENTS</Typography>
        </Link>
      </div>
      <IconButton onClick={()=>setMobileMenuToggled(!isMobileMenuToggeled)} style={{left:'12px'}}><Menu /></IconButton>
      {isMobileMenuToggeled && (
        <Paper style={{position:'fixed',right:'5px', bottom:'0px' ,height:'15%',zIndex:'10',top:'82px'}}>
          <MenuItem><Button component={Link} to='/' style={{marginRight:'20px'}} onClick={()=>setMobileMenuToggled(!isMobileMenuToggeled)}>Home</Button></MenuItem>
          <MenuItem><Button component={Link} to='/auth' color='primary' onClick={()=>setMobileMenuToggled(!isMobileMenuToggeled)}>Sign In</Button></MenuItem>
        </Paper>
      )}
      {isMobileMenuToggeled && user?.result && (
        <Paper style={{position:'fixed',right:'5px', bottom:'0px' ,height:'15%',zIndex:'10',top:'82px'}}>
          <MenuItem><Button component={Link} to='/' style={{marginRight:'20px'}} onClick={()=>setMobileMenuToggled(!isMobileMenuToggeled)}>Home</Button></MenuItem>
          <MenuItem><Button  color='primary' onClick={()=>{setMobileMenuToggled(!isMobileMenuToggeled);handleClickOpen();}}>LOGOUT</Button></MenuItem>
        </Paper>
      )
      }
     </AppBar>
    }
    </>
  );
};

export default Navbar;

/* <div className='buttons'>


</div>
<Button variant='contained'>Sign Up</Button>
<Button variant='contained' style={{margin:'20px'}} >Log In</Button> */

/**
  A common use of JSON is to exchange data to/from a web server.
  When receiving data from a web server, the data is always a string.
  Parse the data with JSON.parse(), and the data becomes a JavaScript object.
 */
