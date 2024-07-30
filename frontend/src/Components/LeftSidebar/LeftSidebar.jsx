import React, { useContext } from "react";
import "./LeftSidebar.css";
import {
  AddCircleOutline,
  ChatOutlined,
  GamepadOutlined,
  Home,
  Logout,
  NotificationsNone,
  Search,
} from "@mui/icons-material";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const LeftSidebar = () => {
  const { currentUser, setProfileUserId, setCurrentUser } =
    useContext(AuthContext);
  const Navigate = useNavigate();
  const profileClickHandler = () => {
    setProfileUserId(currentUser._id);
    Navigate("/profile/" + currentUser.username);
  };
  const logoutHandler = () => {
    localStorage.removeItem("user");
    setCurrentUser({});
    Navigate("/login");
  };
  return (
    <div className="left-side-bar">
      <div className="left-side-wrapper">
        <div className="logo">
          <div style={{ fontSize: "2.2rem", fontWeight: "500" }}>Instafy</div>
        </div>
        <div style={{ marginTop: "30px" }}>
          <ul>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <li>
                <Home style={{ fontSize: "1.7rem" }} />
                <span style={{ fontWeight: "bold" }}>Home</span>
              </li>
            </Link>
            {/* <li>
                  <Search style={{fontSize:"1.7rem"}} />
                  <span>Search</span>
                </li>
                <li>
                  <AddCircleOutline style={{fontSize:"1.7rem"}} />
                  <span>Create</span>
                </li>    
                <li>
                  <ChatOutlined style={{fontSize:"1.7rem"}} />
                  <span>Messages</span>
                </li>       
                <li>
                  <NotificationsNone style={{fontSize:"1.7rem"}} />
                  <span>Notification</span>
                </li> 
                <li>
                  <GamepadOutlined style={{fontSize:"1.7rem"}} />
                  <span>Games</span>
                </li>     */}
            <li onClick={profileClickHandler}>
              <div className="left-side-profile">
                <img src={currentUser.profilePicture} alt="" />
              </div>
              <span>Profile</span>
            </li>
            <li onClick={logoutHandler} style={{ color: "red",paddingLeft:"5px"}}>
              <Logout style={{marginLeft:"5px"}} />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
