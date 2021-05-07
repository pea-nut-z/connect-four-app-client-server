import firebase from "./firebase-init";

var ref = firebase.database().ref("http://localhost:3001");
ref.on("value", function (snapshot) {
  console.log(snapshot.val());
});
