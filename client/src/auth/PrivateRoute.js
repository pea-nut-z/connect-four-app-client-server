import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, updateUser, logout } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} currentUser={currentUser} updateUser={updateUser} logout={logout} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
