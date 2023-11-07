import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import './style.css'
import { Navigate, Route, Routes} from "react-router-dom";
import { useContext, useEffect} from "react";
import { AuthContext } from "./Context/AuthContext";
import axios from "axios";

function App() {

  const {currentUser , setCurrentUser} = useContext(AuthContext)

  // useEffect(() => {
  //   const loginHandler = async () => {
  //     try{
  //       const loginUser = {
  //         email : "something@gmail.com" ,
  //         password : "12345"
  //       }
  //       const response = await axios.post('/auth/login' , loginUser)
  //       setCurrentUser(response.data)
  //     }catch(err){
  //        console.log("Something is wrong");
  //     }
  //   }
  //   loginHandler() ;
  // } , [currentUser])

  return (
    <div className="App">
    <Routes>
      <Route path="/" element= {currentUser._id ? <Home /> : <Navigate to='/login'/>} />
      {/* <Route path="/" element= {<Home />} /> */}
      <Route path="/register" element= {<Register />} />
      <Route path="/login" element= {<Login />} />
      <Route path="/profile/:username" element= {currentUser._id ? <Profile /> : <Navigate to='/login' />} />
    </Routes>
    </div>
  );
}

export default App;
