import React, { useCallback, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { app } from "../firebase";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, incrementData, logout } = useAuth();
  const [id, setId] = useState();
  const [data, setData] = useState();

  // const incrementData = useCallback(
  //   (key1, key2) => {
  //     let updatedData = { ...data, [key1]: data[key1] + 1 };
  //     if (key2) updatedData = { ...updatedData, [key2]: data[key2] + 1 };
  //     const ref = app.database().ref(id);
  //     ref.update({ ...updatedData });
  //     return "runs incrementDate call back";
  //   },
  //   [data, id]
  // );

  // useEffect(() => {
  //   let ref;
  //   let newData;
  //   if (currentUser) {
  //     console.log("there's a user @ PrivateRoute");
  //     setId(currentUser.uid);
  //     ref = app.database().ref(currentUser.uid);
  //     newData = ref.on(
  //       "value",
  //       (snapshot) => {
  //         snapshot.val() ? setData(snapshot.val()) : setData({ played: 0, won: 0 });
  //       },
  //       (error) => {
  //         console.error("retriving score error", error);
  //       }
  //     );
  //   }
  //   return () => {
  //     if (currentUser) {
  //       ref.off("value", newData);
  //     }
  //   };
  // }, [currentUser]);

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
