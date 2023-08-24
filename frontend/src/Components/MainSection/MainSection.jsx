import React, { useEffect, useState } from "react";
import "./MainSection.css";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";
import axios from 'axios'
// import { postData } from "../../Data";

const MainSection = () => {
  const [postData , setPostData] = useState([])
  useEffect(()=>{
    const fetchPost = async () => {
      const response = await axios.get("/post/")
      setPostData(response.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
    }
    fetchPost()
  },[postData])

  return (
    <div className="main-section">
      <div className="main-section-wrapper">
        <CreatePost />
        <div className="postContainer">
          {postData.map((item) => (
            <Post key = {item._id} item = {item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
