import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import Post from "../Post/Post";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const UserProfile = () => {
  const { profileUserId, currentUser, friends, setFriends } = useContext(AuthContext);
  const [profileUserData, setProfileUserData] = useState({});
  const [profileUserPostData, setProfileUserPostData] = useState([]);

  const [isFollow, setIsFollow] = useState(false);
  const [followerLength , setFollowerLength] = useState(0); 
  const [followingLength , setFollowingLength] = useState(0);

  useEffect(() => {
    const fetchProfileUser = async () => {
      const response = await axios.get("/user/" + profileUserId);
      const postResponse = await axios.get("/post/profile/" + profileUserId);
      setProfileUserPostData(postResponse.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
      setProfileUserData(response.data);
      setFollowerLength(response.data.followers.length)
      setFollowingLength(response.data.following.length)
      if(response.data.followers.includes(currentUser._id)){
        setIsFollow(true)
      }
      else{
        setIsFollow(false)
      }
    };
    fetchProfileUser();
  }, []);

  const followHandler = async () => {
    setIsFollow(true)
    setFollowerLength(followerLength + 1) ;
    const updateFriends = [...friends , profileUserId] ;
    setFriends(updateFriends) ;
    const response = await axios.put('/user/' + profileUserId + '/follow' , {userId : currentUser._id})
  }

  const UnFollowHandler = async () => {
    setIsFollow(false) ;
    setFollowerLength(followerLength - 1) ;
    setFriends(friends.filter(id => id != profileUserId)) ;
    const response = await axios.put('/user/' + profileUserId + '/unfollow' , {userId : currentUser._id})
  }

  return (
    <div className="user-profile">
      <div className="user-profile-top">
        <div className="background-photo">
          <img src={profileUserData.coverPicture} alt="" />
        </div>
        <div className="user-photo">
          <img src={profileUserData.profilePicture} alt="" />
          <h2>{profileUserData.username}</h2>
        </div>
      </div>
      <div className="user-profile-bottom">
        <div className="user-profile-bottom-left">
          <h4>Post</h4>
          <div className="postContainer">
            {profileUserPostData.map((item) => (
              <Post key={item._id} item={item} />
            ))}
          </div>
        </div>
        <div className="user-profile-bottom-right">
          <div className="user-information">
            <div className="follower-count">
              <p>
                <span>{profileUserPostData.length}</span> Posts
              </p>
              <p>
                <span>{followerLength}</span> Followers
              </p>
              <p>
                <span>{followingLength}</span> Following
              </p>
              {currentUser._id !== profileUserId &&
                (isFollow ? (
                  <div onClick={UnFollowHandler} className="user-profile-follow-button followed-button">
                    Following
                  </div>
                ) : (
                  <div onClick={followHandler} className="user-profile-follow-button">
                    Follow
                    <Add />
                  </div>
                ))}
            </div>
            <div className="desc">
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "500" }}>City</span>: East Blue
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "500" }}>Relationship</span>: Single
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "500" }}>Date of Birth</span>:
                13-01-2003
              </div>
            </div>
          </div>
          {/* <div className="user-friends">
            <h4>Friends</h4>
            <div className="friends-container">
             {profileUserData._id && profileUserData.following.map((item) =>(
              <div className="single-friend">
                <img
                  src="https://staticg.sportskeeda.com/editor/2022/01/52aff-16434112760139-1920.jpg"
                  alt="zoro"
                />
                <p>{item}</p>
              </div>
             ))}
              
              
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
