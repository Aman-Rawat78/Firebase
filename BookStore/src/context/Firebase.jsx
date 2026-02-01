import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {getFirestore, addDoc, collection,getDoc} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_836m7i2G20mnhQWOAWnDuW0wdCWvubk",
  authDomain: "book-store-29816.firebaseapp.com",
  projectId: "book-store-29816",
  storageBucket: "book-store-29816.firebasestorage.app",
  messagingSenderId: "218015601985",
  appId: "1:218015601985:web:be3020aedce804ab68fdc0",
  measurementId: "G-M7ZJYZWLYT"
};



//step1: Initialize Firebase app and get references to auth and database services
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(firebaseApp);



// step2: Create a context and provider component to supply Firebase functions like signup, login, and database operations to the rest of the app
export const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);



export const FirebaseProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        setUser(user);
      } else {
        console.log("No user is signed in.");
        setUser(null);
      }
    });
  }, []);


  // Signup function
  const SignupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      // SignUp
      const user = userCredential.user;
      console.log("User signed up:", user);
      alert("SignUp success");
      return userCredential;
    } catch (error) {
      console.error(error);
      alert(`${error.code}`);
    }
  };

  // Signin function
  const SignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      // Signed in
      const user = userCredential.user;
      console.log("User signed in:", user);
      alert("SignIn success");
      return userCredential;
    } catch (error) {
      console.error(error);
      alert(`${error.code}`);
    }
  };
 
  // Signin with Google
  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  // Check if user is logged in
  const isLoggedIn = user ? true : false;

  const handleCreateNewListing = async (name, Authour, price, cover) => {
    try {
      // 1. Upload image to Cloudinary using environment variables
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const defaultFolder = import.meta.env.VITE_CLOUDINARY_FOLDER;
      const formData = new FormData();
      formData.append('file', cover);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', defaultFolder); // Use provided folder or default from .env

      const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const cloudinaryData = await cloudinaryRes.json();
      const imageUrl = cloudinaryData.secure_url;

      // 2. Store book details in Firestore
      
      await addDoc(collection(firestore, 'books'), {
        name,
        Authour,
        price,
        imageURL: imageUrl,
        userID: user ? user.uid : null,
        userEmail: user ? user.email : null,
        displayName: user ? user.displayName : null,
        photoURL: user ? user.photoURL : null,
      });
      alert('Listing created successfully!');
      return true;
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing.');
    }
  }

const listAllBooks =  () => {
    
      return  getDoc(collection(firestore, 'books'));
     
  };

  return (
    <FirebaseContext.Provider
      value={{
        firebaseApp,
        isLoggedIn,
        SignupUserWithEmailAndPassword,
        SignIn,
        signinWithGoogle,
        handleCreateNewListing,
        listAllBooks,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
