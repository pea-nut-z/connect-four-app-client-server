## Web App - Connect Four

Click [here](https://drive.google.com/file/d/1MkOhLko22vGLN958mTbkm0QLf4dRq65f/view?usp=sharing) to watch me demonstrate the app.

### To get started

[Link to app](https://peanutz-connect-four.herokuapp.com/)

You can either sign up for an account or use a pre-existing account below for a test drive. Pre-existing accounts may have been used by others so the scores may not start from zero.

```
Email: test1@gmail.com
Email: test2@gmail.com
Email: test3@gmail.com

Password for all accounts : 123456
```

To test multi-player mode, go to the link in a second browser and log in with a different account.

### Context

This app was my first project when I started learning to code. I recently refactored the code to fix mistakes I made and improve performance.

The app uses React hooks, Socket.io, Firebase authentication and Real-time Database. It authenticates the user and tracks wins and the number of games you have played. In addition, it offers the option of playing in single or multiplayer mode.

In single-player mode, you are playing against Peanutbot (AI player). In multiplayer mode, a game starts when two players are connected. The third player connected to multiplayer mode will get an alert that the server is full, but they can play in single-player mode.

**Calculation**

Played: number of games you played  
Won: number of times you won  
Round: number of games for the current session

These trackers increment under different game results and circumstances for each player.

Game over:

|      | Played | Won |
| ---- | ------ | --- |
| Win  | +1     | +1  |
| Lose | +1     | 0   |
| Draw | +1     | 0   |

Replay or quit:

|                    | Played    | Won       | Round  |
| ------------------ | --------- | --------- | ------ |
| Before game starts | 0         | 0         | +1     |
| During game        | +1 / 0    | 0         | +1     |
| After game over    | see above | see above | +1 / 0 |

The player who triggers replay or quit during a game will have Played incremented while the other player will not.

Triggering replay will increment Round for both players, and quit will not.

### Potential future features

1. Multiple Web Sockets - enables more than two persons to play in multiplayer mode
2. Chat

### Road blocks

- [ ] Critical runtime in single player mode on a mobile device
- [ ] Authentication components at the "client/src/components/auth" directory are tested using Puppeteer, unlike others which use Jest. Its test files are at "client/\_\_tests\_\_/functional_tests". Puppeteer uses the build of the application to run the tests. Thus, it does not have source mapping. As a result, the coverage report is not present.

**Resolved**

- [x] A memory leak occurs at logging in again after logging out. It causes the score to be unable to sync

- [x] Playing against Peanutbot (AI) in a single-player mode took an average of 2660 to 2670 milliseconds for Peanutbot to execute its move. It has now reduced to an average of 1230 to 1240 milliseconds.
