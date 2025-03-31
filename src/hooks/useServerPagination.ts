import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Product } from '@/types/api';

interface PaginationData {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
}

interface QueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  [key: string]: string | number | undefined;
}

export function useServerPagination(initialParams: QueryParams = {}): PaginationData & {
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  updateUrl: (params: QueryParams) => void;
} {
  const router = useRouter();
  const pathname = usePathname();
  const [paginationData, setPaginationData] = useState<PaginationData>({
    products: [],
    total: 0,
    page: initialParams.page || 1,
    pageSize: initialParams.pageSize || 10,
    totalPages: 0,
    isLoading: true,
    error: null,
  });

  const updateUrl = (params: QueryParams) => {
    const queryParams: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams[key] = String(value);
      }
    });

    const queryString = new URLSearchParams(queryParams).toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };

  const setPage = (page: number) => {
    updateUrl({ ...initialParams, page });
  };

  const setPageSize = (pageSize: number) => {
    updateUrl({ ...initialParams, pageSize, page: 1 });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setPaginationData(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const queryParams = new URLSearchParams();
        Object.entries(initialParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
          }
        });

        const response = await fetch(`/api/products?${queryParams.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setPaginationData({
          products: data.products,
          total: data.total,
          page: data.page,
          pageSize: data.pageSize,
          totalPages: data.totalPages,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setPaginationData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Unknown error occurred'),
        }));
      }
    };

    fetchProducts();
  }, [initialParams]);

  return {
    ...paginationData,
    setPage,
    setPageSize,
    updateUrl,
  };
}
