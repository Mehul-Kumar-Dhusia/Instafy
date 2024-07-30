import axios from "axios";
import { createContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [profileUserId , setProfileUserId] = useState("") 
  const [currentUser , setCurrentUser] = useState({})
  const [friends , setFriends] = useState([])

  return (
    <AuthContext.Provider
      value={{
        profileUserId,
        setProfileUserId,
        currentUser,
        setCurrentUser,
        friends,
        setFriends
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
