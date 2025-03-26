import React, { useContext } from 'react';
import { Login } from '../pages/Login';
import { AuthContext } from '../context/AuthContext';
import { Home } from '../pages/Home';
import { AppSpinner } from '../components/Spinner';
import { PaginationProvider } from '../context/PaginationContext';
import { FilterProvider } from '../context/FilterContext';
import { MatchProvider } from '../context/MatchContext';

export const AppRoutes = () => {
  const { isVerified, isLoading } = useContext(AuthContext);

  if (isLoading) return <AppSpinner />;

  return (
    <>
      {isVerified ? (
        <PaginationProvider>
          <FilterProvider>
            <MatchProvider>
              <Home />
            </MatchProvider>
          </FilterProvider>
        </PaginationProvider>
      ) : (
        <Login />
      )}
    </>
  );
};
