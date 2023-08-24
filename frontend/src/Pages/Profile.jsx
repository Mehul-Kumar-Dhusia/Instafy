import React from 'react'
import LeftSidebar from '../Components/LeftSidebar/LeftSidebar'
import UserProfile from '../Components/UserProfile/UserProfile'

const Profile = () => {
  return (
    <div className='profile'>
      <LeftSidebar />
      <UserProfile />
    </div>
  )
}

export default Profile
