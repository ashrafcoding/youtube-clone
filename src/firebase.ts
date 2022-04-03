import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcRw2qqx_uVDXAwiWtXVL-lR7wetMhsg8",
  authDomain: "ashraf-yt-clone.firebaseapp.com",
  projectId: "ashraf-yt-clone",
  storageBucket: "ashraf-yt-clone.appspot.com",
  messagingSenderId: "631822571364",
  appId: "1:631822571364:web:1a0a7d09aa86f2fb33cc71",
};

const firebaseConfig2 = {
  apiKey: "AIzaSyAmV5lZWcr2LYkfTZwAkP6SnZWJpJFAD6k",
  authDomain: "clone-855d8.firebaseapp.com",
  projectId: "clone-855d8",
  storageBucket: "clone-855d8.appspot.com",
  messagingSenderId: "357334117239",
  appId: "1:357334117239:web:4cd2a01f79eebce261cf72"
};

const firebaseApp = initializeApp(firebaseConfig2);
const auth = getAuth(firebaseApp);

export default auth;
