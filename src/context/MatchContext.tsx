import React, { Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';

export const MatchContext = createContext({
  matchDogs: [] as string[],
  setMatchDogs: (() => {}) as Dispatch<SetStateAction<string[]>>,
});

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matchDogs, setMatchDogs] = useState<string[]>([]);

  return <MatchContext.Provider value={{ matchDogs, setMatchDogs }}>{children}</MatchContext.Provider>;
};
