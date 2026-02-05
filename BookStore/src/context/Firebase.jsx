import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // console.log("User state changed: ", user);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
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
      alert("SignIn success");
      return userCredential;
    } catch (error) {
      console.error(error);
      alert(`${error.code}`);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(firebaseAuth);
      alert("Logged out successfully");
    } catch (error) {
      alert("Logout failed");
      console.error(error);
    }
  };

  // Signin with Google
  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  // Check if user is logged in
  const isLoggedIn = user ? true : false;

  // Create new book listing
  const handleCreateNewListing = async (name, Author, price, cover) => {
    try {
      // 1. Upload image to Cloudinary using environment variables
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const defaultFolder = import.meta.env.VITE_CLOUDINARY_FOLDER;
      const formData = new FormData();
      formData.append("file", cover);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", defaultFolder); // Use provided folder or default from .env

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const cloudinaryData = await cloudinaryRes.json();
      const imageUrl = cloudinaryData.secure_url;

      // 2. Store book details in Firestore
      await addDoc(collection(firestore, "books"), {
        name,
        Author,
        price,
        imageURL: imageUrl,
        userID: user ? user.uid : null,
        userEmail: user ? user.email : null,
        displayName: user ? user.displayName : null,
      });
      alert("Listing created successfully!");
      return true;
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Failed to create listing.");
    }
  };

  // List all books
  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  // Get Single Book by ID
  const getBookById = async (bookId) => {
    try {
      const bookDoc = await getDoc(doc(firestore, "books", bookId));
      return bookDoc;
    } catch (error) {
      console.error("Error fetching book by ID:", error);
    }
  };


  // Place Order
  const placeOrder = async (bookId, qty) => {
    // Implementation for placing an order
    try {
      const collectionRef = collection(firestore, "books", bookId, "orders");
      const result = await addDoc(collectionRef, {
        userID: user ? user.uid : null,
        userEmail: user ? user.email : null,
        displayName: user ? user.displayName : null,
        qty: Number(qty),
      });
      alert("Order placed successfully!");
      return result;
    } catch (error) {
      console.log("Error place order", error);
      alert("Failed Order placing ");
    }
    return result;
  };

  //View my Books
  const fetchMyBooks = async (userID) => {
    if (!user) {
      return [];
    }
    const collectionRef = collection(firestore, "books");
    const booksQuery = query(collectionRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(booksQuery);
    return querySnapshot;
  };

  // View my orders
  const getOrder = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        firebaseApp,
        isLoggedIn,
        loading,
        SignupUserWithEmailAndPassword,
        SignIn,
        signinWithGoogle,
        handleCreateNewListing,
        listAllBooks,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrder,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
