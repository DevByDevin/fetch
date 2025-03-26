import React, { Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';

export const PaginationContext = createContext({
  page: 1,
  setPage: (() => {}) as Dispatch<SetStateAction<number>>,
});

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState(1);

  return <PaginationContext.Provider value={{ page, setPage }}>{children}</PaginationContext.Provider>;
};
