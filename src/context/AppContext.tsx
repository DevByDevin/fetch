import React, { Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';

export const AppContext = createContext({
  zipMap: {} as Record<string, any>,
  setZipMap: (() => {}) as Dispatch<SetStateAction<Record<string, any>>>,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zipMap, setZipMap] = useState<Record<string, any>>({});

  return <AppContext.Provider value={{ zipMap, setZipMap }}>{children}</AppContext.Provider>;
};
