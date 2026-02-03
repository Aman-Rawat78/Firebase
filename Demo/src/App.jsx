import "./App.css";
import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import { firebaseAuth } from "./context/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Collection } from "./pages/collection";


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // console.log("User is signed in:", user);
        setUser(user);
      } else {
        // console.log("No user is signed in.");
        setUser(null);
      }
    });
  }, []);

  if (user == null) {
    return (
      <div className="App">
        <Signup />
        <div></div>
        <SignIn />
      </div>
    );
  }
  return (
    <>
      <div className="App">
        <h1>Welcome, {user.email}</h1>
        <button onClick={() => firebaseAuth.signOut()}>Sign Out</button>

        <Collection />
      </div>
    </>
  );
}
export default App;
