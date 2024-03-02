"use client"

import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("CURRENTUSER"));
  const [user, setUser] = useState(currentUser || null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
