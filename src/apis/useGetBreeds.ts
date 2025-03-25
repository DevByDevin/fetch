import React from 'react';
import { BASE_URL } from '../constant';
import { useQuery } from 'react-query';

const apiGetBreeds = async () => {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Error');
  }
  return response.json();
};

export const useGetBreeds = () => {
  return useQuery(['breeds'], () => apiGetBreeds());
};
