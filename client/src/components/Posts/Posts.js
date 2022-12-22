import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { CircularProgress,Grid } from '@mui/material';
import './Styles.css'

const Posts = ({setCurrentId}) => {
  const {posts,isLoadingTrue} = useSelector((state) => state.posts)//posts = state.posts.posts

  if(!posts.length && !isLoadingTrue) {return  (<div><CircularProgress size='5em'/></div>);}

  return (
    isLoadingTrue ? <div className='progress'><CircularProgress size='4em'/></div> : (
      <Grid container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={4}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;