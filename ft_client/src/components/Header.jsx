import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useUser();

  return (
    <div className="w-100">
      <Navbar expand="lg" variant="dark" className="shadow-lg">
        <Container>
          <Navbar.Brand href="#home">Financial Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user?._id ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/transaction">
                    Transaction
                  </Nav.Link>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setUser({});
                      localStorage.removeItem("accessJWT");
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Singnup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
