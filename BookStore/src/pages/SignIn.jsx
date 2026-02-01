import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link ,useNavigate} from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { SignIn,isLoggedIn } = useFirebase();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("login in a user...");
    const response = await SignIn(email, password);
    if (response) {
      setEmail("");
      setPassword("");
    }
  };

    useEffect(()=>{
      if(isLoggedIn){
        //navigate to home page
        navigate('/');
      }   
    },[isLoggedIn,navigate])

  return (
    <div className="Container">
      <div className="register-inner ">
        <Form>
          <Form.Group className="mb-3 mt-5" controlId="formSignInEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSignInPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button onClick={handleSignIn} variant="primary" type="submit">
            Login
          </Button>

          <div>
            <br />
            <h6>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </h6>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
