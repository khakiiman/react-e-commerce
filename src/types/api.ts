// Common types
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

// Error types
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Product types
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

// Category types
export interface CategoriesResponse extends Array<Category> {}

// Auth types
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

// DummyJSON specific types (for middleware adapter)
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