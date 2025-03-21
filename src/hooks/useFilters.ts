import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface FilterParams {
  page?: string;
  pageSize?: string;
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  sortOption?: string;
  sortDirection?: string;
  showFavorites?: string;
  [key: string]: string | undefined;
}

export default function useFilters(initialFilters: FilterParams = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterParams>(initialFilters);

  useEffect(() => {
    const params: FilterParams = {
      page: searchParams.get('page') || undefined,
      pageSize: searchParams.get('pageSize') || undefined,
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      minPrice: searchParams.get('minPrice') || undefined,
      maxPrice: searchParams.get('maxPrice') || undefined,
      minRating: searchParams.get('minRating') || undefined,
      sortOption: searchParams.get('sortOption') || undefined,
      sortDirection: searchParams.get('sortDirection') || undefined,
      showFavorites: searchParams.get('showFavorites') || undefined,
    };

    const initialState: FilterParams = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        initialState[key] = value;
      }
    });

    if (Object.keys(initialState).length > 0) {
      setFilters(initialState);
    }
  }, []);

  useEffect(() => {
    const newParams: Record<string, string> = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams[key] = value.toString();
      }
    });
    
    setSearchParams(newParams);
  }, [filters, setSearchParams]);

  const updateFilter = useCallback((key: string, value: string | undefined) => {
    setFilters(prev => {
      if (value === undefined || value === '') {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    updateFilter,
    clearFilters,
  };
} 