import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

// Hook to fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to fetch single product
export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id),
    enabled: !!id, // Only run if id exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to fetch categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
  })
}

// Hook to fetch products by category
export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => api.getProductsByCategory(category),
    enabled: !!category, // Only run if category exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
