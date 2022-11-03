import React, { useCallback, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { app } from "../firebase";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, incrementData, logout } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component
            {...props}
            currentUser={currentUser}
            incrementData={incrementData}
            logout={logout}
          />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
