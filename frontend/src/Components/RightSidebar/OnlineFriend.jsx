import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OnlineFriend = ({item}) => {
  const [firendData , setFriendData] = useState({})
  useEffect(()=>{
    const fetchUser = async () => {
      const response = await axios.get('/user/' + item)
      setFriendData(response.data)
    }
    fetchUser()
  },[item])
  return (
    <div className='online-friend-single'>
      <div className="online-friend-image">
        <img src={firendData.profilePicture} alt="Friend" />
        {/* <div className="green-dot"></div> */}
      </div>
      <div className="online-friend-name">{firendData.username}</div>
    </div>
  )
}

export default OnlineFriend
