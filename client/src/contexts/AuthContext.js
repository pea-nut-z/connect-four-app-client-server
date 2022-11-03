import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const resetPassword = (email) => auth.sendPasswordResetEmail(email);
  const updateEmail = (email) => currentUser.updateEmail(email);
  const updatePassword = (password) => currentUser.updatePassword(password);

  const signup = (email, password, userName) =>
    axios.post(
      "/user/signup",
      { email, password, userName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  const login = (email, password) =>
    axios.post(
      "/user/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  const incrementData = (data) => {
    axios
      .patch("/user/update", data, {
        headers: {
          "Content-Type": "application/json",
          Autherization: `Bearer ${currentUser.token}`,
        },
      })
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res.data });
      })
      .catch((err) => console.error("Update Error", err));
  };

  const value = {
    currentUser,
    setCurrentUser,
    incrementData,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
