import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../constant';

export const NavBar = () => {
  const { isVerified, setIsVerified } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', connection: 'keep-alive' },
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Logout failed');

      localStorage.removeItem('name');
      localStorage.removeItem('email');

      setIsVerified(false);
      alert('You are successfully logged out!');
    } catch (err) {
      console.error(err);
      alert('Logout failed');
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Fetch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          {isVerified && (
            <>
              <Nav className="m-2">Welcome!</Nav>
              <Nav>
                <Button onClick={handleLogout}>Logout</Button>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
