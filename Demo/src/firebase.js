import {initializeApp} from 'firebase/app';

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

export  const app = initializeApp(firebaseConfig);