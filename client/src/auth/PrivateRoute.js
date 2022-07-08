import React, { useCallback, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { app } from "../firebase";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, logout } = useAuth();
  const [id, setId] = useState();
  const [data, setData] = useState();

  const incrementData = useCallback(
    (key1, key2) => {
      let updatedData = { ...data, [key1]: data[key1] + 1 };
      if (key2) updatedData = { ...updatedData, [key2]: data[key2] + 1 };
      const ref = app.database().ref(id);
      ref.update({ ...updatedData });
    },
    [data, id]
  );

  useEffect(() => {
    let ref;
    let newData;
    if (currentUser) {
      const uid = currentUser.uid;
      setId(uid);
      console.log("mount");
      ref = app.database().ref(uid);
      newData = ref.on(
        "value",
        (snapshot) => {
          snapshot.val() ? setData(snapshot.val()) : setData({ played: 0, won: 0 });
        },
        (error) => {
          console.error(error);
        }
      );
    }
    return () => {
      if (currentUser) {
        ref.off("value", newData);
      }
    };
  }, [currentUser]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component
            {...props}
            currentUser={currentUser}
            data={data}
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
