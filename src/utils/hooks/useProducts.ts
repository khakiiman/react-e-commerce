import { useEffect, useState } from "react";
import api from "../../services/axiosConfig";

interface Product {
  [key: string]: any;
}

function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const dataFetcher = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.products.filter((item: any) => item));
      } catch (err) {
        throw new Error(`Something went wrong while fetching data: ${err}`);
      }
    };
    dataFetcher();
  }, []);

  return products;
}

export default useProducts; 