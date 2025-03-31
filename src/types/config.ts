export interface ApiConfig {
  BASE_URL: string;
  CACHE_TIME: number;
  STALE_TIME: number;
  CATEGORIES_CACHE_TIME: number;
  CATEGORIES_STALE_TIME: number;
  PRODUCT_CACHE_TIME: number;
  PRODUCT_STALE_TIME: number;
  HOMEPAGE_PRODUCTS_CACHE_TIME: number;
  SEARCH_RESULTS_CACHE_TIME: number;
  RELATED_PRODUCTS_CACHE_TIME: number;
  USER_DATA_CACHE_TIME: number;
  MAX_RETRIES: number;
  RETRY_DELAY_BASE: number;
  PREFETCH_ON_HOVER_DELAY: number;
  PREFETCH_PRODUCTS_COUNT: number;
}
export interface PaginationConfig {
  DEFAULT_PAGE_SIZE: number;
  PAGE_SIZE_OPTIONS: number[];
}
export interface SortOption {
  label: string;
  value: string;
}
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  success: string;
  warning: string;
}
export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}
export interface ThemeBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}
export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  breakpoints: ThemeBreakpoints;
}
