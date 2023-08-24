import React from 'react'
import LeftSidebar from '../Components/LeftSidebar/LeftSidebar'
import MainSection from '../Components/MainSection/MainSection'
import RightSidebar from '../Components/RightSidebar/RightSidebar'

const Home = () => {
  return (
    <div className='home'>
    <LeftSidebar />
    <MainSection />
    <RightSidebar />
    </div>
  )
}

export default Home
