(this["webpackJsonpconnect-four"]=this["webpackJsonpconnect-four"]||[]).push([[0],{119:function(e,t,n){},120:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(29),s=n.n(c),i=n(7),o=n(67),u=n.n(o),l=n(43),d=(n(49),n(79),l.default.initializeApp({apiKey:"AIzaSyBgr9G-PNput-ub3WUqUFwj9ujDw42hPOk",authDomain:"connect-four-development.firebaseapp.com",databaseURL:"https://connect-four-development-default-rtdb.firebaseio.com",projectId:"connect-four-development",storageBucket:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_API_KEY:"AIzaSyBgr9G-PNput-ub3WUqUFwj9ujDw42hPOk",REACT_APP_FIREBASE_AUTH_DOMAIN:"connect-four-development.firebaseapp.com",REACT_APP_FIREBASE_DATABASE_URL:"https://connect-four-development-default-rtdb.firebaseio.com",REACT_APP_FIREBASE_PROJECT_ID:"connect-four-development",REACT_APP_FIREBASE_STOREAGE_BUCKET:"connect-four-development.appspot.com",REACT_APP_FIREBASE_MESSAGING_SENDER_ID:"790566826312",REACT_APP_FIREBASE_APP_ID:"1:790566826312:web:213915aaf3255f0eb1437d"}).REACT_APP_FIREBASE_STORAGE_BUCKET,messagingSenderId:"790566826312",appId:"1:790566826312:web:213915aaf3255f0eb1437d"})),j=d.auth();"localhost"===window.location.hostname&&Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_API_KEY:"AIzaSyBgr9G-PNput-ub3WUqUFwj9ujDw42hPOk",REACT_APP_FIREBASE_AUTH_DOMAIN:"connect-four-development.firebaseapp.com",REACT_APP_FIREBASE_DATABASE_URL:"https://connect-four-development-default-rtdb.firebaseio.com",REACT_APP_FIREBASE_PROJECT_ID:"connect-four-development",REACT_APP_FIREBASE_STOREAGE_BUCKET:"connect-four-development.appspot.com",REACT_APP_FIREBASE_MESSAGING_SENDER_ID:"790566826312",REACT_APP_FIREBASE_APP_ID:"1:790566826312:web:213915aaf3255f0eb1437d"}).REACT_APP_TEST&&(d.database().useEmulator("localhost",9e3),d.auth().useEmulator("http://localhost:9099",{disableWarnings:!1}));u.a.createClass(d.database());var b=n(2),O=r.a.createContext();function f(){return Object(a.useContext)(O)}function p(e){var t=e.children,n=Object(a.useState)(),r=Object(i.a)(n,2),c=r[0],s=r[1],o=Object(a.useState)(!0),u=Object(i.a)(o,2),l=u[0],d=u[1];Object(a.useEffect)((function(){return j.onAuthStateChanged((function(e){s(e),d(!1)}))}),[]);var f={currentUser:c,login:function(e,t){return j.signInWithEmailAndPassword(e,t)},signup:function(e,t){return j.createUserWithEmailAndPassword(e,t)},logout:function(){return j.signOut()},resetPassword:function(e){return j.sendPasswordResetEmail(e)},updateEmail:function(e){return c.updateEmail(e)},updatePassword:function(e){return c.updatePassword(e)}};return Object(b.jsx)(O.Provider,{value:f,children:!l&&t})}var m=n(24),x=n(10),h=n(18),v=n(72);function g(e){var t=e.component,n=Object(v.a)(e,["component"]),a=f().currentUser;return Object(b.jsx)(x.b,Object(h.a)(Object(h.a)({},n),{},{render:function(e){return a?Object(b.jsx)(t,Object(h.a)({},e)):Object(b.jsx)(x.a,{to:"/login"})}}))}var E=n(32),y=n(15),S=n.n(y),_=n(25),A=n(125),P=n(123),w=n(122);function N(e){var t=e.id,n=e.testid,a=e.link,r=e.text,c=e.disabled,s=e.type,i=e.func,o=e.funcArgu;return Object(b.jsx)(w.a,{className:"btn w-100 mt-3 text-center ".concat(a?"text-decoration-none":"btn btn-warning "),id:t,"data-testid":n,variant:a?"link":"warning",disabled:c,type:s,onClick:function(){return"button"===s&&i(o)},children:r})}var R=n(69),C=n.n(R),I=r.a.createContext(),T=C.a.connect("/",{reconnection:!1,forceNew:!0});function k(e){var t=e.value,n=e.colIdx,a=e.handleMove;return Object(b.jsx)("div",{className:"square bg-primary",onClick:function(){return a(n)},children:Object(b.jsx)("div",{id:0===n?"testCol0":2===n?"testCol2":"","data-testid":"square",className:"circle ".concat(t?"p"+t:"")})})}var B=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:7,n=[],a=0;a<e;)n.push(Array(t).fill(0)),a++;return n},U=B();var D=function(e){for(var t=e[0].length,n=e.length-1,a=[],r=0;r<t;)a.push(n),r++;return a}(B());function F(e,t,n){for(var a=e[t][n],r=t-1,c=t+1,s=n-1,i=n+1,o=1,u=1,l=1,d=1,j=!0,b=!0,O=!0,f=!0,p=!0,m=!0,x=!0,h=!0;j||b||O||f||p||m||x||h;){var v,g,E,y,S,_;if([o,u,l,d].some((function(e){return e>=4})))return a;if(j)(null===(v=e[r])||void 0===v?void 0:v[n])===a?o++:j=!1;if(b)(null===(g=e[c])||void 0===g?void 0:g[n])===a?o++:b=!1;if(O&&(e[t][s]===a?u++:O=!1),f&&(e[t][i]===a?u++:f=!1),p)(null===(E=e[r])||void 0===E?void 0:E[s])===a?l++:p=!1;if(m)(null===(y=e[c])||void 0===y?void 0:y[i])===a?l++:m=!1;if(x)(null===(S=e[r])||void 0===S?void 0:S[i])===a?d++:x=!1;if(h)(null===(_=e[c])||void 0===_?void 0:_[s])===a?d++:h=!1;r--,c++,s--,i++}return[o,u,l,d].some((function(e){return e>=4}))?a:0!==t||e[0].includes(0)?void 0:"Draw"}function L(e,t,n,a,r,c,s){var o=F(n,e,t);switch(o){case 1:return[c,10];case 2:return[c,-10];case"Draw":return[c,0];case void 0:if(0===c)return[c,0];r[t]=0===e?9:e-1;break;default:console.log("uncaught result",o)}if(s){for(var u=[],l=1/0,d=-1/0,j=0;j<a;j++)if(9!==r[j]){var b=r[j];n[b][j]=1;var O=L(b,j,n,a,r,c-1,!1);r[j]=b,n[b][j]=0;var f=Object(i.a)(O,2),p=f[0],m=f[1];(m>d||m===d&&p>l&&m>=0||m===d&&p<l&&m<0)&&(l=p,d=m,u=O)}return u}for(var x=[],h=1/0,v=1/0,g=0;g<a;g++)if(9!==r[g]){var E=r[g];n[E][g]=2;var y=L(E,g,n,a,r,c-1,!0);r[g]=E,n[E][g]=0;var S=Object(i.a)(y,2),_=S[0],A=S[1];(A<v||A===v&&_<h&&A>=0||A===v&&_>h&&A<0)&&(h=_,v=A,x=y)}return x}var G=Object(a.forwardRef)((function(e,t){var n=e.game,r=e.handleResultCb,c=e.opponentName,s=e.thisPlayerNum,o=e.gameOver,u=Object(a.useState)(U),l=Object(i.a)(u,2),d=l[0],j=l[1],O=Object(a.useState)(D),f=Object(i.a)(O,2),p=f[0],m=f[1],x=Object(a.useState)("single"===n),h=Object(i.a)(x,2),v=h[0],g=h[1],E=Object(a.useMemo)((function(){return 1===s?"#f012be":"#2ecc40"}),[s]),y=Object(a.useMemo)((function(){return 1===s?"#2ecc40":"#f012be"}),[s]),S=Object(a.useContext)(I);Object(a.useImperativeHandle)(t,(function(){return{grid:d,resetGrid:_}}));var _=function(){j(U),m(D),"single"!==n||v||setTimeout((function(){A(U,D)}),100)},A=function(e,t){var n=e.map((function(e){return e.slice()})),a=t.slice(),c=function(e,t){for(var n,a=e[0].length,r=[],c=1/0,s=0;s<a;s++)if(9!==t[s]){var o=t[s];e[o][s]=2;var u=L(o,s,e,a,t,7,!0);t[s]=o,e[o][s]=0;var l=Object(i.a)(u,2),d=l[0],j=l[1];j<c||j===c&&d<n&&j>=0||j===c&&d>n&&j<0?(n=d,c=j,(r=[]).push([o,s])):j===c&&d===n&&r.push([o,s])}return r[Math.floor(Math.random()*r.length)]}(n,a),s=Object(i.a)(c,2),o=s[0],u=s[1];n[o][u]=2,j(n);var l=F(n,o,u);if(l)r(l);else{var d=0===o?9:o-1;a[u]=d,m(a),g(!0)}},P=function(e){if(!o&&v){if(9===p[e])return;var t,a=d.map((function(e){return e.slice()})),c=p[e];a[c][e]=s,j(a);var i=F(a,c,e);if(i)S.emit("result",{result:i,playerNum:s}),r(i,s);else{g(!1);var u=0===c?9:c-1;(t=p.slice())[e]=u,m(t),"single"===n&&setTimeout((function(){A(a,t)}),100)}"multi"===n&&S.emit("update-grid",{grid:a,rowChart:t,result:i})}};return Object(a.useEffect)((function(){return"multi"===n&&(S.emit("go-first"),S.on("go-first",(function(){g(!0),j(U),m(D)}))),S.on("update-grid",(function(e){var t=e.grid,n=e.rowChart;e.result||g(!0),j(t),m(n)})),function(){S.off("go-first"),S.off("update-grid")}}),[S,n]),Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{id:"grid",className:"grid",children:d.map((function(e,t){return Object(b.jsx)("div",{className:"row grid_row",children:e.map((function(e,t){return Object(b.jsx)(k,{value:e,colIdx:t,handleMove:P},t)}))},t)}))}),Object(b.jsxs)("h4",{"data-testid":"turn",className:"text-center mt-4",style:{color:v?E:y},children:[!c&&"Waiting for a player to join...",o?"":v?"Your turn":"Waiting for ".concat(c,"...")]})]})}));function W(e){var t=e.userName,n=e.game,r=e.incrementData,c=e.toggleGameModeCb,s=Object(a.useState)(""),o=Object(i.a)(s,2),u=o[0],l=o[1],d=Object(a.useState)(""),j=Object(i.a)(d,2),O=j[0],f=j[1],p=Object(a.useState)(1),m=Object(i.a)(p,2),x=m[0],h=m[1],v=Object(a.useState)(0),g=Object(i.a)(v,2),E=g[0],y=g[1],S=Object(a.useState)(0),_=Object(i.a)(S,2),A=_[0],P=_[1],w=Object(a.useState)(!0),R=Object(i.a)(w,2),C=R[0],T=R[1],k=Object(a.useState)(""),B=Object(i.a)(k,2),D=B[0],F=B[1],L=Object(a.useState)(""),W=Object(i.a)(L,2),q=W[0],M=W[1],K=Object(a.useState)(!0),H=Object(i.a)(K,2),J=H[0],Y=H[1],z=Object(a.useState)(1),V=Object(i.a)(z,2),Q=V[0],X=V[1],Z=Object(a.useState)(""),$=Object(i.a)(Z,2),ee=$[0],te=$[1],ne=Object(a.useState)(0),ae=Object(i.a)(ne,2),re=ae[0],ce=ae[1],se=Object(a.useState)(0),ie=Object(i.a)(se,2),oe=ie[0],ue=ie[1],le=Object(a.useState)(!1),de=Object(i.a)(le,2),je=de[0],be=de[1],Oe=Object(a.useMemo)((function(){return 1===Q?O:u}),[u,O,Q]),fe=Object(a.useContext)(I),pe=Object(a.useRef)(),me=Object(a.useCallback)((function(e,t){ce(e),ue(t)}),[]),xe=Object(a.useCallback)((function(e){be(!0),ue(e)}),[]);return Object(a.useEffect)((function(){if("single"===n&&(T(!1),Y(!1),l(t),f("Peanutbot")),"multi"===n)return fe.emit("player-connecting",{userName:t}),fe.on("player-has-joined",(function(e){var t=e.player1,n=e.player2;t&&l(t),n&&f(n),t&&n&&(y(0),P(0),M(""),h(1),T(!1),Y(!1))})),fe.on("full-server",(function(){c(""),alert("Sorry, server is full.")})),fe.on("player-1-connected",(function(){te(t)})),fe.on("player-2-connected",(function(){X(2),te(t)})),fe.on("player-disconnected",(function(e){var t=e.playerName;1===e.playerNum?l(""):f(""),M("".concat(t," left\ud83d\udca8")),F(""),T(!0),Y(!0)})),function(){fe.off("player-has-joined"),fe.off("full-server",c),fe.off("player-1-connected"),fe.off("player-2-connected"),fe.off("player-disconnected")}}),[fe,n,t,c]),Object(a.useEffect)((function(){return"multi"===n&&(fe.on("result",(function(e){var t=e.result,n=e.playerNum;me(t,n)})),fe.on("replay",(function(e){var t=e.playerNum;xe(t)}))),function(){fe.off("result",me),fe.off("replay",xe)}}),[fe,n,me,xe]),Object(a.useEffect)((function(){re&&(re===Q?(F("\ud83e\udd42 YOU WIN! \ud83c\udf89"),r("won")):F("Draw"===re?re+"! \ud83e\udd1d":"\ud83d\ude31 YOU LOSE! \ud83d\udca9"),oe!==Q&&"single"!==n||M("Click Replay \u2b07\ufe0f"),"multi"===n&&oe!==Q&&(M("Waiting for ".concat(ee," to restart the game...")),Y(!0)),re===Q?r("played","won"):r("played"),1===re&&y((function(e){return e+1})),2===re&&P((function(e){return e+1})),T(!0),ce(0),ue(0))}),[re,n,r,oe,ee,Q]),Object(a.useEffect)((function(){if(je){var e=JSON.stringify(pe.current.grid)===JSON.stringify(U);C||e||oe!==Q||r("played"),pe.current.resetGrid(),T(!1),h((function(e){return e+1})),F(""),M(""),Y(!1),be(!1),ue(0)}}),[C,r,oe,je,Q]),Object(b.jsxs)("div",{className:"container",children:[Object(b.jsxs)("div",{className:"row",children:[Object(b.jsxs)("div",{className:"col",children:[Object(b.jsxs)("h5",{"data-testid":"round",className:"text-primary",children:["Round: ",x]}),Object(b.jsxs)("h5",{children:[Object(b.jsx)("span",{"data-testid":"score1",className:"pink_font",children:E}),Object(b.jsx)("span",{className:"text-primary",children:" vs "}),Object(b.jsx)("span",{"data-testid":"score2",className:"text-success",children:A})]})]}),Object(b.jsxs)("div",{className:"col align-self-end",children:[Object(b.jsxs)("h5",{"data-testid":"p1Name",className:"player row justify-content-end",children:[u||"Waiting...",Object(b.jsx)("div",{className:"pink_background indicator rounded ml-2"})]}),Object(b.jsxs)("h5",{"data-testid":"p2Name",className:"player row justify-content-end",children:[O||"Waiting...",Object(b.jsx)("div",{className:"bg-success indicator rounded ml-2"})]})]})]}),Object(b.jsx)(G,{ref:pe,game:n,handleResultCb:me,opponentName:Oe,thisPlayerNum:Q,gameOver:C}),Object(b.jsx)("h4",{"data-testid":"resultMsg",className:"text-center text-warning mt-2",children:D}),Object(b.jsx)("h4",{"data-testid":"info",className:"text-center text-warning mt-2",children:q}),Object(b.jsx)("div",{onClick:function(){fe.emit("replay",{playerNum:Q})},children:Object(b.jsx)(N,{id:"replay",testid:"replay",text:"Replay",type:"button",func:xe,funcArgu:Q,disabled:J})}),Object(b.jsx)(N,{id:"quitBtn",testid:"quit",text:"Quit",type:"button",func:function(){var e=JSON.stringify(pe.current.grid)===JSON.stringify(U);q||e||r("played"),"multi"===n&&fe.emit("player-disconnected",{playerNum:Q}),c("")}})]})}function q(){var e,t=Object(x.g)(),n=Object(x.h)(),r=f(),c=r.currentUser,s=r.logout,o=Object(a.useState)(),u=Object(i.a)(o,2),l=u[0],j=u[1],O=Object(a.useState)(),p=Object(i.a)(O,2),m=p[0],v=p[1],g=Object(a.useState)(c.uid),y=Object(i.a)(g,1)[0],w=Object(a.useState)((null===(e=n.state)||void 0===e?void 0:e.userName)||c.displayName),R=Object(i.a)(w,1)[0],C=Object(a.useState)(""),k=Object(i.a)(C,2),B=k[0],U=k[1];Object(a.useEffect)((function(){var e=d.database().ref(y),t=e.on("value",(function(e){e.val()?j(e.val()):j({played:0,won:0})}));return function(){e.off("value",t)}}),[y]);var D=function(){var e=Object(_.a)(S.a.mark((function e(){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return U(""),e.prev=1,e.next=4,s();case 4:t.push("/"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),U("Failed to log out");case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(){return e.apply(this,arguments)}}(),F=Object(a.useCallback)((function(e){v(e)}),[]),L=Object(a.useCallback)((function(e,t){var n=Object(h.a)(Object(h.a)({},l),{},Object(E.a)({},e,l[e]+1));t&&(n=Object(h.a)(Object(h.a)({},n),{},Object(E.a)({},t,l[t]+1))),d.database().ref(y).update(Object(h.a)({},n))}),[l,y]);return Object(b.jsx)("main",{className:"container",children:m?Object(b.jsx)(I.Provider,{value:T,children:Object(b.jsx)(W,{userName:R,game:m,incrementData:L,toggleGameModeCb:F})}):Object(b.jsxs)("div",{children:[Object(b.jsx)(A.a,{className:"box",children:Object(b.jsxs)(A.a.Body,{children:[Object(b.jsxs)("h2",{id:"userName",className:"text-center mb-4",children:["Hello, ",R,"!"]}),Object(b.jsxs)("div",{className:"row",children:[Object(b.jsxs)("h2",{id:"played",className:"col-6 text-center",children:["\ud83c\udfae \u2716\ufe0f ",void 0!==(null===l||void 0===l?void 0:l.played)?l.played:"Loading..."]}),Object(b.jsxs)("h2",{id:"won",className:"col-6 text-center",children:["\ud83c\udfc6 \u2716\ufe0f ",void 0!==(null===l||void 0===l?void 0:l.won)?l.won:"Loading..."]})]}),B&&Object(b.jsx)(P.a,{variant:"danger",children:B}),Object(b.jsx)(N,{id:"single",text:"Challenge Peanutbot",type:"button",func:F,funcArgu:"single"}),Object(b.jsx)(N,{id:"multi",text:"Play With A Friend",type:"button",func:F,funcArgu:"multi"}),Object(b.jsx)(N,{id:"updateProfile",text:"Update Profile",type:"button",func:function(){t.push("/update-profile")}})]})}),Object(b.jsx)(N,{id:"logoutBtn",link:!0,text:"Log Out",type:"button",func:D})]})})}var M=n(124);function K(e){var t=e.text,n=e.moreText,a=e.id,r=e.to;return Object(b.jsxs)("p",{className:"text-center mt-2",children:[n,Object(b.jsx)(m.b,{className:"text-decoration-none",id:a,to:r,children:t})]})}function H(e){var t=e.text;return Object(b.jsx)("h2",{className:"text-center mb-4",children:t})}function J(){var e=Object(a.useRef)(),t=Object(a.useRef)(),n=Object(a.useRef)(),r=Object(a.useRef)(),c=f(),s=c.currentUser,o=c.updatePassword,u=c.updateEmail,l=Object(a.useState)(""),d=Object(i.a)(l,2),j=d[0],O=d[1],p=Object(a.useState)(!1),m=Object(i.a)(p,2),h=m[0],v=m[1],g=Object(x.g)();return Object(b.jsxs)("div",{className:"container",children:[Object(b.jsx)(A.a,{children:Object(b.jsxs)(A.a.Body,{children:[Object(b.jsx)(H,{text:"Update Profile"}),j&&Object(b.jsx)(P.a,{variant:"danger",children:j}),Object(b.jsxs)(M.a,{onSubmit:function(a){if(a.preventDefault(),n.current.value!==r.current.value)return O("Passwords do not match");var c=[];v(!0),O(""),e.current.value!==s.displayName&&c.push(s.updateProfile({displayName:e.current.value})),t.current.value!==s.email&&c.push(u(t.current.value)),n.current.value&&c.push(o(n.current.value)),Promise.all(c).then((function(){g.push("/")})).catch((function(){O("Failed to update account"),v(!1)}))},children:[Object(b.jsxs)(M.a.Group,{id:"username",children:[Object(b.jsx)(M.a.Label,{children:"Username"}),Object(b.jsx)(M.a.Control,{id:"usernameInput",type:"text",ref:e,required:!0,defaultValue:s.displayName})]}),Object(b.jsxs)(M.a.Group,{id:"email",children:[Object(b.jsx)(M.a.Label,{children:"Email"}),Object(b.jsx)(M.a.Control,{type:"email",ref:t,required:!0,defaultValue:s.email})]}),Object(b.jsxs)(M.a.Group,{id:"password",children:[Object(b.jsx)(M.a.Label,{children:"Password"}),Object(b.jsx)(M.a.Control,{type:"password",ref:n,placeholder:"Leave blank to keep the same"})]}),Object(b.jsxs)(M.a.Group,{id:"password-confirm",children:[Object(b.jsx)(M.a.Label,{children:"Password Confirmation"}),Object(b.jsx)(M.a.Control,{type:"password",ref:r,placeholder:"Leave blank to keep the same"})]}),Object(b.jsx)(N,{id:"updateBtn",text:"Update",disabled:h,type:"submit"})]})]})}),Object(b.jsx)(K,{text:"Cancel",id:"cancelLink",to:"/"})]})}function Y(){var e=Object(a.useRef)(),t=Object(a.useRef)(),n=Object(a.useRef)(),r=Object(a.useRef)(),c=f().signup,s=Object(a.useState)(""),o=Object(i.a)(s,2),u=o[0],l=o[1],d=Object(a.useState)(!1),j=Object(i.a)(d,2),O=j[0],p=j[1],m=Object(x.g)();function h(){return(h=Object(_.a)(S.a.mark((function a(s){return S.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(s.preventDefault(),n.current.value===r.current.value){a.next=3;break}return a.abrupt("return",l("Passwords do not match"));case 3:return a.prev=3,l(""),p(!0),a.next=8,c(t.current.value,n.current.value).then((function(t){t.user.updateProfile({displayName:e.current.value})}));case 8:m.push("/",{userName:e.current.value}),a.next=15;break;case 11:a.prev=11,a.t0=a.catch(3),l("Failed to create an account"),p(!1);case 15:case"end":return a.stop()}}),a,null,[[3,11]])})))).apply(this,arguments)}return Object(b.jsxs)("div",{className:"container",children:[Object(b.jsx)(A.a,{children:Object(b.jsxs)(A.a.Body,{children:[Object(b.jsx)(H,{text:"Sign Up"}),u&&Object(b.jsx)(P.a,{variant:"danger",children:u}),Object(b.jsxs)(M.a,{onSubmit:function(e){return h.apply(this,arguments)},children:[Object(b.jsxs)(M.a.Group,{id:"username",children:[Object(b.jsx)(M.a.Label,{children:"Username"}),Object(b.jsx)(M.a.Control,{id:"nameInput",type:"text",ref:e,required:!0})]}),Object(b.jsxs)(M.a.Group,{id:"email",children:[Object(b.jsx)(M.a.Label,{children:"Email"}),Object(b.jsx)(M.a.Control,{id:"emailInput",type:"email",ref:t,required:!0})]}),Object(b.jsxs)(M.a.Group,{id:"password",children:[Object(b.jsx)(M.a.Label,{children:"Password"}),Object(b.jsx)(M.a.Control,{id:"passwordInput",type:"password",placeholder:"Minimum 6 characters",ref:n,required:!0})]}),Object(b.jsxs)(M.a.Group,{id:"password-confirm",children:[Object(b.jsx)(M.a.Label,{children:"Password Confirmation"}),Object(b.jsx)(M.a.Control,{id:"confirmPasswordInput",type:"password",ref:r,required:!0})]}),Object(b.jsx)(N,{id:"signupBtn",text:"Sign Up",disabled:O,type:"submit"})]})]})}),Object(b.jsx)(K,{text:"Log In",moreText:"Already have an account? ",to:"/login"})]})}function z(){var e=Object(a.useRef)(),t=Object(a.useRef)(),n=f().login,r=Object(a.useState)(""),c=Object(i.a)(r,2),s=c[0],o=c[1],u=Object(a.useState)(!1),l=Object(i.a)(u,2),d=l[0],j=l[1],O=Object(x.g)();function p(){return(p=Object(_.a)(S.a.mark((function a(r){return S.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r.preventDefault(),a.prev=1,o(""),j(!0),a.next=6,n(e.current.value,t.current.value);case 6:O.push("/"),a.next=13;break;case 9:a.prev=9,a.t0=a.catch(1),j(!1),o("Failed to log in");case 13:case"end":return a.stop()}}),a,null,[[1,9]])})))).apply(this,arguments)}return Object(b.jsxs)("div",{className:"container",children:[Object(b.jsx)("header",{"data-testid":"title",className:"title text-primary",children:"Connect Four"}),Object(b.jsx)(A.a,{children:Object(b.jsxs)(A.a.Body,{children:[s&&Object(b.jsx)(P.a,{id:"error",variant:"danger",children:s}),Object(b.jsxs)(M.a,{onSubmit:function(e){return p.apply(this,arguments)},children:[Object(b.jsxs)(M.a.Group,{id:"email",children:[Object(b.jsx)(M.a.Label,{children:"Email"}),Object(b.jsx)(M.a.Control,{id:"emailInput",type:"email",ref:e,required:!0})]}),Object(b.jsxs)(M.a.Group,{id:"password",children:[Object(b.jsx)(M.a.Label,{children:"Password"}),Object(b.jsx)(M.a.Control,{id:"passwordInput",type:"password",ref:t,required:!0})]}),Object(b.jsx)(N,{id:"loginBtn",text:"Log In",disabled:d,type:"submit"})]}),Object(b.jsx)(K,{text:"Forgot Password?",to:"/forgot-password"})]})}),Object(b.jsx)(K,{id:"signupLink",text:"Sign Up",moreText:"Need an account? ",to:"/signup"})]})}function V(){var e=Object(a.useRef)(),t=f().resetPassword,n=Object(a.useState)(""),r=Object(i.a)(n,2),c=r[0],s=r[1],o=Object(a.useState)(""),u=Object(i.a)(o,2),l=u[0],d=u[1],j=Object(a.useState)(!1),O=Object(i.a)(j,2),p=O[0],m=O[1];function x(){return(x=Object(_.a)(S.a.mark((function n(a){return S.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a.preventDefault(),n.prev=1,d(""),s(""),m(!0),n.next=7,t(e.current.value);case 7:d("Check your inbox for further instructions"),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(1),s("Failed to reset password");case 13:m(!1);case 14:case"end":return n.stop()}}),n,null,[[1,10]])})))).apply(this,arguments)}return Object(b.jsxs)("div",{className:"container",children:[Object(b.jsx)(A.a,{children:Object(b.jsxs)(A.a.Body,{children:[Object(b.jsx)(H,{text:"Password Reset"}),c&&Object(b.jsx)(P.a,{variant:"danger",children:c}),l&&Object(b.jsx)(P.a,{variant:"success",children:l}),Object(b.jsxs)(M.a,{onSubmit:function(e){return x.apply(this,arguments)},children:[Object(b.jsxs)(M.a.Group,{id:"email",children:[Object(b.jsx)(M.a.Label,{children:"Email"}),Object(b.jsx)(M.a.Control,{type:"email",ref:e,required:!0})]}),Object(b.jsx)(N,{text:"Reset Password",disabled:p,type:"submit"})]}),Object(b.jsx)(K,{text:"Login",to:"/login"})]})}),Object(b.jsx)(K,{text:"Sign Up",moreText:"Need an account? ",to:"/signup"})]})}n(118),n(119);function Q(){return Object(b.jsx)(m.a,{children:Object(b.jsx)(p,{children:Object(b.jsxs)(x.d,{children:[Object(b.jsx)(g,{exact:!0,path:"/",component:q}),Object(b.jsx)(g,{path:"/update-profile",component:J}),Object(b.jsx)(x.b,{path:"/signup",component:Y}),Object(b.jsx)(x.b,{path:"/login",component:z}),Object(b.jsx)(x.b,{path:"/forgot-password",component:V})]})})})}s.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(Q,{})}),document.getElementById("root"))}},[[120,1,2]]]);
//# sourceMappingURL=main.1c5dbc80.chunk.js.map