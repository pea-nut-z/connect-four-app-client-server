import React, { useContext, useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

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

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUser = (data) =>
    axios
      .patch("/user/update", data, {
        headers: {
          "Content-Type": "application/json",
          Autherization: `Bearer ${currentUser.token}`,
        },
      })
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res.data });
      });

  const value = {
    currentUser,
    setCurrentUser,
    updateUser,
    login,
    signup,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
