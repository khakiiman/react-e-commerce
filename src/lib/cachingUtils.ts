import { QueryClient } from '@tanstack/react-query';
import { API_CONFIG } from '@/config/constants/config';
import type { ProductsParams } from '@/types/api';

type PrefetchConfig = {
  keepPreviousData?: boolean;
  staleTime?: number;
};

export const prefetchProductPage = async (
  queryClient: QueryClient,
  productId: number,
  config?: PrefetchConfig
) => {
  try {
    const startTime = performance.now();

    await queryClient.prefetchQuery({
      queryKey: ['product', productId],
      queryFn: () => import('@/services/api').then(mod => mod.productService.getProduct(productId)),
      staleTime: config?.staleTime || API_CONFIG.PRODUCT_STALE_TIME,
    });

    const endTime = performance.now();
    console.debug(`Prefetched product #${productId} in ${endTime - startTime}ms`);

    return true;
  } catch (error) {
    console.error(`Failed to prefetch product #${productId}:`, error);

    return false;
  }
};

export const prefetchProductsPage = async (
  queryClient: QueryClient,
  params: ProductsParams,
  config?: PrefetchConfig
) => {
  try {
    const startTime = performance.now();

    await queryClient.prefetchQuery({
      queryKey: ['products', params],
      queryFn: () => import('@/services/api').then(mod => mod.productService.getProducts(params)),
      staleTime: config?.staleTime || API_CONFIG.STALE_TIME,
    });

    const endTime = performance.now();
    console.debug(`Prefetched products page in ${endTime - startTime}ms`, params);

    return true;
  } catch (error) {
    console.error('Failed to prefetch products page:', error, params);
    return false;
  }
};

export const monitorCacheHealth = (queryClient: QueryClient) => {
  const cacheSize = queryClient.getQueryCache().getAll().length;
  const queries = queryClient.getQueryCache().getAll();

  const activeQueries = queries.filter(q => q.state.status === 'success').length;
  const errorQueries = queries.filter(q => q.state.status === 'error').length;

  console.debug('Cache health metrics:', {
    cacheSize,
    activeQueries,
    errorRate: errorQueries / cacheSize || 0,
  });

  return {
    cacheSize,
    activeQueries,
    errorQueries,
  };
};

export const invalidateResource = async (
  queryClient: QueryClient,
  resourceType: string,
  resourceId?: number | string
) => {
  try {
    if (resourceId) {
      await queryClient.invalidateQueries({
        queryKey: [resourceType, resourceId],
        exact: true,
      });
      console.debug(`Invalidated ${resourceType} #${resourceId}`);
    } else {
      await queryClient.invalidateQueries({
        queryKey: [resourceType],
        exact: false,
      });
      console.debug(`Invalidated all ${resourceType} resources`);
    }
    return true;
  } catch (error) {
    console.error(`Failed to invalidate ${resourceType}:`, error);
    return false;
  }
};
