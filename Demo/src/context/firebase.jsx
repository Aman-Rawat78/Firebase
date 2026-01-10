import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {getDatabase,set,ref} from "firebase/database";



// this is firebase config object for our project where we have stored all our firebase data 
const firebaseConfig = {
  apiKey: "AIzaSyBiM6A8XDFp7cuKHb_yANY-bJGC61Uz_2M",
  authDomain: "book-store-1d53a.firebaseapp.com",
  projectId: "book-store-1d53a",
  storageBucket: "book-store-1d53a.firebasestorage.app",
  messagingSenderId: "223235485944",
  appId: "1:223235485944:web:b37c1d8bf256867dbf4b0d",
  measurementId: "G-5Y0MEEP52E",
  databaseURL: "https://book-store-1d53a-default-rtdb.firebaseio.com/"
};

//step1: Initialize Firebase app and get references to auth and database services
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// step2: Create a context and provider component to supply Firebase functions like signup, login, and database operations to the rest of the app
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext)



// Firebase provider component
export const FirebaseProvider = (props) => {

  //Firebase SignUp function
  const SignupUserWithEmailAndPassword = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    // Signed in
    const user = userCredential.user;
    console.log("User signed up:", user);
    alert("SignUp success")
    return userCredential;
  }

  // Firebase Login function
const LogInUser = async (email, password) => {
  console.log("Logging in user with email:", email);
  console.log("Logging in user with password:", password);
  try {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    console.log("User signed in:", userCredential);
    alert("SignIn success");
    return userCredential;
  } catch (err) {
    console.log(err);
    // Optionally, show an alert or handle error
  }
};

  // Firebase Realtime-database function
  const putData = (key, data) => set(ref(database, key), data);

  return (
    <FirebaseContext.Provider value={{ SignupUserWithEmailAndPassword, putData,LogInUser }}>
      {props.children}
    </FirebaseContext.Provider>
  );
}