import { CircularProgress, Divider, Paper, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/postActions';
import CommentSection from './CommentSection';
import './styles.css'

const PostDetails = () => {
  const {post,posts,isLoading} = useSelector((state)=>state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=> {
    dispatch(getPost(id))
  },[dispatch,id])

  useEffect(()=>{
  dispatch(getPostsBySearch({search:'none',tags:post?.tags.join(',')})); //  (?) checks if tags are present only then go furthur
  },[post,dispatch])

  if(!post) {console.log("no post"); return null;}

  if(isLoading){
    <paper elevation={6} className='loadingpaper'>
      <CircularProgress size={"7em"}/>
    </paper>
  }

  const recommended_posts = posts.filter((postBySearch)=> postBySearch._id !== post._id )
  const openPost = (id) =>{navigate(`/posts/${id}`);window.location.reload()}

  const urlify_message = (text) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1">$1</a>')
  }

  return (
    <Paper elevation={6} className='mainpaper'>
        <div className='card' style={{display:'flex' ,flexDirection:'row'}}>
          <div className='section'>
            <Typography variant='h3' component='h2'>{post.title}</Typography>
            <Typography variant='h6'>Organizer : {post.organizer}</Typography>
            <Typography variant='h6' color="textSecondary" component='h2'>{post.tags.map((tag)=> `#${tag} `)}</Typography>
            <Typography variant='body1' component='p' style={{whiteSpace:'pre-wrap'}} dangerouslySetInnerHTML={{ __html: urlify_message(post.message) }}/>
            
            <Typography variant='body1'>Created {moment(post.createdAt).fromNow()}</Typography>
            <Divider style={{margin:'20px 0'}}/>

            <CommentSection post={post} id={post._id}/>

            {/* <Typography variant='body1'><strong>Comment - comming soon !!!</strong></Typography> */}
            <Divider style={{margin:'20px 0'}}/>
          </div>
          <div className='imagesection' style={{marginTop:'120px'}}>
            <img src={post.event_poster} alt={post.title} style={{borderRadius:'20px',objectFit:'cover',width:'100%',maxHeight:'380px',minWidth:'500px'}}/>
          </div>
        </div>
        {
          recommended_posts.length && ( //if recommended_posts is true only then check next
            <div> {/* for whole recommended posts section */}
              <Typography gutterBottom variant='h5'>You may also like :</Typography>
              <Divider/>

              <div style={{display:'flex',flexWrap:'wrap'}}>{/*for recommended posts */}

                {recommended_posts.map(({title,message,likeCount,event_poster,_id},index) => (
                  <div onClick={()=>openPost(_id)} key={_id}  className='smallcard'
                    style={{flex:' 1 1 18%',margin:'12px',cursor:'pointer'}}> {/*for individual post */}

                    <Paper style={{padding:'10px',borderRadius:'12px'}} elevation={2}>
                      <Typography gutterBottom variant='h6'>{title}</Typography>
                      <div style={{textAlign:'left'}}><Typography gutterBottom variant='subtitle2'>{message.substring(0,200)}...</Typography></div>
                      <Typography gutterBottom variant='subtitle1'>Likes : {likeCount}</Typography>
                      <img src={event_poster} width='200px' style={{ maxHeight:'110px',textAlign:'center' }} alt=""/>
                    </Paper>
                  </div>
                ))}
              </div>
            </div>
          )
        }
    </Paper>
  );
};

export default PostDetails;