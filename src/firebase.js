import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCv5pSiDcVOy6O9E80IwXUG01KiaHTY5D0",
  authDomain: "fb-crud-react-71c2f.firebaseapp.com",
  databaseURL: "https://fb-crud-react-71c2f.firebaseio.com",
  projectId: "fb-crud-react-71c2f",
  storageBucket: "fb-crud-react-71c2f.appspot.com",
  messagingSenderId: "604230539009",
  appId: "1:604230539009:web:d06a5f047b7cbff9d02d00"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
