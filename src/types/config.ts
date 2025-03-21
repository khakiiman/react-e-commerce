export interface ApiConfig {
  BASE_URL: string;
  CACHE_TIME: number;
  STALE_TIME: number;
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