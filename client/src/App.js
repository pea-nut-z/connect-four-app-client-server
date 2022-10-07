import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./screen/Dashboard";
import UpdateProfile from "./auth/UpdateProfile";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
  return (
    <Router>
       <div className="corner-wrapper">
        <p>PAULINE ZHANG</p>
        <a
          href="https://pauline-zhang.netlify.app/"
          className="portfolio-link"
          aria-label="Porfolio Link"
          target="_blank"
          rel="noreferrer"
        >
          <title>Portfolio Link</title>
          <p>See more</p>
        </a>
      </div>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}
