import React, { useContext, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { setIsVerified } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, name }),
      });

      if (!res.ok) throw new Error('Login failed');

      localStorage.setItem('name', name);
      localStorage.setItem('email', email);

      setIsVerified(true);

      await queryClient.invalidateQueries('currentSession');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header as="h5" style={{ display: 'flex', justifyContent: 'center' }}>
        Login
      </Card.Header>
      <Form onSubmit={handleLogin} style={{ padding: '1rem' }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Card>
  );
};
