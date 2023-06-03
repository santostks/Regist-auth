import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBCFVeEsvjNRpTAMvpHi9ZLvl63zM2C0b0",
  authDomain: "regist-auth.firebaseapp.com",
  projectId: "regist-auth",
  storageBucket: "regist-auth.appspot.com",
  messagingSenderId: "309229794850",
  appId: "1:309229794850:web:c80f9869c31bb5cc093c7b"
};
  

/* initialize firebase */
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };


export const database = getFirestore()