## Web App - Connect Four

[Connect Four.webm](https://user-images.githubusercontent.com/66141752/192046744-abba1664-b347-48a1-86b7-6af46a50dda8.webm)


### [DEMO](https://drive.google.com/file/d/1MkOhLko22vGLN958mTbkm0QLf4dRq65f/view?usp=sharing) | [APP](https://peanutz-connect-four.herokuapp.com/)
It is hosted on Heroku Free Dyno and may take up to 30 seconds to load. 😅

### To get started

You can either sign up for an account or use a pre-existing account below for a test drive. Pre-existing accounts may have been used by others so the scores may not start from zero.

Pre-existing account emails:

```
test1@gmail.com
```

```
test2@gmail.com
```

```
test3@gmail.com
```

Password for all accounts :

```
123456
```

To try out multi-player mode, go to the link in an Incognito browser and log in with a different account. Using another computer or mobile device to log in with a different account and play against yourself is also an option.

This app was my first project when I started learning to code. I recently refactored the code to fix mistakes I made and improve performance. In single-player mode, you are playing against Peanutbot (AI player). In multiplayer mode, a game starts when two players are connected. The third player connected to multiplayer mode will get an alert that the server is full, but they can play in single-player mode.

### Tech-Stack

- JavaScript
- React
- Socket.io
- Firebase Authentication, Real-time Database and Emulators
- Jest
- Puppeteer
- Bootstrap

### Test

I mocked Socket.io and achieved 100% coverage using Jest for the game-related components.

<img src="client/public/test-coverage.jpg" width="75%" height="75%" alt="Test coverage table">

I utilized Puppeteer and Firebase emulators to test authentication-related components. The emulators allow testing without connecting to the actual Firebase server for authentication and retrieving data. I am adding more tests.

<img src="client/public/puppeteer-tests.jpg" width="75%" height="75%" alt="Authentication tests">

### Calculation

It authenticates the user and tracks wins and the number of games you have played.

Played: number of games you played  
Won: number of times you won  
Round: number of games for the current session

These trackers increment under different game results and scenarios when each player triggers the Replay or Quit button.

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

### Road blocks

**Resolved**

- [x] A memory leak occurs at logging in again after logging out. It causes the score to be unable to sync

- [x] Playing against Peanutbot (AI) in a single-player mode took an average of 2660 to 2670 milliseconds for Peanutbot to execute its move. It has now reduced to an average of 1230 to 1240 milliseconds.

- [x] Critical runtime in single player mode on a mobile device

- [x] Authentication components are tested using Puppeteer. Puppeteer uses the build of the application to run the tests. Thus, it does not have source mapping. As a result, the coverage report is not present.

### Potential future features

- Multiple sockets - enables more than two persons to play in multiplayer mode
- Chat
