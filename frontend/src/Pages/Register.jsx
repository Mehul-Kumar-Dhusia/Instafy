import React, { useContext, useState , useEffect } from "react";
import axios from 'axios'
import { AuthContext } from "../Context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {
  const { setCurrentUser , setFriends } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState("")
  const navigate = useNavigate()

  const createUser = async (e) => {
    e.preventDefault()
    try{
      const newUser = {
        username : name ,
        email : email ,
        password : password
      }
      const response = await axios.post('/auth/register' , newUser)
      setCurrentUser(response.data)
      window.localStorage.setItem('user', JSON.stringify(response.data)) 
      setFriends([])
      navigate('/')

    }catch(err){
      setError(err.response.data)
    }
  }

  return (
    <div className="register">
      <div className="register-wrapper">
        <h1>Instafy</h1>
        <form onSubmit={createUser} className="register-input">
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter Username"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter Password"
          />
          <button>Register</button>
          {error && <p style={{color:"red",marginBottom:"10px"}}>{error}</p>}
          <p>Already have an account ? <Link to='/login' style={{textDecoration:"none"}}>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
