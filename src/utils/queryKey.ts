import { useMemo } from 'react';

export const getQueryKey = (key: any) => {
  const queryKey = useMemo(() => key, [key]);
  return [queryKey];
};
