// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global2.css'; // Make sure to import the CSS file

const LandingPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar className="navbar-custom shadow-lg" expand="lg">
        <Container>
          <Navbar.Brand className="navbar-brand-custom">Shopkeeper Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup" className="nav-link-custom">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <h1 className="text-white animated-text">Welcome to Shopkeeper Management</h1>
        <p className="text-white description-text">Manage your store effortlessly with our powerful tools.</p>
        <div className="mt-4">
          <Button as={Link} to="/getstarted" className="btn-custom">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
