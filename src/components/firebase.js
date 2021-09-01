import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyANQtUKCEXv5woXltyga5QAWf94bD0owwE",
    authDomain: "otpservice-shop.firebaseapp.com",
    projectId: "otpservice-shop",
    storageBucket: "otpservice-shop.appspot.com",
    messagingSenderId: "745366008444",
    appId: "1:745366008444:web:a05c3f00f48db495170ff9",
    measurementId: "G-Y0MWM36PQ9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebase;
