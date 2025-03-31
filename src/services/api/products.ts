import { productService } from '../api';
import type { Product, ProductsParams } from '@/types/api';

export async function getProductById(id: number | string): Promise<Product> {
  return productService.getProduct(id);
}

export async function getProducts(params: ProductsParams = {}) {
  return productService.getProducts(params);
}

export async function getCategories() {
  return productService.getCategories();
}

export async function getTotalProductCount(): Promise<number> {
  return productService.getTotalProductCount();
}

const productAPI = {
  getProductById,
  getProducts,
  getCategories,
  getTotalProductCount,
};

export default productAPI;
