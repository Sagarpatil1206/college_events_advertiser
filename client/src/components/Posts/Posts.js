import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { CircularProgress,Grid } from '@mui/material';
import './Styles.css'

const Posts = ({setCurrentId}) => {
  const {posts,isLoadingTrue} = useSelector((state) => state.posts)//posts = state.posts.posts
  //getting posts and loadingstate from a store
  if(!posts.length && !isLoadingTrue) {return  (<div><CircularProgress size='5em'/></div>);}

  return (
    isLoadingTrue ? <div className='progress'><CircularProgress size='4em'/></div> : (//if theres a loading
      <Grid container alignItems="stretch" spacing={3}>{/* if there's no loading */}
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={4}>{/*for small and bigger than small screen we will have 12/4 posts each row*/}
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;