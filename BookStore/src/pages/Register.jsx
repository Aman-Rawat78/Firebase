import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate}  from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { Link } from 'react-router-dom';

const Register = () => {

 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {SignupUserWithEmailAndPassword,signinWithGoogle,isLoggedIn} = useFirebase();
  const navigate = useNavigate();

  const handleSignup = async(e)=>{
    e.preventDefault();
    console.log("registering a user...")
    const response = await SignupUserWithEmailAndPassword(email,password);
    if(response){
      setEmail('');
      setPassword('');
    }
  };

  useEffect(()=>{
    if(isLoggedIn){
      //navigate to home page
      navigate('/');
    }   
  },[isLoggedIn,navigate])



  return (
    <div className='Container'>
       <div className='register-inner '>
         <Form>
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>
      
      <Button onClick={handleSignup} variant="primary" type="submit">
        Create Account
      </Button>
      <div>
        <br />
        <h6>already have an account?<Link to="/signin">Sign In</Link> </h6>
      </div>
    </Form>
    <h6 className='mt-3 mb-3'>OR</h6>
    <Button onClick={signinWithGoogle} variant="danger">Signin with Google</Button>
       </div>
        </div>
  )
}

export default Register