import React from 'react';
import { BASE_URL } from '../constant';
import { useQuery } from '@tanstack/react-query';
import { getQueryKey } from '../utils/queryKey';
import { Option } from 'react-multi-select-component';

const apiSearchDogs = async (checkedBreeds: Option[], sort: string, sortBy: string, page: number = 1, perPage: number = 25) => {
  const baseUrl = `${BASE_URL}/dogs/search?`;
  const pageParam = `&size=${perPage}&from=${(page - 1) * perPage}`;
  const sortParm = `&sort=${sortBy}:${sort}`;
  let url =
    baseUrl + (checkedBreeds?.length ? checkedBreeds.map(checkedBreed => `breeds=${checkedBreed.value}`).join('&') : '') + pageParam + sortParm;

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

export const useSearchDogs = (checkedBreeds: Option[], sort: string, sortBy: string, page: number = 1) => {
  return useQuery(['dogIds', ...getQueryKey(page)], () => apiSearchDogs(checkedBreeds, sort, sortBy, page), {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
