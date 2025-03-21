import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../constants/config';
import dummyJsonProductService from '../middleware/dummyJsonAdapter';
import { 
  ApiError as ApiErrorType, 
  ProductsParams, 
  ProductsResponse, 
  Product, 
  LoginCredentials, 
  LoginResponse,
  CategoriesResponse
} from '../types/api';

export class ApiError extends Error implements ApiErrorType {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const requestDetails = {
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        status: error.response?.status,
        statusText: error.response?.statusText,
      };
      
      console.error('API Request Failed:', requestDetails);
      
      // Handle error messages safely
      let errorMessage = 'Unknown error occurred';
      if (error.response?.data && typeof error.response.data === 'object') {
        errorMessage = (error.response.data as any).message || error.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      const apiError = new ApiError(
        errorMessage,
        error.response?.status || 500,
        error.response?.data
      );
      
      if (error.response?.status === 401) {
        console.warn('Authentication required');
      }
      
      return Promise.reject(apiError);
    }
  );

  return client;
};

const api = createApiClient();

export const productService = {
  getProducts: async (params: ProductsParams = {}): Promise<ProductsResponse> => {
    try {
      const result = await dummyJsonProductService.getProducts(params);
      
      if (result && typeof result === 'object' && 'data' in result) {
        return result as ProductsResponse;
      }
      
      return {
        data: result as Product[],
        total: (result as Product[]).length
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new ApiError(
        'Failed to fetch products',
        error instanceof ApiError ? error.status : 500
      );
    }
  },

  getProduct: async (id: number | string): Promise<Product> => {
    try {
      return await dummyJsonProductService.getProduct(id);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw new ApiError(
        'Failed to fetch product details',
        error instanceof ApiError ? error.status : 500
      );
    }
  },

  getCategories: async (): Promise<CategoriesResponse> => {
    try {
      return await dummyJsonProductService.getCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new ApiError(
        'Failed to fetch categories',
        error instanceof ApiError ? error.status : 500
      );
    }
  },

  getTotalProductCount: async (): Promise<number> => {
    try {
      return await dummyJsonProductService.getTotalProductCount();
    } catch (error) {
      console.error('Error fetching product count:', error);
      return 200;
    }
  },
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new ApiError(
        'Authentication failed',
        error instanceof ApiError ? error.status : 500
      );
    }
  },
  
  logout: (): Promise<void> => {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
};

export default api; 