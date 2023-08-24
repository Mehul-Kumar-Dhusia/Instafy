import { createContext, useState} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [profileUserId , setProfileUserId] = useState("") 
  const [currentUser , setCurrentUser] = useState({})
  return (
    <AuthContext.Provider
      value={{
        profileUserId,
        setProfileUserId,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
