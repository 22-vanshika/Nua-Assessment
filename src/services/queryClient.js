import { QueryClient } from '@tanstack/react-query'

// Create a QueryClient instance with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      cacheTime: 10 * 60 * 1000,
      // Retry failed requests up to 3 times
      retry: 3,
      // Refetch on window focus
      refetchOnWindowFocus: false,
    },
  },
})

export default queryClient
