import { useEffect, useState } from 'react';

import { productService } from '../../services/api';
import { Product } from '../../types/api';

function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const dataFetcher = async () => {
      try {
        const response = await productService.getProducts();
        setProducts(response.data);
      } catch (err) {
        throw new Error(
          `Something went wrong while fetching data: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    };
    dataFetcher();
  }, []);
  return products;
}

export default useProducts;
