import React from 'react'
import './Navbar.css'
import { Search } from '@mui/icons-material'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="left">
        <div className="logo">COSMOS</div>
      </div>
      <div className="middle">
        <div className="search">
            <Search />
            <input type="text" placeholder='Search Anything' />
        </div>
      </div>
      <div className="right">
        <div className="icons">

        </div>
        <div className="profile">

        </div>
      </div>
    </div>
  )
}

export default Navbar
