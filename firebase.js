import { initializeApp } from "firebase/app";

import {getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyAycBKyfRY-j__sP-IgOW9LNcMbaXyRAt0",
    authDomain: "hackathon273.firebaseapp.com",
    projectId: "hackathon273",
    storageBucket: "hackathon273.appspot.com",
    messagingSenderId: "522613252848",
    appId: "1:522613252848:web:1d355add9b49578f375835"
    
  };



  const app = initializeApp(firebaseConfig);

  
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();


export {auth, db, storage, };