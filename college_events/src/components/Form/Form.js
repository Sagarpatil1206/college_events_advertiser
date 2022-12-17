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
  const dispach = useDispatch();
  const navigate = useNavigate();
  const [postData,setPostData] = useState({organizer: "", title: "", date:null, time:"",venue:"", message: "", tags: "", event_poster:""})
  const [eTime,seteTime] = useState(null);
  const post = useSelector((state) =>currentId ?  state.posts.posts.find((p)=>p._id === currentId) : null)

  useEffect(()=>{
    if(post) {setPostData(post);seteTime("2022-12-11T11:55:25.896Z");}
  },[post])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId===0){
      dispach(createPost(postData,navigate));
      clear();
    }else{
      dispach(updatePost(currentId,postData));
      dispach(getPosts());
      clear();
    }
  }

  const clear = () => {
    setCurrentId(0);
    seteTime(null);
    setPostData({organizer: "", title: "", date:null, time:null,venue:"", message: "", tags: "", event_poster:""})
  }

  return (
      <Paper className='paper' style={{padding: '16px 16px'}}>
        <form autoComplete="off" noValidate className='form' onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing` : `Creating`} a College Event</Typography>
        <TextField name="organizer" variant="outlined" label="Organizer" fullWidth value={postData.organizer} onChange={(e) => setPostData({ ...postData, organizer: e.target.value })} style={{margin:'8px 0'}}/>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} style={{margin:'8px 0px'}}/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date Picker"
            value={postData.date}
            onChange={(e) => setPostData({ ...postData, date:new Date(e).toDateString() })}
            renderInput={(params) => <TextField style={{margin:'8px 0px'}} fullWidth {...params} />}/>
        </LocalizationProvider>
        {/* <TextField name="date" variant="outlined" label="Date" fullWidth value={postData.date} onChange={(e) => setPostData({ ...postData, date: e.target.value })} style={{margin:'8px 0px'}}/> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Time Picker"
            value={eTime}
            onChange={(e) => {setPostData({ ...postData, time:new Date(e).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) });seteTime(e);}}
            renderInput={(params) => <TextField style={{margin:'8px 0px'}} fullWidth {...params} />}
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
            onDone={({ base64 }) =>
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