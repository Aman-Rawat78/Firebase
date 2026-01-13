import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCiHoeBjmCSGv1cy_y30bFZ9xE3aYLQLxA",
  authDomain: "book-shop-2df75.firebaseapp.com",
  projectId: "book-shop-2df75",
  storageBucket: "book-shop-2df75.firebasestorage.app",
  messagingSenderId: "737748522612",
  appId: "1:737748522612:web:4b248200a286e5796a6321",
  measurementId: "G-XXP14N4QDR"
};


const firebaseApp = initializeApp(firebaseConfig);
export const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);


export const FirebaseProvider = ({ children }) => { 
    return (    
        <FirebaseContext.Provider value={{ firebaseApp }}>
            {children}
        </FirebaseContext.Provider>
    );
}