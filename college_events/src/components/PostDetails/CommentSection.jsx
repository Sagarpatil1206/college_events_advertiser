import { Button, TextField, Typography } from '@mui/material';
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
  const user = 'User'

  const handleClick = async() => {
    const finalComment = `${user} : ${comment}`;
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
          {comments?.slice(0).reverse().map((comment,index)=>(
            <Typography key={index} gutterBottom variant='subtitle1'>
              <strong>{comment.split(': ')[0]} : </strong>
              {comment.split(':')[1]}
            </Typography>
          ))}
          {/* <div ref={commentsRef}/> */}
        </div>
        <div className='writeComment'>
          <Typography gutterBottom variant='h6'>Write a comment</Typography>
          <TextField label='comment' value={comment} multiline rows={4}
          onChange={(e)=>setComment(e.target.value)} fullWidth/>
          <Button variant='contained' style={{marginTop:'10px'}} fullWidth disabled={!comment} onClick={handleClick}>Add Comment</Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;