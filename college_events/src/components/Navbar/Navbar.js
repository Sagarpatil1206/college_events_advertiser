import React from 'react';
import pict_logo from '../../pictures/pict_logo.png'
import { AppBar,Button,Typography } from '@mui/material';
import './Styles.css'
import { Link } from 'react-router-dom';


const Navbar = () => {

  return (
    <AppBar className='appbar' position="static" color="inherit" style={{display:'flex' , flexDirection:'row' ,borderRadius:'15px',margin:'30px 8px',padding:'5px 60px',alignItems:'center'}}>
      <Link to='/' style={{display:'flex',alignItems:'center',textDecoration:'none',color:'black'}}>
        <Typography className='heading' variant='h3' align='center'>PICT EVENTS</Typography>
        <img className='image' src={pict_logo} alt='pict_logo' height="80px" width="80px" style={{margin:'5px 15px'}}></img>
        </Link>
        <div className='buttons'>
        <Link to='/' style={{textDecoration:'none'}}>
        <Button variant='contained' style={{margin:'20px'}} >Home</Button></Link>
        <Button variant='contained'>Sign Up</Button>
        <Button variant='contained' style={{margin:'20px'}} >Log In</Button>
        </div>
    </AppBar>
  );
};

export default Navbar;