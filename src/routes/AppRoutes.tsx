import React, { useContext } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Login } from '../pages/Login';
import { AuthContext } from '../context/AuthContext';
import { Home } from '../pages/Home';

export const AppRoutes = () => {
  const { isVerified, isLoading } = useContext(AuthContext);
  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  return <>{isVerified ? <Home /> : <Login />}</>;
};
