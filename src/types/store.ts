import { Product } from './api';

// Cart types
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  product?: Product;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  checkout: boolean;
}

// Favorites types
export interface FavoritesState {
  items: number[]; // Array of product IDs
}

// Auth types
export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// UI types
export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  cartDrawerOpen: boolean;
  modalOpen: boolean;
  modalContent: React.ReactNode | null;
  toasts: Toast[];
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

// Root state type
export interface RootState {
  cart: CartState;
  favorites: FavoritesState;
  auth: AuthState;
  ui: UIState;
}

// Common action payloads
export interface LoginPayload {
  email: string;
  password: string;
}

export interface AddToCartPayload {
  id?: number;
  title?: string;
  price?: number;
  quantity?: number;
  image?: string;
  product?: Product;
}

export interface ToastPayload {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
} 