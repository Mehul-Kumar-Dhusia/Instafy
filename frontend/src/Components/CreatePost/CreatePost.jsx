import React, { useContext, useEffect, useState } from "react";
import "./CreatePost.css";
import {
  Cancel,
  EmojiEmotions,
  PhotoSizeSelectActual,
  VideoLibrary,
} from "@mui/icons-material";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const { currentUser, setProfileUserId } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [file , setFile] = useState(null)

  const navigate = useNavigate();

  // useEffect(()=> {
  //   console.log(file)
  // },[file])

  const profileClickHandler = async () => {
    setProfileUserId(currentUser._id);
    navigate("/profile/" + currentUser.username);
  };

  const CreatePostHandler = async (e) => {
    e.preventDefault()
    try {
      const newPost = {
        text: text,
        userId: currentUser._id,
      }
      if(file){
        const data = new FormData()
        data.append('file' , file)
        data.append('name' , file.name)
        newPost.img = file.name
        try{
          const response = await axios.post('/upload' , data)
          console.log(response.data)
        }catch(err){
          console.log(err)
        }
      }
      await axios.post("/post/", newPost);
      setFile(null)
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form method="post" encType="multipart/form-data" onSubmit={CreatePostHandler} className="create-post">
      <div className="create-post-upper-part">
        <div onClick={profileClickHandler} className="create-post-profile">
          <img src={currentUser.profilePicture} alt="" />
        </div>
        <div className="create-post-input">
          <input
            value={text}
            type="text"
            placeholder={`What's in your mind ${currentUser.username} ?`}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="create-post-lower-part">
        {file && <div className="previewImageContainer">
          <img src={URL.createObjectURL(file)} alt="" className="previewImage" />
          <Cancel onClick={()=> {setFile(null)}} className="previewCancel" />
        </div>}
        <div className="create-post-lower-part-body">

        <label
          htmlFor="file"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <PhotoSizeSelectActual style={{ color: "#E16745" }} />
          <div style={{ color: "rgb(100,100,100)" }}>Photo</div>
          <input name="file" style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])} />
        </label>
        <label
          htmlFor="videoFile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <VideoLibrary style={{ color: "#5F9B41" }} />
          <div style={{ color: "rgb(100,100,100)" }}>Video</div>
          <input type="file" id="videoFile" accept=".mp4" style={{display:"none"}} />
        </label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <EmojiEmotions style={{ color: "#C37D16" }} />
          <div style={{ color: "rgb(100,100,100)" }}>Feelings</div>
        </div>
        <button type='submit' className="create-post-Share-button">
          Share
        </button>
        </div>

      </div>
    </form>
  );
};

export default CreatePost;
