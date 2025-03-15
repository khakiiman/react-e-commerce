import axios from 'axios';
import { API_CONFIG } from '../constants/config.js';
import dummyJsonProductService from '../middleware/dummyJsonAdapter.js';

/**
 * API Error class for consistent error handling
 */
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Create API client with default configuration
 */
const createApiClient = () => {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  
  client.interceptors.request.use(
    (config) => {
      
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      
      const requestDetails = {
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        status: error.response?.status,
        statusText: error.response?.statusText,
      };
      
      console.error('API Request Failed:', requestDetails);
      
      
      const apiError = new ApiError(
        error.response?.data?.message || error.message || 'Unknown error occurred',
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

/**
 * Product API service
 * Using DummyJSON adapter to maintain compatibility with the existing frontend
 */
export const productService = {
  /**
   * Get products with filters
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} Products data
   */
  getProducts: async (params) => {
    try {
      
      return await dummyJsonProductService.getProducts(params);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new ApiError(
        'Failed to fetch products',
        error.status || 500
      );
    }
  },

  /**
   * Get a single product by ID
   * @param {number|string} id - Product ID
   * @returns {Promise<Object>} Product data
   */
  getProduct: async (id) => {
    try {
      
      return await dummyJsonProductService.getProduct(id);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw new ApiError(
        'Failed to fetch product details',
        error.status || 500
      );
    }
  },

  /**
   * Get all product categories
   * @returns {Promise<Array>} Categories data
   */
  getCategories: async () => {
    try {
      
      return await dummyJsonProductService.getCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new ApiError(
        'Failed to fetch categories',
        error.status || 500
      );
    }
  },

  /**
   * Get total product count
   * @returns {Promise<number>} Total product count or estimate
   */
  getTotalProductCount: async () => {
    try {
      
      return await dummyJsonProductService.getTotalProductCount();
    } catch (error) {
      console.error('Error fetching product count:', error);
      
      return 200;
    }
  },
};

/**
 * Auth API service (placeholder - expand as needed)
 */
export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new ApiError(
        'Authentication failed',
        error.status || 500
      );
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
};

export default api; 