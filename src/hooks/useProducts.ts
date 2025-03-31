import { useState } from 'react';

import { productService } from '../services/api';
import { Product, ProductsParams } from '../types/api';
import { UseProductsReturn } from '../types/hooks';

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchProducts = async (params: ProductsParams = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await productService.getProducts(params);

      if ('data' in response) {
        setProducts(response.data);
        setTotalCount(response.total);
      } else {
        setProducts(response as unknown as Product[]);
        setTotalCount((response as unknown as Product[]).length || 0);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { products, isLoading, error, totalCount, fetchProducts };
};

export default useProducts;
