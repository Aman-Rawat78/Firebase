import React from 'react'
import { useFirebase } from '../context/Firebase';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { Link, NavLink } from 'react-router-dom';

const MyNav = () => {
  const { logout, isLoggedIn } = useFirebase();
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Book Store</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/book/list">Add Listing</Nav.Link>
          <Nav.Link as={NavLink} to="/book/orders">Orders</Nav.Link>
          {isLoggedIn && (
            <Button variant="primary" style={{marginLeft:"30px"}} onClick={logout}>Logout</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNav