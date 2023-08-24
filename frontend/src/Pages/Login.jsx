import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [error , setError] = useState("")
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault()
    try{
      const loginUser = {
        email : email ,
        password : password
      }
      const response = await axios.post('/auth/login' , loginUser)
      setCurrentUser(response.data)
      navigate('/')
    }catch(err){
      setError(err.response.data)
      setEmail("")
      setPassword("")
    }
    
  }
  return (
    <div className="register">
      <div className="register-wrapper">
        <h1>Instafy</h1>
        <form onSubmit={loginHandler} className="register-input">
          <input value={email} type="email" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value); setError("")}} />
          <input value={password} type="password" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}} />
          <button>Login</button>
           {error && <p style={{color:"red",marginBottom:"10px"}}>{error}</p>}
          <p>New to Instafy ? <Link to='/register' style={{textDecoration:"none"}}>Register</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login
