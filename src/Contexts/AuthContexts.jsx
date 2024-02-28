"use client";

import { useContext, createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Cookies from "js-cookie";
import { USERACESSTOKEN } from "@/helpers/Constants";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleLogIn = async () => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    const userAcesstoken = user.user.accessToken;
    const currentDate = new Date();
    const expiryDate = new Date(
      currentDate.getTime() + 2 * 24 * 60 * 60 * 1000
    );
    Cookies.set(USERACESSTOKEN, userAcesstoken, { expires: expiryDate });
  };

  const logOut = async () => {
    await signOut(auth);
    Cookies.remove(USERACESSTOKEN);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleLogIn, logOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
