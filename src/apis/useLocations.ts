import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../constant';
import { getQueryKey } from '../utils/queryKey';

const apiGetLocations = async (locIds: string[]) => {
  const url = `${BASE_URL}/locations`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(locIds),
  });
  if (!response.ok) {
    throw new Error('*Can not get Locations data*');
  }
  return response.json();
};

export const useGetLocations = (locIds: string[]) => {
  return useQuery(['locations', ...getQueryKey(locIds)], () => apiGetLocations(locIds), {
    enabled: locIds.length > 0,
    cacheTime: 1000 * 60 * 5,
    staleTime: 0,
    keepPreviousData: true,
  });
};
