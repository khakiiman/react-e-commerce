import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/api';
import { API_CONFIG } from '../constants/config';
import { Product, ProductsParams } from '../types/api';

export function useProducts(params?: ProductsParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
    staleTime: API_CONFIG.STALE_TIME,
    gcTime: API_CONFIG.CACHE_TIME,
    enabled: params ? !params.disabled : true,
  });
}

export function useProduct(id?: number) {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id as number),
    staleTime: API_CONFIG.STALE_TIME,
    gcTime: API_CONFIG.CACHE_TIME,
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery<any[], Error>({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
    staleTime: API_CONFIG.STALE_TIME,
    gcTime: API_CONFIG.CACHE_TIME,
  });
}

export function useTotalProductCount() {
  return useQuery<number, Error>({
    queryKey: ['productCount'],
    queryFn: productService.getTotalProductCount,
    staleTime: API_CONFIG.STALE_TIME,
    gcTime: API_CONFIG.CACHE_TIME,
    retry: 1,
    retryDelay: 1000
  });
} 