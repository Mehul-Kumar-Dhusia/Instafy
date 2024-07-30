import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import './style.css'
import { Navigate, Route, Routes} from "react-router-dom";
import { useContext, useEffect, useState} from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {

  const {currentUser , setCurrentUser} = useContext(AuthContext)
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser))
    }
    setLoading(false)
  }, []);


  if(loading){
    return (
      <Routes>
        <Route path="/login" element= {<Login />} />
      </Routes>
    )
  }

  return (
    <div className="App">
    <Routes>
      <Route path="/" element= {currentUser._id ? <Home /> : <Navigate to='/login'/>} />
      <Route path="/register" element= {<Register />} />
      <Route path="/login" element= {<Login />} />
      <Route path="/profile/:username" element= {currentUser._id ? <Profile /> : <Navigate to='/login' />} />
    </Routes>
    </div>
  );
}

export default App;
