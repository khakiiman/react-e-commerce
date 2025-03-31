import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { API_CONFIG } from '@/config/constants/config';
import { prefetchProductPage, prefetchProductsPage } from '@/lib/cachingUtils';
import { ExtendedProductsParams } from '@/hooks/useProductsApi';
import { Product } from '@/types/api';

export function usePrefetchNavigation() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const prefetchProductOnHover = useCallback(
    (productId: number) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        prefetchProductPage(queryClient, productId);
      }, API_CONFIG.PREFETCH_ON_HOVER_DELAY);
    },
    [queryClient]
  );

  const prefetchNextPage = useCallback(
    (currentPage: number, pageSize: number, filters?: Partial<ExtendedProductsParams>) => {
      const params = {
        ...(filters || {}),
        offset: currentPage * pageSize,
        limit: pageSize,
      };

      prefetchProductsPage(queryClient, params);
    },
    [queryClient]
  );

  const prefetchCategoryPage = useCallback(
    (categoryId: string | number) => {
      prefetchProductsPage(queryClient, {
        categoryId,
        limit: API_CONFIG.PREFETCH_PRODUCTS_COUNT,
      });
    },
    [queryClient]
  );

  useEffect(() => {
    const productIdMatch = pathname?.match(/\/products\/(\d+)/);
    const productId = productIdMatch?.[1] ? parseInt(productIdMatch[1], 10) : null;

    const categoryIdMatch = pathname?.match(/\/categories\/(\d+)/);
    const categoryId = categoryIdMatch?.[1] ? parseInt(categoryIdMatch[1], 10) : null;

    const pageMatch =
      pathname?.includes('/products') && new URLSearchParams(window.location.search).get('page');
    const currentPage = pageMatch ? parseInt(pageMatch, 10) : null;

    if (productId) {
      const product = queryClient.getQueryData<Product>(['product', productId]);
      if (product?.category?.id) {
        prefetchCategoryPage(product.category.id);
      }
    } else if (categoryId) {
      prefetchCategoryPage(categoryId);
    } else if (currentPage && currentPage > 1) {
      const pageSize = 10;
      const prevPage = currentPage - 1;

      prefetchProductsPage(queryClient, {
        offset: (prevPage - 1) * pageSize,
        limit: pageSize,
      });
    }
  }, [pathname, queryClient, prefetchCategoryPage]);

  return {
    prefetchProductOnHover,
    prefetchNextPage,
    prefetchCategoryPage,
    queryClient,
  };
}
