"use client";

import { useContext, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { USERACESSTOKEN } from "@/helpers/Constants";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logIn = async () => {
    let token = "";
    const expiryDate = new Date(
      currentDate.getTime() + 2 * 24 * 60 * 60 * 1000
    );
    Cookies.set(USERACESSTOKEN, token, { expires: expiryDate });
  };

  const logOut = async () => {
    Cookies.remove(USERACESSTOKEN);
  };

  useEffect(() => {}, [user]);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
