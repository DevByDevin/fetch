import React, { Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';
import { Option } from 'react-multi-select-component';

export const FilterContext = createContext({
  checkedBreeds: [] as Option[],
  setCheckedBreeds: (() => {}) as Dispatch<SetStateAction<Option[]>>,
  sort: 'asc' as string,
  setSort: (() => {}) as Dispatch<SetStateAction<string>>,
  sortBy: 'breed' as string,
  setSortBy: (() => {}) as Dispatch<SetStateAction<string>>,
  isLoading: true,
  setIsLoading: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkedBreeds, setCheckedBreeds] = useState([] as Option[]);
  const [sort, setSort] = useState('asc');
  const [sortBy, setSortBy] = useState('breed');
  const [isLoading, setIsLoading] = useState(true);

  return (
    <FilterContext.Provider value={{ checkedBreeds, setCheckedBreeds, sort, setSort, sortBy, setSortBy, isLoading, setIsLoading }}>
      {children}
    </FilterContext.Provider>
  );
};
