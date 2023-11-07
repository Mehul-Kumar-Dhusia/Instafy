import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Send } from '@mui/icons-material'
import { AuthContext } from '../../Context/AuthContext';
import SingleComment from './SingleComment';


const Comment = ({item}) => {

  const [text , setText] = useState("") ;
  const [commentsData , setCommentsData] = useState([]) ; 
  const {currentUser} = useContext(AuthContext)
  
  useEffect(() => {
    // console.log(item.comments)
    const tempArray = item.comments.reverse() ;
    setCommentsData(tempArray)
  },[item])

  const createCommentHandler = async (e) => {
    e.preventDefault() ;
    try{
      const response = await axios.put("/post/" + item._id + "/comment", {
        text : text,
        id : currentUser._id,
        username : currentUser.username,
        profilePicture : currentUser.profilePicture
      });
      setText("")
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className='post-comment-box'>
      <form className='comment-form' method="post" encType="multipart/form-data" onSubmit={createCommentHandler}>
        <input className='comment-input' value={text} type="text" placeholder='Add a comment...' onChange={(e) => {setText(e.target.value)}} />
        <button className='comment-submit-button' type='submit'><div style={{display:"flex" , alignItems:"center" , justifyContent:"center"}}><Send/></div></button>
      </form>
      <div className='post-comment-container'>
      {commentsData.map((val) => (
        <SingleComment val = {val} item = {item} />
      ))}
      </div>
    </div>
  )
}

export default Comment
