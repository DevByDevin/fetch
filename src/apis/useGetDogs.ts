import React from 'react';
import { BASE_URL } from '../constant';
import { useQuery } from 'react-query';

const apiGetDogs = async (ids: string[]) => {
  const url = `${BASE_URL}/dogs`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(ids),
  });
  if (!response.ok) {
    throw new Error('*Can not get Dogs data*');
  }
  return response.json();
};

export const useGetDogs = (ids: string[]) => {
  return useQuery(['dogs'], () => apiGetDogs(ids));
};
