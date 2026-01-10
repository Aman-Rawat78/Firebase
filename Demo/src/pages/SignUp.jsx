
import { useFirebase,firebaseAuth } from "../context/firebase";
import { useState } from "react";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";



const provider = new GoogleAuthProvider();


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupUser = useFirebase();


  const handleSignup =async () => {
    const response = await signupUser.SignupUserWithEmailAndPassword(email, password);
    console.log(response);
    if (response.user) {
      setEmail("");
      setPassword("");
    }
  };

  const handleGoogleSignUp = ()=>{
     signInWithPopup(firebaseAuth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  return (
    <div className="signup-page">
      {/* Signup form elements would go here */}
      <h1>Sign Up</h1>
      <div>
        <label htmlFor="signup-email">Email:</label>
        <input onChange={e => setEmail(e.target.value)} value={email} type="email" required id="signup-email" placeholder="Enter your email here" />
      </div>
      <label htmlFor="signup-password">Password:</label>
      <input onChange={e => setPassword(e.target.value)} value={password} type="password" id="signup-password" required placeholder="Enter your password here" />
      <div>
        <button onClick={handleSignup}>submit</button>
      </div>
      <br />
      <button onClick={handleGoogleSignUp} style={{background: "blue", color: "white"}}>SignUp with google</button>
    </div>
  );
}

export default Signup;