(this["webpackJsonpconnect-four"] = this["webpackJsonpconnect-four"] || []).push([
  [0],
  {
    119: function (e, t, a) {},
    121: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(1),
        r = a.n(n),
        c = a(30),
        s = a.n(c),
        i = a(124),
        o = a(8),
        l = a(68),
        u = a.n(l),
        d = a(37),
        j =
          (a(49),
          a(80),
          d.default.initializeApp({
            apiKey: "AIzaSyBgr9G-PNput-ub3WUqUFwj9ujDw42hPOk",
            authDomain: "connect-four-development.firebaseapp.com",
            databaseURL: "https://connect-four-development-default-rtdb.firebaseio.com",
            projectId: "connect-four-development",
            storageBucket: Object({
              NODE_ENV: "production",
              PUBLIC_URL: "",
              WDS_SOCKET_HOST: void 0,
              WDS_SOCKET_PATH: void 0,
              WDS_SOCKET_PORT: void 0,
              FAST_REFRESH: !0,
              REACT_APP_FIREBASE_API_KEY: "AIzaSyBgr9G-PNput-ub3WUqUFwj9ujDw42hPOk",
              REACT_APP_FIREBASE_AUTH_DOMAIN: "connect-four-development.firebaseapp.com",
              REACT_APP_FIREBASE_DATABASE_URL:
                "https://connect-four-development-default-rtdb.firebaseio.com",
              REACT_APP_FIREBASE_PROJECT_ID: "connect-four-development",
              REACT_APP_FIREBASE_STOREAGE_BUCKET: "connect-four-development.appspot.com",
              REACT_APP_FIREBASE_MESSAGING_SENDER_ID: "790566826312",
              REACT_APP_FIREBASE_APP_ID: "1:790566826312:web:213915aaf3255f0eb1437d",
            }).REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: "790566826312",
            appId: "1:790566826312:web:213915aaf3255f0eb1437d",
          })),
        b = j.auth();
      "localhost" === window.location.hostname &&
        Object({
          NODE_ENV: "production",
          PUBLIC_URL: "",
          WDS_SOCKET_HOST: void 0,
          WDS_SOCKET_PATH: void 0,
          WDS_SOCKET_PORT: void 0,
          FAST_REFRESH: !0,
          REACT_APP_FIREBASE_API_KEY: "AIzaSyBgr9G-PNput-ub3WUqUFwj9ujDw42hPOk",
          REACT_APP_FIREBASE_AUTH_DOMAIN: "connect-four-development.firebaseapp.com",
          REACT_APP_FIREBASE_DATABASE_URL:
            "https://connect-four-development-default-rtdb.firebaseio.com",
          REACT_APP_FIREBASE_PROJECT_ID: "connect-four-development",
          REACT_APP_FIREBASE_STOREAGE_BUCKET: "connect-four-development.appspot.com",
          REACT_APP_FIREBASE_MESSAGING_SENDER_ID: "790566826312",
          REACT_APP_FIREBASE_APP_ID: "1:790566826312:web:213915aaf3255f0eb1437d",
        }).REACT_APP_TEST &&
        (j.database().useEmulator("localhost", 9e3),
        j.auth().useEmulator("http://localhost:9099", { disableWarnings: !1 }));
      var O = u.a.createClass(j.database()),
        p = a(2),
        f = r.a.createContext();
      function m() {
        return Object(n.useContext)(f);
      }
      function h(e) {
        var t = e.children,
          a = Object(n.useState)(),
          r = Object(o.a)(a, 2),
          c = r[0],
          s = r[1],
          i = Object(n.useState)(!0),
          l = Object(o.a)(i, 2),
          u = l[0],
          d = l[1];
        Object(n.useEffect)(function () {
          return b.onAuthStateChanged(function (e) {
            s(e), d(!1);
          });
        }, []);
        var j = {
          currentUser: c,
          login: function (e, t) {
            return b.signInWithEmailAndPassword(e, t);
          },
          signup: function (e, t) {
            return b.createUserWithEmailAndPassword(e, t);
          },
          logout: function () {
            return b.signOut();
          },
          resetPassword: function (e) {
            return b.sendPasswordResetEmail(e);
          },
          updateEmail: function (e) {
            return c.updateEmail(e);
          },
          updatePassword: function (e) {
            return c.updatePassword(e);
          },
        };
        return Object(p.jsx)(f.Provider, { value: j, children: !u && t });
      }
      var x = a(12),
        v = a(10),
        g = a(19),
        w = a(73);
      function S(e) {
        var t = e.component,
          a = Object(w.a)(e, ["component"]),
          n = m().currentUser;
        return Object(p.jsx)(
          v.b,
          Object(g.a)(
            Object(g.a)({}, a),
            {},
            {
              render: function (e) {
                return n
                  ? Object(p.jsx)(t, Object(g.a)({}, e))
                  : Object(p.jsx)(v.a, { to: "/login" });
              },
            }
          )
        );
      }
      var E = a(32),
        y = a(16),
        N = a.n(y),
        P = a(25),
        A = a(127),
        _ = a(125),
        R = a(123);
      function C(e) {
        var t = e.toggleGameMode,
          a = e.logout,
          r = e.updateProfile,
          c = e.userName,
          s = e.played,
          i = e.won,
          l = Object(v.g)(),
          u = Object(n.useState)(""),
          d = Object(o.a)(u, 2),
          j = d[0],
          b = d[1];
        function O() {
          return (O = Object(P.a)(
            N.a.mark(function e() {
              return N.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return b(""), (e.prev = 1), (e.next = 4), a();
                      case 4:
                        l.push("/login"), (e.next = 10);
                        break;
                      case 7:
                        (e.prev = 7), (e.t0 = e.catch(1)), b("Failed to log out");
                      case 10:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 7]]
              );
            })
          )).apply(this, arguments);
        }
        return Object(p.jsxs)(p.Fragment, {
          children: [
            Object(p.jsx)(A.a, {
              className: "box",
              children: Object(p.jsxs)(A.a.Body, {
                children: [
                  Object(p.jsxs)("h2", {
                    id: "userName",
                    className: "text-center mb-4",
                    children: ["Hello, ", c, "!"],
                  }),
                  Object(p.jsxs)("div", {
                    className: "row",
                    children: [
                      Object(p.jsxs)("h4", {
                        id: "played",
                        className: "col-6 text-center",
                        children: ["\ud83c\udfae \u2716\ufe0f ", s],
                      }),
                      Object(p.jsxs)("h4", {
                        id: "won",
                        className: "col-6 text-center",
                        children: ["\ud83c\udfc6 \u2716\ufe0f ", i],
                      }),
                    ],
                  }),
                  j && Object(p.jsx)(_.a, { variant: "danger", children: j }),
                  Object(p.jsx)(R.a, {
                    id: "single",
                    onClick: function () {
                      t("single");
                    },
                    className: "btn btn-warning w-100 mt-3",
                    children: "Challenge Peanutbot",
                  }),
                  Object(p.jsx)(R.a, {
                    id: "multi",
                    onClick: function () {
                      t("multi");
                    },
                    className: "btn btn-warning w-100 mt-3",
                    children: "Play With A Friend",
                  }),
                  Object(p.jsx)(R.a, {
                    id: "updateProfile",
                    className: "btn btn-warning w-100 mt-3",
                    onClick: r,
                    children: "Update Profile",
                  }),
                ],
              }),
            }),
            Object(p.jsx)("div", {
              className: "w-100 text-center mt-2",
              children: Object(p.jsx)(R.a, {
                id: "logoutBtn",
                variant: "link",
                className: "text-decoration-none",
                onClick: function () {
                  return O.apply(this, arguments);
                },
                children: "Log Out",
              }),
            }),
          ],
        });
      }
      function I(e) {
        var t = e.value,
          a = e.colIdx,
          n = e.handleMove;
        return Object(p.jsx)("div", {
          className: "square bg-primary",
          onClick: function () {
            return n(a);
          },
          children: Object(p.jsx)("div", {
            id: 0 === a ? "testCol0" : 2 === a ? "testCol2" : "",
            "data-testid": "square",
            className: "circle ".concat(t ? "p" + t : ""),
          }),
        });
      }
      function T(e) {
        for (var t = e[0].length, a = e.length - 1, n = [], r = 0; r < t; ) n.push(a), r++;
        return n;
      }
      function B(e, t, a) {
        for (
          var n = e[t][a],
            r = t - 1,
            c = t + 1,
            s = a - 1,
            i = a + 1,
            o = 1,
            l = 1,
            u = 1,
            d = 1,
            j = !0,
            b = !0,
            O = !0,
            p = !0,
            f = !0,
            m = !0,
            h = !0,
            x = !0;
          j || b || O || p || f || m || h || x;

        ) {
          var v, g, w, S, E, y;
          if (
            [o, l, u, d].some(function (e) {
              return e >= 4;
            })
          )
            return n;
          if (j) (null === (v = e[r]) || void 0 === v ? void 0 : v[a]) === n ? o++ : (j = !1);
          if (b) (null === (g = e[c]) || void 0 === g ? void 0 : g[a]) === n ? o++ : (b = !1);
          if ((O && (e[t][s] === n ? l++ : (O = !1)), p && (e[t][i] === n ? l++ : (p = !1)), f))
            (null === (w = e[r]) || void 0 === w ? void 0 : w[s]) === n ? u++ : (f = !1);
          if (m) (null === (S = e[c]) || void 0 === S ? void 0 : S[i]) === n ? u++ : (m = !1);
          if (h) (null === (E = e[r]) || void 0 === E ? void 0 : E[i]) === n ? d++ : (h = !1);
          if (x) (null === (y = e[c]) || void 0 === y ? void 0 : y[s]) === n ? d++ : (x = !1);
          r--, c++, s--, i++;
        }
        return [o, l, u, d].some(function (e) {
          return e >= 4;
        })
          ? n
          : 0 !== t || e[0].includes(0)
          ? void 0
          : "Draw";
      }
      function F(e, t, a, n, r, c, s) {
        var i = B(a, e, t);
        switch (i) {
          case 1:
            return [c, 10];
          case 2:
            return [c, -10];
          case "Draw":
            return [c, 0];
          case void 0:
            if (0 === c) return [c, 0];
            r[t] = 0 === e ? 9 : e - 1;
            break;
          default:
            console.log("uncaught result", i);
        }
        if (s) {
          for (var l = [], u = 1 / 0, d = -1 / 0, j = 0; j < n; j++)
            if (9 !== r[j]) {
              var b = r[j];
              a[b][j] = 1;
              var O = F(b, j, a, n, r, c - 1, !1);
              (r[j] = b), (a[b][j] = 0);
              var p = Object(o.a)(O, 2),
                f = p[0],
                m = p[1];
              (m > d || (m === d && f > u && m >= 0) || (m === d && f < u && m < 0)) &&
                ((u = f), (d = m), (l = O));
            }
          return l;
        }
        for (var h = [], x = 1 / 0, v = 1 / 0, g = 0; g < n; g++)
          if (9 !== r[g]) {
            var w = r[g];
            a[w][g] = 2;
            var S = F(w, g, a, n, r, c - 1, !0);
            (r[g] = w), (a[w][g] = 0);
            var E = Object(o.a)(S, 2),
              y = E[0],
              N = E[1];
            (N < v || (N === v && y < x && N >= 0) || (N === v && y > x && N < 0)) &&
              ((x = y), (v = N), (h = S));
          }
        return h;
      }
      var G = a(72),
        U = a.n(G),
        D = r.a.createContext(),
        k = U.a.connect("/", { forceNew: !0 }),
        L =
          (a(66),
          Object(n.forwardRef)(function (e, t) {
            var a = e.game,
              r = e.initialGrid,
              c = e.handleResult,
              s = e.opponent,
              i = e.currentPlayerNum,
              l = JSON.parse(JSON.stringify(r)),
              u = Object(n.useState)(l),
              d = Object(o.a)(u, 2),
              j = d[0],
              b = d[1],
              O = Object(n.useState)(T(r)),
              f = Object(o.a)(O, 2),
              m = f[0],
              h = f[1],
              x = Object(n.useState)(!0),
              v = Object(o.a)(x, 2),
              g = v[0],
              w = v[1],
              S = Object(n.useState)(!0),
              E = Object(o.a)(S, 2),
              y = E[0],
              N = E[1],
              P = Object(n.useState)(),
              A = Object(o.a)(P, 2),
              _ = A[0],
              R = A[1],
              C = 1 === i ? "#f012be" : "#2ecc40",
              G = 1 === i ? "#2ecc40" : "#f012be",
              U = Object(n.useContext)(D);
            Object(n.useImperativeHandle)(t, function () {
              return { grid: j, resetGrid: k, toggleGameOver: L };
            });
            var k = function (e) {
                "single" === a && 1 === e && N(!0), b(l), h(T(r)), w(!1), R(!_);
              },
              L = function (e) {
                w(e);
              };
            Object(n.useEffect)(
              function () {
                if (!g && "single" === a && !y) {
                  var e = j.slice(),
                    t = m.slice();
                  setTimeout(function () {
                    var a = (function (e, t) {
                        for (var a, n = e[0].length, r = [], c = 1 / 0, s = 0; s < n; s++)
                          if (9 !== t[s]) {
                            var i = t[s];
                            e[i][s] = 2;
                            var l = F(i, s, e, n, t, 7, !0);
                            (t[s] = i), (e[i][s] = 0);
                            var u = Object(o.a)(l, 2),
                              d = u[0],
                              j = u[1];
                            j < c || (j === c && d < a && j >= 0) || (j === c && d > a && j < 0)
                              ? ((a = d), (c = j), (r = []).push([i, s]))
                              : j === c && d === a && r.push([i, s]);
                          }
                        var b = Math.floor(Math.random() * r.length);
                        return performance.now(), r[b];
                      })(e, t),
                      n = Object(o.a)(a, 2),
                      r = n[0],
                      s = n[1];
                    (e[r][s] = 2), b(e);
                    var i = B(e, r, s);
                    if (i) w(!0), c(i);
                    else {
                      var l = 0 === r ? 9 : r - 1;
                      (t[s] = l), h(t), N(!y);
                    }
                  }, 500);
                }
                "multi" === a &&
                  (N(!y),
                  U.emit("update-grid", { grid: j, rowChart: m, ready: y }),
                  U.on("update-grid", function (e) {
                    var t = e.grid,
                      a = e.rowChart,
                      n = e.ready;
                    b(t), N(n), h(a);
                  }));
              },
              [_]
            );
            var W = function (e) {
              if (!g && y) {
                if (9 === m[e]) return;
                var t = j.slice(),
                  n = m[e];
                (t[n][e] = i), b(t);
                var r = B(t, n, e);
                if (r) w(!0), c(r);
                else {
                  var s = m.slice(),
                    o = 0 === n ? 9 : n - 1;
                  (s[e] = o), h(s);
                }
                "single" === a && N(!1), R(!_);
              }
            };
            return Object(p.jsxs)(p.Fragment, {
              children: [
                Object(p.jsx)("div", {
                  id: "boarder",
                  children: Object(p.jsx)("div", {
                    id: "grid",
                    className: "grid",
                    children: j.map(function (e, t) {
                      return Object(p.jsx)(
                        "div",
                        {
                          className: "row",
                          children: e.map(function (e, t) {
                            return Object(p.jsx)(I, { value: e, colIdx: t, handleMove: W }, t);
                          }),
                        },
                        t
                      );
                    }),
                  }),
                }),
                Object(p.jsxs)("h4", {
                  "data-testid": "turn",
                  className: "text-center mt-4",
                  style: { color: y ? C : G },
                  children: [
                    !s && "Waiting for a player to join...",
                    g ? "" : y ? "Your turn" : "Waiting for ".concat(s, "..."),
                  ],
                }),
              ],
            });
          }));
      function W(e) {
        var t = e.userName,
          a = e.game,
          r = e.initialGrid,
          c = e.incrementData,
          s = e.toggleGameMode,
          i = Object(n.useState)(""),
          l = Object(o.a)(i, 2),
          u = l[0],
          d = l[1],
          j = Object(n.useState)(""),
          b = Object(o.a)(j, 2),
          O = b[0],
          f = b[1],
          m = Object(n.useState)(1),
          h = Object(o.a)(m, 2),
          x = h[0],
          v = h[1],
          g = Object(n.useState)(""),
          w = Object(o.a)(g, 2),
          S = w[0],
          E = w[1],
          y = Object(n.useState)(1),
          N = Object(o.a)(y, 2),
          P = N[0],
          A = N[1],
          _ = Object(n.useState)(0),
          C = Object(o.a)(_, 2),
          I = C[0],
          T = C[1],
          B = Object(n.useState)(0),
          F = Object(o.a)(B, 2),
          G = F[0],
          U = F[1],
          k = Object(n.useState)(""),
          W = Object(o.a)(k, 2),
          q = W[0],
          M = W[1],
          K = Object(n.useState)(""),
          H = Object(o.a)(K, 2),
          J = H[0],
          Y = H[1],
          z = Object(n.useState)(""),
          V = Object(o.a)(z, 2),
          Q = V[0],
          X = V[1],
          Z = Object(n.useState)(!1),
          $ = Object(o.a)(Z, 2),
          ee = $[0],
          te = $[1],
          ae = 1 === x ? O : u,
          ne = Object(n.useContext)(D),
          re = Object(n.useRef)();
        Object(n.useEffect)(function () {
          if (("single" === a && (d(t), f("Peanutbot")), "multi" === a))
            return (
              ne.on("full-server", function () {
                s(""), alert("Sorry, server is full.");
              }),
              ne.emit("player-connecting", { userName: t }),
              ne.on("player-1-connected", function (e) {
                d(t), E(t), e && f(e);
              }),
              ne.on("player-2-connected", function (e) {
                f(t), E(t), v(2), d(e);
              }),
              ne.on("player-has-joined", function (e) {
                var t = e.userName;
                0 === e.playerIndex ? d(t) : f(t), T(0), U(0);
              }),
              ne.on("player-disconnected", function (e) {
                var t = e.name;
                0 === e.num ? d("") : f(""), X("".concat(t, " left\ud83d\udca8"));
              }),
              function () {
                return ne.disconnect(S);
              }
            );
        }, []),
          Object(n.useEffect)(
            function () {
              "multi" === a &&
                (ne.emit("update-result-display-and-rounds", {
                  result: q,
                  currentPlayerName: S,
                  numOfRounds: P,
                }),
                ne.on("update-result-display-and-rounds", function (e) {
                  var t = e.result,
                    a = e.currentPlayerName,
                    n = e.numOfRounds;
                  A(n),
                    t
                      ? (Y(
                          "Draw" === t ? t + "! \ud83e\udd1d" : "\ud83d\ude31 YOU LOST! \ud83d\udca9"
                        ),
                        re.current.toggleGameOver(!0),
                        X("Waiting for ".concat(a, " to restart the game...")),
                        te(!0))
                      : (Y(""), X(""), te(!1), re.current.toggleGameOver(!1));
                }),
                ne.emit("update-score", { result: q }),
                ne.on("update-score", function (e) {
                  var t = e.result;
                  t && c("played"), 1 === t && T(I + 1), 2 === t && U(G + 1);
                }));
            },
            [q, P]
          ),
          Object(n.useEffect)(
            function () {
              u && O ? re.current.toggleGameOver(!1) : re.current.toggleGameOver(!0);
            },
            [u, O]
          );
        return Object(p.jsxs)("div", {
          className: "box",
          children: [
            Object(p.jsxs)("div", {
              className: "row",
              children: [
                Object(p.jsxs)("div", {
                  className: "col",
                  children: [
                    Object(p.jsxs)("h6", {
                      "data-testid": "numOfRounds",
                      className: "text-primary",
                      children: ["Round: ", P],
                    }),
                    Object(p.jsxs)("h4", {
                      children: [
                        Object(p.jsx)("span", {
                          "data-testid": "score1",
                          style: { color: "#f012be" },
                          children: I,
                        }),
                        Object(p.jsx)("span", { className: "text-primary", children: " vs " }),
                        Object(p.jsx)("span", {
                          "data-testid": "score2",
                          className: "text-success",
                          children: G,
                        }),
                      ],
                    }),
                  ],
                }),
                Object(p.jsxs)("div", {
                  className: "col align-self-end",
                  children: [
                    Object(p.jsxs)("h6", {
                      "data-testid": "p1Name",
                      className: "player row justify-content-end",
                      children: [
                        u || "Waiting...",
                        Object(p.jsx)("div", {
                          style: { background: "#f012be" },
                          className: "indicator rounded ml-2",
                        }),
                      ],
                    }),
                    Object(p.jsxs)("h6", {
                      "data-testid": "p2Name",
                      className: "player row justify-content-end",
                      children: [
                        O || "Waiting...",
                        Object(p.jsx)("div", { className: "bg-success indicator rounded ml-2" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            Object(p.jsx)(L, {
              ref: re,
              game: a,
              initialGrid: r,
              handleResult: function (e) {
                "multi" === a
                  ? "Draw" === e
                    ? Y(e + "! \ud83e\udd1d")
                    : (Y("\ud83e\udd42 YOU WIN! \ud83c\udf89"), c("won"))
                  : (1 === e &&
                      (Y("\ud83e\udd42 YOU WIN! \ud83c\udf89"), T(I + 1), c("won", "played")),
                    2 === e && (Y("\ud83d\ude31 YOU LOST! \ud83d\udca9"), U(G + 1), c("played")),
                    "Draw" === e && (Y(e + "! \ud83e\udd1d"), c("played"))),
                  X("Click Replay \u2b07\ufe0f"),
                  M(e);
              },
              opponent: ae,
              currentPlayerNum: x,
            }),
            Object(p.jsx)("h4", {
              "data-testid": "resultMsg",
              className: "text-center text-warning mt-4",
              children: J,
            }),
            Object(p.jsx)("h5", {
              "data-testid": "info",
              className: "text-center text-warning mt-4",
              children: Q,
            }),
            Object(p.jsx)(R.a, {
              disabled: ee,
              id: "replay",
              "data-testid": "replay",
              className: "btn-warning w-100 mt-4",
              onClick: function () {
                !q && c("played"), re.current.resetGrid(q), A(P + 1), Y(""), X(""), M("");
              },
              children: "Replay",
            }),
            Object(p.jsx)(R.a, {
              id: "quitBtn",
              "data-testid": "quit",
              className: "btn btn-warning w-100 mt-3 ",
              onClick: function () {
                var e = JSON.stringify(re.current.grid) === JSON.stringify(r);
                Q || q || e || c("played"), "multi" === a && window.location.reload(!1), s("");
              },
              children: "Quit",
            }),
          ],
        });
      }
      function q() {
        var e,
          t = Object(v.g)(),
          a = Object(v.h)(),
          r = m(),
          c = r.currentUser,
          s = r.logout,
          i = c.uid,
          l = c.displayName,
          u = (null === (e = a.state) || void 0 === e ? void 0 : e.userName) || l,
          d = (function () {
            for (
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 6,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 7,
                a = [],
                n = 0;
              n < e;

            )
              a.push(Array(t).fill(0)), n++;
            return a;
          })(),
          j = Object(n.useState)(JSON.parse(localStorage.getItem(i)) || {}),
          b = Object(o.a)(j, 2),
          f = b[0],
          h = b[1],
          x = Object(n.useState)(),
          w = Object(o.a)(x, 2),
          S = w[0],
          y = w[1];
        function N(e) {
          y(e);
        }
        return (
          Object(n.useEffect)(function () {
            var e = O.syncState(i, {
                context: {
                  setState: function (e) {
                    var t = e.data;
                    return h(Object(g.a)({}, t));
                  },
                  state: { data: f },
                },
                state: "data",
              }),
              t = e.context.state.data;
            return (
              0 === Object.keys(t).length &&
                (O.post(i, { data: { played: 0, won: 0 } }), h({ played: 0, won: 0 })),
              function () {
                O.removeBinding(e);
              }
            );
          }, []),
          Object(n.useEffect)(
            function () {
              localStorage.setItem(i, JSON.stringify(f));
            },
            [f]
          ),
          Object(p.jsx)(p.Fragment, {
            children: S
              ? Object(p.jsx)(D.Provider, {
                  value: k,
                  children: Object(p.jsx)(W, {
                    userName: u,
                    game: S,
                    initialGrid: d,
                    incrementData: function (e, t) {
                      var a = Object(g.a)(Object(g.a)({}, f), {}, Object(E.a)({}, e, f[e] + 1));
                      t && (a = Object(g.a)(Object(g.a)({}, a), {}, Object(E.a)({}, t, f[t] + 1))),
                        h(a),
                        O.post(i, { data: a });
                    },
                    toggleGameMode: N,
                  }),
                })
              : Object(p.jsx)(C, {
                  toggleGameMode: N,
                  logout: s,
                  updateProfile: function () {
                    t.push("/update-profile");
                  },
                  userName: u,
                  played: f.played,
                  won: f.won,
                }),
          })
        );
      }
      var M = a(126);
      function K() {
        var e = Object(n.useRef)(),
          t = Object(n.useRef)(),
          a = Object(n.useRef)(),
          r = Object(n.useRef)(),
          c = m(),
          s = c.currentUser,
          i = c.updatePassword,
          l = c.updateEmail,
          u = Object(n.useState)(""),
          d = Object(o.a)(u, 2),
          j = d[0],
          b = d[1],
          O = Object(n.useState)(!1),
          f = Object(o.a)(O, 2),
          h = f[0],
          g = f[1],
          w = Object(v.g)();
        return Object(p.jsxs)(p.Fragment, {
          children: [
            Object(p.jsx)(A.a, {
              children: Object(p.jsxs)(A.a.Body, {
                children: [
                  Object(p.jsx)("h2", { className: "text-center mb-4", children: "Update Profile" }),
                  j && Object(p.jsx)(_.a, { variant: "danger", children: j }),
                  Object(p.jsxs)(M.a, {
                    onSubmit: function (n) {
                      if ((n.preventDefault(), a.current.value !== r.current.value))
                        return b("Passwords do not match");
                      var c = [];
                      g(!0),
                        b(""),
                        e.current.value !== s.displayName &&
                          c.push(s.updateProfile({ displayName: e.current.value })),
                        t.current.value !== s.email && c.push(l(t.current.value)),
                        a.current.value && c.push(i(a.current.value)),
                        Promise.all(c)
                          .then(function () {
                            w.push("/");
                          })
                          .catch(function () {
                            b("Failed to update account"), g(!1);
                          });
                    },
                    children: [
                      Object(p.jsxs)(M.a.Group, {
                        id: "username",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Username" }),
                          Object(p.jsx)(M.a.Control, {
                            id: "usernameInput",
                            type: "text",
                            ref: e,
                            required: !0,
                            defaultValue: s.displayName,
                          }),
                        ],
                      }),
                      Object(p.jsxs)(M.a.Group, {
                        id: "email",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Email" }),
                          Object(p.jsx)(M.a.Control, {
                            type: "email",
                            ref: t,
                            required: !0,
                            defaultValue: s.email,
                          }),
                        ],
                      }),
                      Object(p.jsxs)(M.a.Group, {
                        id: "password",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Password" }),
                          Object(p.jsx)(M.a.Control, {
                            type: "password",
                            ref: a,
                            placeholder: "Leave blank to keep the same",
                          }),
                        ],
                      }),
                      Object(p.jsxs)(M.a.Group, {
                        id: "password-confirm",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Password Confirmation" }),
                          Object(p.jsx)(M.a.Control, {
                            type: "password",
                            ref: r,
                            placeholder: "Leave blank to keep the same",
                          }),
                        ],
                      }),
                      Object(p.jsx)(R.a, {
                        id: "updateBtn",
                        disabled: h,
                        className: "w-100",
                        type: "submit",
                        children: "Update",
                      }),
                    ],
                  }),
                ],
              }),
            }),
            Object(p.jsx)("div", {
              className: "w-100 text-center mt-2",
              children: Object(p.jsx)(x.b, { id: "cancelLink", to: "/", children: "Cancel" }),
            }),
          ],
        });
      }
      function H() {
        var e = Object(n.useRef)(),
          t = Object(n.useRef)(),
          a = Object(n.useRef)(),
          r = Object(n.useRef)(),
          c = m().signup,
          s = Object(n.useState)(""),
          i = Object(o.a)(s, 2),
          l = i[0],
          u = i[1],
          d = Object(n.useState)(!1),
          j = Object(o.a)(d, 2),
          b = j[0],
          O = j[1],
          f = Object(v.g)();
        function h() {
          return (h = Object(P.a)(
            N.a.mark(function n(s) {
              return N.a.wrap(
                function (n) {
                  for (;;)
                    switch ((n.prev = n.next)) {
                      case 0:
                        if ((s.preventDefault(), a.current.value === r.current.value)) {
                          n.next = 3;
                          break;
                        }
                        return n.abrupt("return", u("Passwords do not match"));
                      case 3:
                        return (
                          (n.prev = 3),
                          u(""),
                          O(!0),
                          (n.next = 8),
                          c(t.current.value, a.current.value).then(function (t) {
                            t.user.updateProfile({ displayName: e.current.value });
                          })
                        );
                      case 8:
                        f.push("/", { userName: e.current.value }), (n.next = 15);
                        break;
                      case 11:
                        (n.prev = 11), (n.t0 = n.catch(3)), u("Failed to create an account"), O(!1);
                      case 15:
                      case "end":
                        return n.stop();
                    }
                },
                n,
                null,
                [[3, 11]]
              );
            })
          )).apply(this, arguments);
        }
        return Object(p.jsxs)(p.Fragment, {
          children: [
            Object(p.jsx)(A.a, {
              children: Object(p.jsxs)(A.a.Body, {
                children: [
                  Object(p.jsx)("h2", { className: "text-center mb-4", children: "Sign Up" }),
                  l && Object(p.jsx)(_.a, { variant: "danger", children: l }),
                  Object(p.jsxs)(M.a, {
                    onSubmit: function (e) {
                      return h.apply(this, arguments);
                    },
                    children: [
                      Object(p.jsxs)(M.a.Group, {
                        id: "username",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Username" }),
                          Object(p.jsx)(M.a.Control, {
                            id: "nameInput",
                            type: "text",
                            ref: e,
                            required: !0,
                          }),
                        ],
                      }),
                      Object(p.jsxs)(M.a.Group, {
                        id: "email",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Email" }),
                          Object(p.jsx)(M.a.Control, {
                            id: "emailInput",
                            type: "email",
                            ref: t,
                            required: !0,
                          }),
                        ],
                      }),
                      Object(p.jsxs)(M.a.Group, {
                        id: "password",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Password" }),
                          Object(p.jsx)(M.a.Control, {
                            id: "passwordInput",
                            type: "password",
                            placeholder: "Minimum 6 characters",
                            ref: a,
                            required: !0,
                          }),
                        ],
                      }),
                      Object(p.jsxs)(M.a.Group, {
                        id: "password-confirm",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Password Confirmation" }),
                          Object(p.jsx)(M.a.Control, {
                            id: "confirmPasswordInput",
                            type: "password",
                            ref: r,
                            required: !0,
                          }),
                        ],
                      }),
                      Object(p.jsx)(R.a, {
                        id: "signupBtn",
                        disabled: b,
                        className: "w-100",
                        type: "submit",
                        children: "Sign Up",
                      }),
                    ],
                  }),
                ],
              }),
            }),
            Object(p.jsxs)("div", {
              className: "w-100 text-center mt-2",
              children: [
                "Already have an account?",
                " ",
                Object(p.jsx)(x.b, {
                  className: "text-decoration-none",
                  to: "/login",
                  children: "Log In",
                }),
              ],
            }),
          ],
        });
      }
      function J() {
        var e = Object(n.useRef)(),
          t = Object(n.useRef)(),
          a = m().login,
          r = Object(n.useState)(""),
          c = Object(o.a)(r, 2),
          s = c[0],
          i = c[1],
          l = Object(n.useState)(!1),
          u = Object(o.a)(l, 2),
          d = u[0],
          j = u[1],
          b = Object(v.g)();
        function O() {
          return (O = Object(P.a)(
            N.a.mark(function n(r) {
              return N.a.wrap(
                function (n) {
                  for (;;)
                    switch ((n.prev = n.next)) {
                      case 0:
                        return (
                          r.preventDefault(),
                          (n.prev = 1),
                          i(""),
                          j(!0),
                          (n.next = 6),
                          a(e.current.value, t.current.value)
                        );
                      case 6:
                        b.push("/"), (n.next = 13);
                        break;
                      case 9:
                        (n.prev = 9), (n.t0 = n.catch(1)), j(!1), i("Failed to log in");
                      case 13:
                      case "end":
                        return n.stop();
                    }
                },
                n,
                null,
                [[1, 9]]
              );
            })
          )).apply(this, arguments);
        }
        return Object(p.jsxs)(p.Fragment, {
          children: [
            Object(p.jsx)("h1", {
              "data-testid": "title",
              className: "title text-center text-primary",
              children: "Connect Four",
            }),
            Object(p.jsx)(A.a, {
              className: "box",
              children: Object(p.jsxs)(A.a.Body, {
                children: [
                  s && Object(p.jsx)(_.a, { id: "error", variant: "danger", children: s }),
                  Object(p.jsxs)(M.a, {
                    onSubmit: function (e) {
                      return O.apply(this, arguments);
                    },
                    children: [
                      Object(p.jsxs)(M.a.Group, {
                        id: "email",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Email" }),
                          Object(p.jsx)(M.a.Control, {
                            id: "emailInput",
                            type: "email",
                            ref: e,
                            required: !0,
                          }),
                        ],
                      }),
                      Object(p.jsxs)(M.a.Group, {
                        id: "password",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Password" }),
                          Object(p.jsx)(M.a.Control, {
                            id: "passwordInput",
                            type: "password",
                            ref: t,
                            required: !0,
                          }),
                        ],
                      }),
                      Object(p.jsx)(R.a, {
                        id: "loginBtn",
                        disabled: d,
                        className: "btn-warning w-100",
                        type: "submit",
                        children: "Log In",
                      }),
                    ],
                  }),
                  Object(p.jsx)("div", {
                    className: "w-100 text-center mt-3",
                    children: Object(p.jsx)(x.b, {
                      className: "text-decoration-none",
                      to: "/forgot-password",
                      children: "Forgot Password?",
                    }),
                  }),
                ],
              }),
            }),
            Object(p.jsxs)("div", {
              className: "w-100 text-center mt-2",
              children: [
                "Need an account?",
                " ",
                Object(p.jsx)(x.b, {
                  id: "signupLink",
                  className: "text-decoration-none",
                  to: "/signup",
                  children: "Sign Up",
                }),
              ],
            }),
          ],
        });
      }
      function Y() {
        var e = Object(n.useRef)(),
          t = m().resetPassword,
          a = Object(n.useState)(""),
          r = Object(o.a)(a, 2),
          c = r[0],
          s = r[1],
          i = Object(n.useState)(""),
          l = Object(o.a)(i, 2),
          u = l[0],
          d = l[1],
          j = Object(n.useState)(!1),
          b = Object(o.a)(j, 2),
          O = b[0],
          f = b[1];
        function h() {
          return (h = Object(P.a)(
            N.a.mark(function a(n) {
              return N.a.wrap(
                function (a) {
                  for (;;)
                    switch ((a.prev = a.next)) {
                      case 0:
                        return (
                          n.preventDefault(),
                          (a.prev = 1),
                          d(""),
                          s(""),
                          f(!0),
                          (a.next = 7),
                          t(e.current.value)
                        );
                      case 7:
                        d("Check your inbox for further instructions"), (a.next = 13);
                        break;
                      case 10:
                        (a.prev = 10), (a.t0 = a.catch(1)), s("Failed to reset password");
                      case 13:
                        f(!1);
                      case 14:
                      case "end":
                        return a.stop();
                    }
                },
                a,
                null,
                [[1, 10]]
              );
            })
          )).apply(this, arguments);
        }
        return Object(p.jsxs)(p.Fragment, {
          children: [
            Object(p.jsx)(A.a, {
              children: Object(p.jsxs)(A.a.Body, {
                children: [
                  Object(p.jsx)("h2", { className: "text-center mb-4", children: "Password Reset" }),
                  c && Object(p.jsx)(_.a, { variant: "danger", children: c }),
                  u && Object(p.jsx)(_.a, { variant: "success", children: u }),
                  Object(p.jsxs)(M.a, {
                    onSubmit: function (e) {
                      return h.apply(this, arguments);
                    },
                    children: [
                      Object(p.jsxs)(M.a.Group, {
                        id: "email",
                        children: [
                          Object(p.jsx)(M.a.Label, { children: "Email" }),
                          Object(p.jsx)(M.a.Control, { type: "email", ref: e, required: !0 }),
                        ],
                      }),
                      Object(p.jsx)(R.a, {
                        disabled: O,
                        className: "w-100",
                        type: "submit",
                        children: "Reset Password",
                      }),
                    ],
                  }),
                  Object(p.jsx)("div", {
                    className: "w-100 text-center mt-3",
                    children: Object(p.jsx)(x.b, { to: "/login", children: "Login" }),
                  }),
                ],
              }),
            }),
            Object(p.jsxs)("div", {
              className: "w-100 text-center mt-2",
              children: [
                "Need an account? ",
                Object(p.jsx)(x.b, { to: "/signup", children: "Sign Up" }),
              ],
            }),
          ],
        });
      }
      a(119);
      function z() {
        return Object(p.jsx)(i.a, {
          className: "d-flex align-items-center justify-content-center",
          style: { minHeight: "100vh" },
          children: Object(p.jsx)("div", {
            className: "w-100",
            style: { maxWidth: "400px", minWidth: "400px" },
            children: Object(p.jsx)(x.a, {
              children: Object(p.jsx)(h, {
                children: Object(p.jsxs)(v.d, {
                  children: [
                    Object(p.jsx)(S, { exact: !0, path: "/", component: q }),
                    Object(p.jsx)(S, { path: "/update-profile", component: K }),
                    Object(p.jsx)(v.b, { path: "/signup", component: H }),
                    Object(p.jsx)(v.b, { path: "/login", component: J }),
                    Object(p.jsx)(v.b, { path: "/forgot-password", component: Y }),
                  ],
                }),
              }),
            }),
          }),
        });
      }
      a(120);
      s.a.render(
        Object(p.jsx)(r.a.StrictMode, { children: Object(p.jsx)(z, {}) }),
        document.getElementById("root")
      );
    },
    66: function (e, t, a) {},
  },
  [[121, 1, 2]],
]);
//# sourceMappingURL=main.61f70303.chunk.js.map
