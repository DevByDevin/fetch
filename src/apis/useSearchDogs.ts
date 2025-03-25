import React from 'react';
import { BASE_URL } from '../constant';
import { useQuery } from 'react-query';

const apiSearchDogs = async () => {
  const url = `${BASE_URL}/dogs/search?`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('*Can not get Dog Ids data*');
  }
  return response.json();
};

export const useSearchDogs = () => {
  return useQuery(['dogIds'], () => apiSearchDogs());
};
