import { createContext, useContext } from "react";
import { useProducts } from "../hooks/useProductsApi";

const productsContext = createContext();

function ProductsProvider({ children }) {
  // Pass a special flag to disable automatic fetching when not needed
  const products = useProducts({ disabled: true });
  
  return (
    <productsContext.Provider value={products}>
      {children}
    </productsContext.Provider>
  );
}

function useProductConsumer() {
  const context = useContext(productsContext);
  return context;
}

function useGetProduct(id){
  const context = useContext(productsContext);
  if (context !== undefined) {
    return context.find(product=> product.id === id)
  }
}

export default ProductsProvider;
export { useProductConsumer, useGetProduct };
