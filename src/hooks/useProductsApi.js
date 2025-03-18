import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/api';
import { API_CONFIG } from '../constants/config';

export function useProducts(params) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
    staleTime: API_CONFIG.STALE_TIME,
    cacheTime: API_CONFIG.CACHE_TIME,
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
    staleTime: API_CONFIG.STALE_TIME,
    cacheTime: API_CONFIG.CACHE_TIME,
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
    staleTime: API_CONFIG.STALE_TIME,
    cacheTime: API_CONFIG.CACHE_TIME,
  });
}

export function useTotalProductCount() {
  return useQuery({
    queryKey: ['productCount'],
    queryFn: productService.getTotalProductCount,
    staleTime: API_CONFIG.STALE_TIME,
    cacheTime: API_CONFIG.CACHE_TIME,
    retry: 1,  
    retryDelay: 1000, 
    onError: (error) => {
      console.warn('Error fetching product count, using fallback value:', error.message);
    }
  });
} 