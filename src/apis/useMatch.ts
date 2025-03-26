import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../constant';

const apiGetMatch = async (dogIds: string[]) => {
  const url = `${BASE_URL}/dogs/match`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(dogIds),
  });
  if (!response.ok) {
    throw new Error('*Can not get the Match data*');
  }
  return response.json();
};

export const useGetMatch = (dogIds: string[]) => {
  return useQuery(['theMatchId'], () => apiGetMatch(dogIds), {
    enabled: dogIds.length > 0,
    cacheTime: 1000 * 60 * 5,
    staleTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
