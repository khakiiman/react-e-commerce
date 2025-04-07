import { Product } from './api';
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
export interface FavoritesState {
  items: number[];
}
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
export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  cartDrawerOpen: boolean;
  modalOpen: boolean;
  modalContent: React.ReactNode | null;
  toasts: Toast[];
}
export interface Toast {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  id?: string;
}
export interface RootState {
  cart: CartState;
  favorites: FavoritesState;
  auth: AuthState;
  ui: UIState;
}
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
