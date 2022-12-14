import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { likePost , deletePost } from '../../../actions/postActions';

import moment from 'moment'
// import { useDispatch } from 'react-redux';
import './styles.css'
import { useDispatch } from 'react-redux';

const Post = ({post , setCurrentId}) => {

  const dispatch = useDispatch();

  return (
    <Card className='card' style={{borderRadius:'15px'}}>
    <CardMedia className='media' image={post.event_poster} title={post.title}  style={{ backgroundBlendMode : 'darken'}}/>
    <div className='overlay'>
      <Typography variant="h6">{post.organizer}</Typography>
      <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    </div>
    <div className='overlay2'>
      <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon /></Button>
    </div>
    <div className='tags'>
      <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
    </div>
    <Typography gutterBottom variant="h4" component="h2" align='center' style={{ fontWeight: 600 }}>{post.title}</Typography>
    <Typography gutterBottom variant="h6" component="h2">&nbsp; <EventIcon fontSize="medium"/> Date : {post.date}</Typography>
    <Typography gutterBottom variant="h6" component="h2">&nbsp;  <AccessTimeIcon fontSize="medium"/> Time : {post.time}</Typography>
    <Typography gutterBottom variant="h6" component="h2">&nbsp; <LocationOnOutlinedIcon fontSize="medium"/> Venue : {post.venue}</Typography>
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
    </CardContent>
    <CardActions className='cardactions' style={{justifyContent:'space-between'}}>
      <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> &nbsp;Like {post.likeCount} </Button>
      <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
    </CardActions>
  </Card>
  );
};

export default Post;