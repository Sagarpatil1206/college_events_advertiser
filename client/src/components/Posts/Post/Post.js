import React from "react";
import {Button,Card,CardActions,CardMedia,Typography,Dialog,DialogContent,DialogTitle} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import editicon from "../../../pictures/editicon.png";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { likePost, deletePost } from "../../../actions/postActions";

import moment from "moment";
import "./styles.css";
import { useDispatch } from "react-redux";

import ButtonBase from "@mui/material/ButtonBase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Post = ({ post, setCurrentId }) => {
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [open, setOpen] = React.useState(false);

  const openPost = () => navigate(`/posts/${post._id}`);

  const handleLike = async () => {
    const likesu = await dispatch(likePost(post._id));
    setLikes(likesu);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setCurrentId(post._id);
    // alert("Form will autofill with existing information now.Edit the required field in the form and submit");
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes?.find(
        (like) => like === (user?.result?._id || user?.result?.sub)
      ) ? (
        <>
          <ThumbUpIcon fontSize="small" />
          &nbsp;
          {likes?.length > 2
            ? `You and ${likes?.length - 1} others`
            : `${likes?.length} like${likes?.length === 2 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon variant="outlined" fontSize="small" />
          &nbsp;{likes?.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpOffAltIcon fontSize="small" />
          &nbsp;Like
        </>
      );
    }
  };

  const flag =
    user?.result?.sub === post.creator || user?.result?._id === post.creator;

  return (
    <>
    <Dialog
        open={open}
        onClose={handleClose}>
        <DialogContent color="black">
          <DialogTitle>
            Form is autofilled with existing information of this event now.<br/>Edit the required fields in the form and click submit.
          </DialogTitle>
          <div style={{display:'flex',justifyContent:'center'}}>
          <Button variant="contained" color="primary" onClick={handleClose}>Ok</Button>
          </div>
        </DialogContent>
      </Dialog>
    <Card
      className="card"
      style={{ borderRadius: "15px", justifyContent: "space-between" }}
      elevation={6}
    >
      <CardMedia
        className="media"
        image={post.event_poster}
        title={post.title}
        style={{ backgroundBlendMode: "darken" }}
      />
      <div className="overlay">
        <Typography variant="h6">{post.organizer}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {flag && (
        <div className="overlay2">
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={()=>{handleEdit();handleClickOpen();}}
            disabled={!flag}
          >
            <img className="overlay2" src={editicon} alt="EDIT ICON"/>
          </Button>
        </div>
      )}
      <ButtonBase
        onClick={openPost}
        style={{ display: "block", textAlign: "initial" }}
      >
        <div className="tags">
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          gutterBottom
          variant="h4"
          component="h2"
          align="center"
          style={{ fontWeight: 600 }}
        >
          {post.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2" style={{display:'flex',justifyContent:'left',marginLeft:'5px'}}>
          &nbsp; <EventIcon fontSize="medium" style={{margin:'5px 5px 0 0'}}/> Date : {post.date}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2" style={{display:'flex',justifyContent:'left',marginLeft:'5px'}}>
          &nbsp; <AccessTimeIcon fontSize="medium" style={{margin:'5px 5px 0 0'}}/> Time : {post.time}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2" style={{display:'flex',justifyContent:'left',marginLeft:'5px'}}>
          &nbsp; <LocationOnOutlinedIcon fontSize="medium" style={{margin:'5px 5px 0 0'}}/> Venue :{" "}
          {post.venue}
        </Typography>
        <div style={{ justifyContent: "space-between" }}>
          {/* <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
    </CardContent> */}
        </div>
      </ButtonBase>
      <CardActions
        className="cardactions"
        style={{ justifyContent: "space-between" }}
      >
        <Button
          size="small"
          color="primary"
          onClick={handleLike}
          disabled={!user?.result}
        >
          {" "}
          <Likes />{" "}
        </Button>
        {flag && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
            disabled={!flag}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
    </>
  );
};

export default Post;
