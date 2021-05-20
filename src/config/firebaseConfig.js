import firebase from 'firebase/app';
import 'firebase/auth'



// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAlBcDGdGPZpFncu-E_bCpDQMzFgxqHz10",
    authDomain: "expense-tracker-3a33d.firebaseapp.com",
    projectId: "expense-tracker-3a33d",
    storageBucket: "expense-tracker-3a33d.appspot.com",
    messagingSenderId: "786953993951",
    appId: "1:786953993951:web:b70895043b41d96419b36a",
    measurementId: "G-LTRH52V9YL"
  };
  // Initialize Firebase


   const fire = firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export default fire; 