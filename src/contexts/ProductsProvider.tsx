'use client';
import { createContext, ReactNode, useContext } from 'react';

import { useProducts } from '../hooks/useProductsApi';
import { Product } from '../types/api';

const productsContext = createContext<Product[] | undefined>(undefined);

interface ProductsProviderProps {
  children: ReactNode;
}

function ProductsProvider({ children }: ProductsProviderProps) {
  const { data } = useProducts({ disabled: true });
  const products = data && 'data' in data ? data.data : [];

  return <productsContext.Provider value={products}>{children}</productsContext.Provider>;
}

function useProductConsumer(): Product[] | undefined {
  const context = useContext(productsContext);
  return context;
}

function useGetProduct(id: number): Product | undefined {
  const context = useContext(productsContext);
  if (context !== undefined) {
    return context.find(product => product.id === id);
  }
  return undefined;
}

export default ProductsProvider;
export { useGetProduct, useProductConsumer };
