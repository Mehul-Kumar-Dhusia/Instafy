import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.css";
import OnlineFriend from "./OnlineFriend";
import { LightMode } from "@mui/icons-material";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const RightSidebar = () => {
  const { currentUser, setProfileUserId, friends, setFriends } =
    useContext(AuthContext);
  const Navigate = useNavigate();

  const dummyHandler = () => {
    // console.log(currentUser)
    console.log(friends);
  };

  const profileClickHandler = () => {
    setProfileUserId(currentUser._id);
    Navigate("/profile/" + currentUser.username);
  };

  useEffect(() => {
    if (friends.length == 0) {
      setFriends(currentUser.following);
    }
  }, []);

  return (
    <div className="right-side-bar">
      <div className="right-side-wrapper">
        {/* <div className="profileRightBar">
          <div className="RightBarInput">
            <input type="text" placeholder="Search" />
          </div>
          <div onClick={dummyHandler}>
            <LightMode />{" "}
          </div>
          <img
            onClick={profileClickHandler}
            src={currentUser.profilePicture}
            alt="zoro"
          />
        </div> */}
        <h2>Your Friends</h2>
        {friends.length ? (
          <div className="online-friend-list">
            {friends.map((item) => (
              <OnlineFriend item={item} />
            ))}
          </div>
        ) : (
          <div className="dummy-text">Follow anyone to add in Friends List</div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
