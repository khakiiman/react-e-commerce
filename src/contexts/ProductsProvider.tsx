import { createContext, useContext, ReactNode } from "react";
import { useProducts } from "../hooks/useProductsApi";
import { Product } from "../types/api";

// Create a typed context
const productsContext = createContext<Product[] | undefined>(undefined);

interface ProductsProviderProps {
  children: ReactNode;
}

function ProductsProvider({ children }: ProductsProviderProps) {
  // Pass a special flag to disable automatic fetching when not needed
  const { data } = useProducts({ disabled: true });
  
  // Extract the products array from data if it exists, otherwise use an empty array
  const products = data && 'data' in data ? data.data : [];
  
  return (
    <productsContext.Provider value={products}>
      {children}
    </productsContext.Provider>
  );
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
export { useProductConsumer, useGetProduct }; 