import { Button, Paper, TextField, Typography ,Divider} from '@mui/material';
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

  const handleClick = async() => {//here comment gets saved in as 'userName : comment'  format
    const finalComment = `${user?.result?.name} : ${comment}`;
    const newComments = await dispatch(addComment(finalComment,post._id));
    setComment('');//so that the comment box gets empty
    setComments(newComments);//setting new comment in a comments section so we dont have to refresh
    // commentsRef.current.scrollIntoView({ behavior : 'smooth' });
  }
  return (
    <div>
      <div className='commentsOuterSection'>{/* this contains comments + wriite comment box*/}
        <div className='commentsInnerSection'>{/* comments */}
          <Typography gutterBottom variant='h6'>Comments</Typography>
          {comments.length ? //if there is atleast one comment render below code
          (comments?.slice(0).reverse().map((comment,index)=>(
            //slice(i) creates a new array from index i here whole new array is created
            //i have done that because we needed to present them in reverse order of time
            <Typography key={index} gutterBottom variant='subtitle1'>
              <strong>{comment.split(': ')[0]} : </strong>
              {comment.split(':')[1]}
            </Typography>
          ))):(//not a single comment is on the post then rendering this
            <Paper elevation={3} style={{height:'150px', width:'500px'}}>
              <Typography variant='h6' marginLeft={2} marginRight={2}>Be the first one to comment</Typography>
            </Paper>
          )
        }
        
          {/* <div ref={commentsRef}/> */}
        </div>{/*Write comments */}
        <Divider style={{margin:'10px 0'}}/>
        {user?.result?.name ? (//if user is logged in only then render below content
        <div className='writeComment'>
          <Typography gutterBottom variant='h6'>Write a comment</Typography>
          <TextField label='comment' value={comment} multiline rows={4}
          onChange={(e)=>setComment(e.target.value)} fullWidth/>
          <Button variant='contained' style={{marginTop:'10px'}} fullWidth disabled={!comment} onClick={handleClick}>Add Comment</Button>
        </div>
        ) : (//if user isn't logged in then render this
          <Paper elevation={2} style={{padding:'10px'}}>
            <Typography variant='h6' align='center' style={{marginTop:'30px'}}>Sign in to comment on this post</Typography>
          </Paper>
        )
        }
      </div>
    </div>
  );
};

export default CommentSection;
