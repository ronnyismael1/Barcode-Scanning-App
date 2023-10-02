import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
// import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCUeneTlh5oNh1ioHX0J8UbodWBJWa0OaM",
    authDomain: "rma-inventory-4bf13.firebaseapp.com",
    projectId: "rma-inventory-4bf13",
    storageBucket: "rma-inventory-4bf13.appspot.com",
    messagingSenderId: "828504376674",
    appId: "1:828504376674:web:1f43b6bb2a59858583583b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
