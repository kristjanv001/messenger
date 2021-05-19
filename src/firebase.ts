import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyA6lP0BztvHEeH4uCGyMRZy4bkZyCJfHZA",
  authDomain: "facebook-messenger-clone-613bc.firebaseapp.com",
  projectId: "facebook-messenger-clone-613bc",
  storageBucket: "facebook-messenger-clone-613bc.appspot.com",
  messagingSenderId: "839192294808",
  appId: "1:839192294808:web:ca564d23618ac7e03527ed",
});

export const db = firebase.firestore();
