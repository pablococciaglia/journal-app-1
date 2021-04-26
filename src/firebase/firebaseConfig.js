import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


  const firebaseConfig = {
    apiKey: "AIzaSyA64RmKZxbN2cyO4Nm2JBir67tzP4vXj84",
    authDomain: "react-app-pruebas-a2dcc.firebaseapp.com",
    projectId: "react-app-pruebas-a2dcc",
    storageBucket: "react-app-pruebas-a2dcc.appspot.com",
    messagingSenderId: "341714359542",
    appId: "1:341714359542:web:78d2f7f444c92a7991c8d7"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  
  
  export {
      db,
      googleAuthProvider,
      firebase
  }