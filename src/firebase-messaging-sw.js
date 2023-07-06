importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAv3jouDASbbTg57oWKKj32LwYBf8_B-U0",
  authDomain: "dmc-cancun.firebaseapp.com",
  projectId: "dmc-cancun",
  storageBucket: "dmc-cancun.appspot.com",
  messagingSenderId: "981073754229",
  appId: "1:981073754229:web:2bc38f6fd7b09504af603c",
  measurementId: "G-F9X9D2R7BM"
});

const messaging = firebase.messaging();
