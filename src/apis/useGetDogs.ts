import React from 'react';
import { BASE_URL } from '../constant';
import { useQuery } from '@tanstack/react-query';
import { getQueryKey } from '../utils/queryKey';

const apiGetDogs = async (dogIds: string[]) => {
  const url = `${BASE_URL}/dogs`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(dogIds),
  });
  if (!response.ok) {
    throw new Error('*Can not get Dogs data*');
  }
  return response.json();
};

export const useGetDogs = (dogIds: string[]) => {
  return useQuery(['dogs', ...getQueryKey(dogIds)], () => apiGetDogs(dogIds), {
    cacheTime: 1000 * 60 * 5,
    staleTime: 0,
    keepPreviousData: true,
  });
};

export const useGetMatchDogs = (dogIds: string[]) => {
  return useQuery(['matchDogs', ...getQueryKey(dogIds)], () => apiGetDogs(dogIds), {
    enabled: dogIds.length > 0,
    cacheTime: 1000 * 60 * 5,
    staleTime: 0,
    keepPreviousData: true,
  });
};

export const useGetMatchDog = (dogIds: string[]) => {
  return useQuery(['theMatchDog', ...getQueryKey(dogIds)], () => apiGetDogs(dogIds), {
    enabled: dogIds.length > 0,
    cacheTime: 1000 * 60 * 5,
    staleTime: 0,
    keepPreviousData: true,
  });
};
