import { RefObject } from 'react';
import { Product, Category, ProductsParams } from './api';
import { CartItem, RootState, Toast } from './store';
import { AppDispatch } from '../store';

// Common hook return types
export type UseToggleReturn = [boolean, () => void];

export type UseFetchReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

export type UseLocalStorageReturn<T> = [T, (value: T) => void];

// API hooks
export interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  fetchProducts: (params?: ProductsParams) => Promise<void>;
}

export interface UseProductReturn {
  product: Product | null;
  isLoading: boolean;
  error: Error | null;
  fetchProduct: (id: number | string) => Promise<void>;
}

export interface UseCategoriesReturn {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
}

// Cart hooks
export interface UseCartReturn {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isInCart: (productId: number) => boolean;
  addItem: (item: Product, quantity?: number) => void;
  removeItem: (itemId: number) => void;
  increaseQuantity: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void;
  clearCart: () => void;
}

// Favorites hooks
export interface UseFavoritesReturn {
  favoriteIds: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;
}

// Auth hooks
export interface UseAuthReturn {
  isAuthenticated: boolean;
  user: RootState['auth']['user'];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// UI hooks
export interface UseUIReturn {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isCartDrawerOpen: boolean;
  toggleCartDrawer: () => void;
  showModal: (content: React.ReactNode) => void;
  hideModal: () => void;
}

export interface UseToastReturn {
  toasts: Toast[];
  addToast: (message: string, type: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}

// Other common hooks
export interface UseOutsideClickProps {
  ref: RefObject<HTMLElement>;
  callback: () => void;
}

export interface UseScrollPositionReturn {
  scrollX: number;
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
}

// Redux hooks
export interface UseTypedSelectorReturn<T> {
  (selector: (state: RootState) => T): T;
}

export interface UseTypedDispatchReturn {
  (): AppDispatch;
} 