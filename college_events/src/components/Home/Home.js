import React, { useState } from 'react';
import {Container,Grow,Grid, Paper, AppBar, TextField, Button, Typography} from '@mui/material'
import { MuiChipsInput } from 'mui-chips-input'

import Form from '../Form/Form';
import Posts from '../Posts/Posts';
// import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { getPostsBySearch } from '../../actions/postActions';
import Paginate from '../Paginate';

import { useNavigate ,useLocation } from 'react-router-dom';

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const dispatch = useDispatch()
  const [currentId,setCurrentId] = useState(0);
  const [search,setSearch] = useState(''); //it contains the strings to search in the title
  const [tags,setTags] = useState([]);
  // const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();//usequery will search in the url 
  const page = query.get('page') || 1;
  // const searchQuery = query.get('searchQuery');

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      searchPost();
    };
  };
  
  const deleteHandler = (tagToDelete) => {
    setTags(tags.filter((tag)=>tag!==tagToDelete))
  }

  const searchPost = () => {
    if(search.trim() || tags.length){ //if search button is clicked and theres something entered in tags or search box
      dispatch(getPostsBySearch({search,tags:tags.join(',')},navigate));//pasiing the parameters newwded //everything sent is a string
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
    }else{
      navigate(`/`)
    }
  }

  const settingTag = (tag,index) => {
    setTags([...tags,tag]);
  }

  // useEffect(()=>{
  //   dispatch(getPosts());
  // },[currentId , dispatch ])

  return (
      <Grow in>
        <Container maxWidth='xl'>
          <Grid container justifyContent='space-between' alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId = {setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={6}>
                <Paginate page={page}/>
              </Paper>
              <AppBar position='static' color='inherit' style={{padding:'8px 16px 16px',marginBottom:'1rem',borderRadius:'4',display:'flex'}}>
                <Typography gutterBottom variant='h6' align='center'>Search Event</Typography>
                <TextField name='search' variant='outlined' label='Enter event title' fullWidth value={search} onChange={(e)=>setSearch(e.target.value)}
                 onKeyDown={handleKeyPress}/>
                  <MuiChipsInput label="Enter Tags" value={tags} onAddChip={settingTag} onDeleteChip={deleteHandler} style={{marginTop:'10px'}} fullWidth/>
                  <Button color='primary' variant='contained' onClick={searchPost} style={{marginTop:'10px'}}>Search</Button>
              </AppBar>
              <Paper elevation={6}>
                <Form currentId = {currentId} setCurrentId = {setCurrentId}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  );
}

export default Home;
// import React from 'react';

// const Home = () => {
//   return (
//     <div>
//       Hello
//     </div>
//   );
// };

// export default Home;

/* <TextField id='tag' label='Enter Tag and Press Enter' fullWidth variant='outlined' value={tag} onChange={(e)=>setTag(e.target.value)} onKeyUp={handleAddTag} style={{margin:'16px 0 0 0'}}/>            
      <Box>
      {tags.map((item,index)=>(
        <Chip key={index} label={item} variant='outlined' style={{margin:'5px'}} value={item} 
        onDelete={() => deleteHandler(item)}/>
      ))}
      </Box> */

      /*const handleAddTag = (e) => {
        if(e.keyCode === 13){
          setTags([...tags,tag])
          setTag('');
        };
      }
      */
