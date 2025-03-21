import { ApiConfig, PaginationConfig, SortOption, Theme } from '../types/config';

export const API_CONFIG: ApiConfig = {
  BASE_URL: 'https://api.escuelajs.co/api/v1',
  CACHE_TIME: 1000 * 60 * 30,
  STALE_TIME: 1000 * 60 * 5,
};

export const PAGINATION_CONFIG: PaginationConfig = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

export const SORT_OPTIONS: SortOption[] = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A to Z', value: 'name_asc' },
  { label: 'Name: Z to A', value: 'name_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Rating: Low to High', value: 'rating_asc' },
];

export const THEME: Theme = {
  colors: {
    primary: '#1f2937',
    secondary: '#374151',
    accent: '#3B82F6',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}; 