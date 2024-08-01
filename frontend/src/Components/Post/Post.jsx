import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { format } from "timeago.js";
import "./Post.css";
import axios from "axios";
import {
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  Send,
  TurnedInNot,
  Favorite,
  Delete,
} from "@mui/icons-material";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Comment from "./Comment";

const Post = ({ item }) => {
  const { setProfileUserId, currentUser } = useContext(AuthContext);
  const [commentBox , setCommentBox] = useState(false) ;

  // const PF = "http://localhost:3000/images/";
  const PF = "http://instafy-backend.onrender.com/images/";
  const [user, setUser] = useState({});
  const [like, setLike] = useState(item.likes.length);
  const [isLike, setIsLike] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const profileClickHandler = () => {
    setProfileUserId(item.userId);
  };
  const likeChangeHandler = async () => {
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
    const response = await axios.put(process.env.REACT_APP_URL + "/post/" + item._id + "/like", {
      userId: currentUser._id,
    });
    console.log(response);
  };

  const deletePostHandler = async () => {
    setIsDelete(!isDelete);
    const url = process.env.REACT_APP_URL + "/post/" + item._id;
    const response = await axios.delete(url, { userId: currentUser._id });
    console.log(response.data);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const url = process.env.REACT_APP_URL + "/user/" + item.userId;
      const response = await axios.get(url);
      setUser(response.data);
      // console.log(PF + item.img);
      if (item.likes.includes(currentUser._id)) {
        setIsLike(true);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="post">
      <div className="postWrapper">
        {isDelete && (
          <div className="circularProgress">
            <CircularProgress />
          </div>
        )}
        <div className={`${isDelete && "postBody"}`}>
          <div className="postTop">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/profile/:${user.username}`}
            >
              <div onClick={profileClickHandler} className="postTopLeft">
                <img
                  src={user.profilePicture}
                  alt=""
                  className="postProfileImg"
                />
                <span className="postUsername">{user.username}</span>
                <span className="postTime">{format(item.createdAt)}</span>
              </div>
            </Link>
            <div onClick={deletePostHandler} className="postTopRight">
              {item.userId === currentUser._id && (
                <Delete
                  className="postTopRightIcon"
                  style={{ fontSize: "20px" }}
                />
              )}
            </div>
          </div>
          <div className="postCenter">
            <p className="postText">{item.text}</p>
            {item.img && <img className="postImg" src={PF + item.img} alt="" />}
            <div className="postReactionStatus">
              <div className="postLikes">{like} likes</div>
              <div className="postComment">{item.comments.length} Comments</div>
            </div>
          </div>
          <div className="postBottom">
            <div className="postBottomWrapper">
              <div onClick={likeChangeHandler} className="postReaction">
                {isLike ? (
                  <Favorite style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlined className="postReactionIcon" />
                )}
                <span>Like</span>
              </div>
              <div className="postReaction" onClick={() => {setCommentBox(!commentBox)}}>
                <ChatBubbleOutline className="postReactionIcon commentIcon" />
                <span>Comment</span>
              </div>
              <div className="postReaction">
                <Send className="postReactionIcon sendIcon" />
                <span>Share</span>
              </div>
              <div className="postReaction">
                <TurnedInNot className="postReactionIcon" />
                <span>Save</span>
              </div>
            </div>
          </div>
          {commentBox && <Comment item = {item} />}
        </div>
      </div>
    </div>
  );
};

export default Post;
