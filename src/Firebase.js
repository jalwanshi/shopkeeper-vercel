import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/database"
const firebaseConfig = {
  apiKey: "AIzaSyAcOxHgVsLtkZe3MD4Z9C_OF2D7S_82DAQ",
  authDomain: "transaction-project-bb0e7.firebaseapp.com",
  databaseURL: "https://transaction-project-bb0e7-default-rtdb.firebaseio.com",
  projectId: "transaction-project-bb0e7",
  storageBucket: "transaction-project-bb0e7.appspot.com",
  messagingSenderId: "220032285712",
  appId: "1:220032285712:web:d55a866f4c54e06d9e1e95"
};


const Firebase = firebase.initializeApp(firebaseConfig);

export const auth = Firebase.auth();
export const db = Firebase.database();

export default Firebase;