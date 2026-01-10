import React, { useState } from "react";
import { useFirebase } from "../context/firebase";



const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SignIn = useFirebase();

  const handleSignIn= async()=>{
   const response = await SignIn.LogInUser(email,password);
     if (response.value) {
      setEmail("");
      setPassword("");
    }
  };
 
  return (
    <div>
      <h1>Sign In</h1>

      <div>
        <label htmlFor="signin-email">Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          required
          id="signin-email"
          placeholder="Enter your email here"
        />
      </div>

      <label htmlFor="signin-password">Password:</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        id="signin-password"
        required
        placeholder="Enter your password here"
      />
      <div>
        {" "}
        <button onClick={handleSignIn}>submit</button>
      </div>
    </div>
  );
};

export default SignIn;
