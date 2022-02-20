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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default auth;
