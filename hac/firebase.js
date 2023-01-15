// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD0THll1J_-vHtufn6y5wSre6o4PWuwaY",
  authDomain: "fir-auth-c4ff7.firebaseapp.com",
  projectId: "fir-auth-c4ff7",
  storageBucket: "fir-auth-c4ff7.appspot.com",
  messagingSenderId: "530906551114",
  appId: "1:530906551114:web:983fd8904bbf8e3537a7b3",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export { auth };
