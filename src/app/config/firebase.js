import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    authDomain: "yayvents.firebaseapp.com",
    databaseURL: "https://yayvents.firebaseio.com",
    projectId: "yayvents",
    storageBucket: "yayvents.appspot.com",
    messagingSenderId: "153574348376",
    appId: "1:153574348376:web:5b7084381fbe9cd7f09c2d",
    measurementId: "G-FCM2S1YJ3E"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;