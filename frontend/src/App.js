import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import './style.css'
import { Navigate, Route, Routes} from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "./Context/AuthContext";
function App() {
  const {currentUser} = useContext(AuthContext)
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
