import React, { Dispatch, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';
import { checkSession } from '../apis/useAuth';

export const AuthContext = createContext({
  isVerified: false,
  setIsVerified: (() => {}) as Dispatch<SetStateAction<boolean>>,
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const name = localStorage.getItem('name') ?? '';
        const email = localStorage.getItem('email') ?? '';

        const session = await checkSession(name, email);
        if (session) {
          setIsVerified(true);
        }
      } catch (err) {
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, []);

  return <AuthContext.Provider value={{ isVerified, setIsVerified, isLoading }}>{children}</AuthContext.Provider>;
};
