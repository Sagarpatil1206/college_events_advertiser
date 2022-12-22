import React from 'react';
import pict_logo from '../../pictures/pict_logo.png'
import { AppBar,Avatar,Button,Dialog,DialogContent,DialogContentText,DialogTitle,Toolbar,Typography } from '@mui/material';
import './Styles.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../actions/actionTypes';

const Navbar = () => {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [open,setOpen] = useState(false);
  // console.log(user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch({type:LOGOUT});
    navigate('/');
    setUser(null);
  }

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Dialog
      open={open}
      onClose={handleClose}>
      <DialogContent>
        <DialogTitle style={{display:'flex',justifyContent:'center',fontSize:'21px'}}>
          Logout ?
        </DialogTitle>
        <DialogContent>
        <DialogContentText style={{fontSize:'17px'}}>Are you sure you want to log out ?</DialogContentText></DialogContent>
        <div style={{display:'flex',justifyContent:'space-around'}}>
        <Button variant="contained" color="primary" onClick={()=>{handleClose();logoutHandler()}}>Yes</Button>
        <Button variant="contained" color="primary" onClick={()=>{handleClose()}}>No</Button>
        </div>
      </DialogContent>
    </Dialog>
    <AppBar className='appbar' position="static" color="inherit" style={{display:'flex' , flexDirection:'row' ,borderRadius:'15px',margin:'30px 8px',padding:'5px 60px',alignItems:'center'}}>
      <div className='brandContainer'>
        <Link to='/' style={{display:'flex',alignItems:'center',textDecoration:'none',color:'black'}}>
          <Typography className='heading' variant='h3' align='center' width='315px'>PICT EVENTS</Typography>
          <img className='image' src={pict_logo} alt='pict_logo' height="80px" width="80px" style={{margin:'5px 15px'}}></img>
        </Link>
      </div>
      <Toolbar className='toolbar'>
        {
          user?.result ? (
            <div className='profile'>
              
              <Avatar className='purple' alt={user?.result.name} src={user?.result.picture}
              style={{color:'white',backgroundColor:'#1976D2'}}>{user?.result.name.charAt(0)}</Avatar>
              <Typography className='userName' variant='h6'>{user?.result.name}</Typography>
              <Button variant='contained' style={{backgroundColor:'#1976D2'}} onClick={handleClickOpen}>Logout</Button>
              {/* <Button component={Link} to='/'variant='contained' style={{marginRight:'30px'}} >Home</Button> */}
            </div>
          ) : (
              <div>
                <Button component={Link} to='/'variant='contained' style={{marginRight:'30px'}} >Home</Button>
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
              </div>
            )
        }
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Navbar;

/* <div className='buttons'>


</div>
<Button variant='contained'>Sign Up</Button>
<Button variant='contained' style={{margin:'20px'}} >Log In</Button> */