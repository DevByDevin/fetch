import React, { useContext } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Login } from '../pages/Login';
import { AuthContext } from '../context/AuthContext';
import { Home } from '../pages/Home';
import { AppSpinner } from '../components/Spinner';

export const AppRoutes = () => {
  const { isVerified, isLoading } = useContext(AuthContext);

  if (isLoading) return <AppSpinner />;

  return <>{isVerified ? <Home /> : <Login />}</>;
};
