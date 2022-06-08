// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKibVBBJ_OG1wp3kkczAeSm0voSujxtMc",
  authDomain: "pidvezu-8dbe2.firebaseapp.com",
  projectId: "pidvezu-8dbe2",
  storageBucket: "pidvezu-8dbe2.appspot.com",
  messagingSenderId: "1099413958163",
  appId: "1:1099413958163:web:aa8b73a0ad249887d719e6",
  measurementId: "G-TK2BL72VGB"
};

let app;
if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = getFirestore(app)

export { auth, db }