import React, { useState } from 'react';
import {Container,AppBar,Typography,Grow,Grid} from '@mui/material'
import pict_logo from './pictures/pict_logo.png'
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { getPosts } from './actions/postActions';

const App = () => {
  const dispatch = useDispatch()

  const [currentId,setCurrentId] = useState(0);

  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch])

  return (
    <Container maxWidth="lg">
      <AppBar className='appbar' position="static" color="inherit" style={{display:'flex' , flexDirection:'row' ,borderRadius:'15px',margin:'30px 5px',justifyContent:'center',alignItems:'center'}}>
        <Typography className='heading' variant='h2' align='center'>PICT EVENTS</Typography>
        <img className='image' src={pict_logo} alt='pict_logo' height="90px" width="90px" style={{margin:'3px 15px'}}></img>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId = {setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId = {currentId} setCurrentId = {setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
