import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

let auth = app.auth();

// USE EMULATORS IN TEST ENVIRONMENT
if (window.location.hostname === "localhost" && process.env.REACT_APP_TEST) {
  app.database().useEmulator("localhost", 9000);
  app.auth().useEmulator("http://localhost:9099", { disableWarnings: false });
}

const base = Rebase.createClass(app.database());
export { app, auth };
export default base;
