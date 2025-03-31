import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { API_CONFIG } from '../config/constants/config';
import { productService } from '../services/api';
import { Category, Product, ProductsParams, ProductsResponse } from '../types/api';

export interface ExtendedProductsParams extends ProductsParams {
  isPriority?: boolean;
}

const handleQueryError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, error);

  throw error;
};

export function useProducts(params?: ExtendedProductsParams) {
  const queryClient = useQueryClient();

  const result = useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: async () => {
      try {
        const response = await productService.getProducts(params);
        return response;
      } catch (error) {
        handleQueryError(error, 'useProducts');
        throw error;
      }
    },
    staleTime: params?.isPriority ? API_CONFIG.HOMEPAGE_PRODUCTS_CACHE_TIME : API_CONFIG.STALE_TIME,
    gcTime: API_CONFIG.CACHE_TIME,
    enabled: params ? !params.disabled : true,
  });

  useEffect(() => {
    if (result.data && params?.offset !== undefined && params?.limit) {
      const nextPageParams = { ...params, offset: params.offset + params.limit };

      queryClient.prefetchQuery({
        queryKey: ['products', nextPageParams],
        queryFn: () => productService.getProducts(nextPageParams),
        staleTime: API_CONFIG.STALE_TIME,
      });

      if (params.offset >= params.limit) {
        const prevPageParams = { ...params, offset: Math.max(0, params.offset - params.limit) };
        queryClient.prefetchQuery({
          queryKey: ['products', prevPageParams],
          queryFn: () => productService.getProducts(prevPageParams),
          staleTime: API_CONFIG.STALE_TIME,
        });
      }
    }
  }, [params, queryClient, result.data]);

  return result;
}

export function useProduct(id?: number) {
  const queryClient = useQueryClient();

  const result = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        if (!id) {
          throw new Error('Product ID is required');
        }
        const product = await productService.getProduct(id);
        return product;
      } catch (error) {
        handleQueryError(error, `useProduct(${id})`);
        throw error;
      }
    },
    staleTime: API_CONFIG.PRODUCT_STALE_TIME,
    gcTime: API_CONFIG.PRODUCT_CACHE_TIME,
    enabled: !!id,
  });

  useEffect(() => {
    if (result.data?.category) {
      queryClient.prefetchQuery({
        queryKey: ['products', { categoryId: result.data.category.id }],
        queryFn: () =>
          productService.getProducts({
            categoryId: result.data.category.id,
            limit: API_CONFIG.PREFETCH_PRODUCTS_COUNT,
          }),
        staleTime: API_CONFIG.RELATED_PRODUCTS_CACHE_TIME,
      });

      queryClient.prefetchQuery({
        queryKey: ['category', result.data.category.id],
        queryFn: () =>
          productService
            .getCategories()
            .then(categories => categories.find(cat => cat.id === result.data.category.id) || null),
        staleTime: API_CONFIG.CATEGORIES_STALE_TIME,
      });
    }
  }, [result.data, queryClient]);

  return result;
}

export function useRelatedProducts(categoryId?: number, currentProductId?: number) {
  return useQuery<ProductsResponse>({
    queryKey: ['relatedProducts', categoryId, currentProductId],
    queryFn: async () => {
      try {
        const products = await productService.getProducts({
          categoryId,
          limit: 4,
        });

        if ('data' in products) {
          return {
            ...products,
            data: products.data.filter(product => product.id !== currentProductId),
          };
        }

        const productsArray = products as Product[];
        return {
          data: productsArray.filter(product => product.id !== currentProductId),
          total: productsArray.length,
        };
      } catch (error) {
        handleQueryError(error, 'useRelatedProducts');
        throw error;
      }
    },
    staleTime: API_CONFIG.RELATED_PRODUCTS_CACHE_TIME,
    enabled: !!categoryId,
  });
}

export function useParallelProductData(productId?: number) {
  const results = useQueries({
    queries: [
      {
        queryKey: ['product', productId],
        queryFn: () =>
          productId ? productService.getProduct(productId) : Promise.reject('No product ID'),
        staleTime: API_CONFIG.PRODUCT_STALE_TIME,
        enabled: !!productId,
      },
      {
        queryKey: ['productReviews', productId],
        queryFn: () => {
          console.log('Product reviews API not implemented yet, returning empty array');
          return Promise.resolve([]);
        },
        staleTime: API_CONFIG.STALE_TIME,
        enabled: !!productId,
      },
    ],
  });

  return useMemo(() => {
    const [productQuery, reviewsQuery] = results;

    return {
      product: productQuery.data,
      reviews: reviewsQuery.data || [],
      isLoading: productQuery.isLoading || reviewsQuery.isLoading,
      isError: productQuery.isError || reviewsQuery.isError,
      error: productQuery.error || reviewsQuery.error,
    };
  }, [results]);
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const categories = await productService.getCategories();
        return categories;
      } catch (error) {
        handleQueryError(error, 'useCategories');
        throw error;
      }
    },
    staleTime: API_CONFIG.CATEGORIES_STALE_TIME,
    gcTime: API_CONFIG.CATEGORIES_CACHE_TIME,
  });
}

export function useTotalProductCount() {
  return useQuery<number>({
    queryKey: ['productCount'],
    queryFn: async () => {
      try {
        const count = await productService.getTotalProductCount();
        return count;
      } catch (error) {
        handleQueryError(error, 'useTotalProductCount');
        throw error;
      }
    },
    staleTime: API_CONFIG.STALE_TIME * 2,
    gcTime: API_CONFIG.CACHE_TIME * 2,
    retry: API_CONFIG.MAX_RETRIES,
    retryDelay: attempt => Math.min(attempt * API_CONFIG.RETRY_DELAY_BASE, 30000),
  });
}
