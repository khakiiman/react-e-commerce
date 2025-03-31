export interface Pagination {
  limit: number;
  offset: number;
  total?: number;
}
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
export interface ApiErrorType {
  status: number;
  data: Record<string, unknown> | null;
}
export class ApiError extends Error implements ApiErrorType {
  status: number;
  data: Record<string, unknown> | null;
  constructor(message: string, status: number, data: Record<string, unknown> | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}
export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
  rating?: number;
  brand?: string;
  discountPercentage?: number;
  stock?: number;
}
export interface ProductsResponse {
  data: Product[];
  total: number;
}
export interface ProductsParams {
  limit?: number;
  offset?: number;
  title?: string;
  price?: number;
  price_min?: number;
  price_max?: number;
  categoryId?: number | string;
  disabled?: boolean;
  min_rating?: number;
}
export interface CategoriesResponse extends Array<Category> {}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    avatar?: string;
  };
}
export interface DummyJsonCategory {
  name?: string;
  slug: string;
}
export interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  meta?: {
    createdAt?: string;
    updatedAt?: string;
  };
}
export interface DummyJsonProductsResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}
