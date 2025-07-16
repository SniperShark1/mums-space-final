import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { apiRequest, queryClient } from '@/lib/queryClient';

export interface LocalResource {
  title: string;
  description: string;
  phone?: string;
  website?: string;
  hours?: string;
  address?: string;
  type: 'childcare' | 'healthcare' | 'support' | 'mental-health' | 'other';
}

export function useLocalResources() {
  const [location, setLocation] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  const {
    data: resources,
    isLoading,
    error,
    isFetching,
    refetch
  } = useQuery<LocalResource[]>({
    queryKey: ['/api/local-resources', location],
    queryFn: async () => {
      if (!location || location.trim() === '') {
        return [];
      }
      
      const res = await apiRequest('GET', `/api/local-resources?location=${encodeURIComponent(location)}`);
      return await res.json();
    },
    enabled: isSearching && !!location,
    retry: 2,
    refetchOnWindowFocus: false
  });

  const handleSearch = (newLocation: string) => {
    setLocation(newLocation);
    setIsSearching(true);
  };

  const resetSearch = () => {
    setLocation('');
    setIsSearching(false);
  };

  const needsApiKey = error ? 
    (error as any)?.message?.includes('API key') || 
    (error as any)?.response?.data?.needsKey || 
    false : false;

  return {
    resources: resources || [],
    isLoading: isLoading || isFetching,
    error,
    needsApiKey,
    location,
    setLocation,
    handleSearch,
    resetSearch,
    refetch
  };
}