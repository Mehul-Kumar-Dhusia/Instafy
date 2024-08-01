import axios from "axios";
import { Delete } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const SingleComment = ({ val , item}) => {
  const {currentUser,setProfileUserId} = useContext(AuthContext)
  const [isDelete , setIsDelete] = useState(false) ;
  function mouseOverHandler(){
    setIsDelete(true)
  }
  function mouseLeaveHandler(){
    setIsDelete(false)
  }
  const deleteHandler = async () => {
    try{
      const response = await axios.put(process.env.REACT_APP_URL + "/post/" + item._id + "/deleteComment", {
        text : val.text,
        id : currentUser._id,
        username : currentUser.username,
        profilePicture : currentUser.profilePicture
      });
    }catch(err){
      console.log(err);
    }
  }

  function commentUserProfileClickHandler(){
    setProfileUserId(val.id);
  }
  return (
    <div className="comment-content" onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler}>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/profile/:${val.username}`}
      >
        <div onClick={commentUserProfileClickHandler}>
          <img src={val.profilePicture} alt="" />
        </div>
      </Link>
      <div
        style={{
          backgroundColor: "rgb(239, 242, 244)",
          flex: "1",
          marginRight: "5px",
          padding: "5px 10px",
          paddingBottom: "12px",
          borderRadius: "10px",
          borderTopLeftRadius: "0px",
        }}
      >
        <div style={{display:"flex" , justifyContent:"space-between"}}>
          <p style={{ fontWeight: "500", marginBottom: "5px" }}>
            {val.username}
          </p>
          {val.id === currentUser._id && isDelete && <Delete onClick = {deleteHandler} className="comment-delete" fontSize="10px"/>}
        </div>
        <p>{val.text}</p>
      </div>
    </div>
  );
};

export default SingleComment;
