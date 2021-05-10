## A Connect Four browser game app

[Link to app](https://peanutz-connect-four.herokuapp.com/)

### Context

It uses React hooks and WebSockets. It authenticates the user, tracks wins and number of games you have played. It offers the options of playing in single or multiplayer mode.  
In single player mode, you are playing against Peanutbot (AI player). In multiplayer mode, a game starts when two players are connected. The third player connected to multiplayer mode will get an alert that the server is full but they can play in single player mode.

### To get started

You can either sign up for an account or use a pre-existing account below for a test drive. Pre-existing accounts may have been used by others so the scores may not start from zero.

Email: test1@gmail.com
Email: test2@gmail.com
Email: test3@gmail.com

Password for all accounts : 123456

### Potential future features

1. User experience - add a link to redirect the user to login page after they reset their password on a different window
2. Chat

### Road blocks

Testing is mostly in place. It is missing testing for authentications and sockets. I am using Firebase Authentication and Firebase real-time database. I tried mocking it but the resources were not up to date. Firebase has come up with an emulator for testing. My next step would be to give that a try.
