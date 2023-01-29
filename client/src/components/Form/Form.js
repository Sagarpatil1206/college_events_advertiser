import React, { useEffect, useState } from 'react';
import { TextField ,Button ,Typography ,Paper } from '@mui/material';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts, updatePost } from '../../actions/postActions';
import './styles.css'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useNavigate } from 'react-router-dom';

const Form = ({currentId,setCurrentId}) => {
  const dispach = useDispatch();//to dispatch actions
  const navigate = useNavigate();//to navigate to desired URL location
  const [postData,setPostData] = useState({organizer: "", title: "", date:null, time:"",venue:"", message: "", tags: "", event_poster:""})
  //contains data require for a card
  const [eTime,seteTime] = useState(null);

  const post = useSelector((state) =>currentId ?  state.posts.posts.find((p)=>p._id === currentId) : null)
  //useselector allows us to extract data from the Redux store state
  //if currentId is set then we will findout the post with current Id and set its info in the form so form will be autofilled with that post's info

  const user  = JSON.parse(localStorage.getItem('profile'));
  //getting user from localstorage

  useEffect(()=>{
    if(post) {setPostData(post);seteTime("2022-12-11T11:55:25.896Z");}
  },[post])//settting post for updation

  //on submit may be intend to 
  //1)create post
  //2)Update/Edit it
  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId===0){//if currentId is not set
      dispach(createPost(postData,navigate));// creating a post
      clear();
    }else{//if currentId is set
      dispach(updatePost(currentId,postData,navigate));
      dispach(getPosts());
      clear();
    }
  }

  //clear function clears the form , it sets the time
  const clear = () => {
    setCurrentId(0);
    seteTime(null);//setting form displayed value as null
    setPostData({organizer: "", title: "", date:null, time:null,venue:"", message: "", tags: "", event_poster:""})
  }

  //if user isn't login then we aren't returning a form instead we are returning a below inforamation
  if(!user?.result?.name){
    return(
      <Paper className='paper'>
        <Typography variant='h6' align='center'>
          Please sign in to <br/>
          1) Create your own events and like other's events <br/>
          2) Delete or update events created by you. <br/>
          3) Add comments on any event.
        </Typography>
      </Paper>
    )
  }

  //code for form
  return (
      <Paper className='paper' style={{padding: '10px 16px 16px 16px',marginTop:'32px'}}>
        <form  style={{marginTop:'12px'}} autoComplete="off" noValidate className='form' onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing` : `Creating`} a College Event</Typography>
        <TextField name="organizer" variant="outlined" label="Organizer" fullWidth value={postData.organizer} onChange={(e) => setPostData({ ...postData, organizer: e.target.value })} style={{margin:'8px 0'}}/>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} style={{margin:'8px 0px'}}/>
        {/* code for date picker option */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={postData.date}
            onChange={(e) => setPostData({ ...postData, date:new Date(e).toDateString() })}
            renderInput={(params) => <TextField style={{margin:'8px 0px'}} fullWidth {...params} helperText='click on Icon to select date'/>}/>
        </LocalizationProvider>
        {/* <TextField name="date" variant="outlined" label="Date" fullWidth value={postData.date} onChange={(e) => setPostData({ ...postData, date: e.target.value })} style={{margin:'8px 0px'}}/> */}
        {/* code for timepicker option */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Time"
            value={eTime} //if we select the time in given format , then only it shows the time in correct manner
            //but original format is clumsy and iincludes other useless info. So we are setting time with desire format
            //but for form saving keeping its value as required by timepicker
            onChange={(e) => {setPostData({ ...postData, time:new Date(e).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) });seteTime(e);}}
            renderInput={(params) => <TextField style={{margin:'8px 0px'}} fullWidth {...params} helperText='click on Icon to select time'/>}
          />
        </LocalizationProvider>
        {/* <TextField name="time" variant="outlined" label="Time" fullWidth value={postData.time} onChange={(e) => setPostData({ ...postData, time: e.target.value })} style={{margin:'8px 0px'}}/> */}
        <TextField name="venue" variant="outlined" label="Venue" fullWidth value={postData.venue} onChange={(e) => setPostData({ ...postData, venue: e.target.value })} style={{margin:'8px 0px'}}/>
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline maxRows={4} value={postData.message} onChange={(e) =>setPostData({ ...postData, message: e.target.value })} style={{margin:'8px 0px'}}/>
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} style={{margin:'8px 0px'}}/>
        <div className='fileinput'>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => //this converts the image file into string
              setPostData({ ...postData, event_poster: base64 })
            }
            style={{margin:'8px 0px'}}
          />
        </div>
        <Button className='submitButton' variant="contained" color="primary" size="large" type="submit" fullWidth style={{margin:'10px 0 10px 0'}}>
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
        </form>
      </Paper>
  );
};

export default Form;