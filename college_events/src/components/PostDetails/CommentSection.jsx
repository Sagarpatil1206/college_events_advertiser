import { Button, Paper, TextField, Typography } from '@mui/material';
// import { width } from '@mui/system';
import React from 'react';
// import { useRef } from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import {addComment} from '../../actions/postActions'
import './commentStyles.css'

const CommentSection = ({post}) => {
  const [comments,setComments] = useState(post?.comments);
  const [comment,setComment] = useState('');
  const dispatch = useDispatch();
  // const commentsRef = useRef();
  const user = JSON.parse(localStorage.getItem('profile'))
  const handleClick = async() => {
    const finalComment = `${user?.result?.name} : ${comment}`;
    const newComments = await dispatch(addComment(finalComment,post._id));
    setComment('');
    setComments(newComments);
    // commentsRef.current.scrollIntoView({ behavior : 'smooth' });
  }
  return (
    <div>
      <div className='commentsOuterSection'>
        <div className='commentsInnerSection'>
          <Typography gutterBottom variant='h6'>Comments</Typography>
          {comments.length ? 
          (comments?.slice(0).reverse().map((comment,index)=>(
            <Typography key={index} gutterBottom variant='subtitle1'>
              <strong>{comment.split(': ')[0]} : </strong>
              {comment.split(':')[1]}
            </Typography>
          ))):(
            <Paper elevation={3} style={{height:'150px', width:'500px'}}>
              <Typography variant='h6' marginLeft={2} marginRight={2}>Be the first one to comment</Typography>
            </Paper>
          )
        }
          {/* <div ref={commentsRef}/> */}
        </div>
        {user?.result?.name ? (
        <div className='writeComment'>
          <Typography gutterBottom variant='h6'>Write a comment</Typography>
          <TextField label='comment' value={comment} multiline rows={4}
          onChange={(e)=>setComment(e.target.value)} fullWidth/>
          <Button variant='contained' style={{marginTop:'10px'}} fullWidth disabled={!comment} onClick={handleClick}>Add Comment</Button>
        </div>
        ) : (
          <Paper elevation={2} style={{padding:'10px'}}>
            <Typography variant='h6' align='center' style={{marginTop:'50px'}}>Sign in to comment on this post</Typography>
          </Paper>
        )
        }
      </div>
    </div>
  );
};

export default CommentSection;