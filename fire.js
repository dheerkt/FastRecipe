import firebase from 'firebase';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
  var firebaseConfig = {
    apiKey: "AIzaSyDmIo96HgKGEnzYtEmg3y2zgazvHLJk1Jo",
    authDomain: "cs-4720-de2cf.firebaseapp.com",
    databaseURL: "https://cs-4720-de2cf.firebaseio.com",
    projectId: "cs-4720-de2cf",
    storageBucket: "cs-4720-de2cf.appspot.com",
    messagingSenderId: "812223507342",
    appId: "1:812223507342:web:d4576e2b12432be90292df",
    measurementId: "G-XEZ4DVHLZN"
  };
  
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default fire;