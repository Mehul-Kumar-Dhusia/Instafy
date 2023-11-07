import React, { useContext, useEffect, useState } from 'react'
import './RightSidebar.css'
import OnlineFriend from './OnlineFriend'
import { LightMode } from '@mui/icons-material'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const RightSidebar = () => {
  
  const {currentUser,setProfileUserId} = useContext(AuthContext)
  const [friends , setFriends] = useState([])
  const Navigate = useNavigate()

  const profileClickHandler = () => {
    setProfileUserId(currentUser._id)
    Navigate('/profile/' + currentUser.username)
  }

  useEffect(()=>{
    setFriends(currentUser.followers)
  },[currentUser.followers])



  
  return (
    <div className='right-side-bar'>
      <div className="right-side-wrapper">
        <div className="profileRightBar">
           <div className="RightBarInput">
            <input type="text" placeholder='Search' />
           </div>
          <div><LightMode /> </div>
          <img onClick={profileClickHandler} src={currentUser.profilePicture} alt="zoro" />
        </div>
        <h2>Your Friends</h2>
        <div className="online-friend-list">
        {friends.map((item)=>(
          <OnlineFriend item = {item} />
        ))}
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
