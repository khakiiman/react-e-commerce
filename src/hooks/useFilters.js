import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useFilters(initialFilters = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const params = {
      page: searchParams.get('page'),
      pageSize: searchParams.get('pageSize'),
      category: searchParams.get('category'),
      search: searchParams.get('search'),
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
      minRating: searchParams.get('minRating'),
      sortOption: searchParams.get('sortOption'),
      sortDirection: searchParams.get('sortDirection'),
      showFavorites: searchParams.get('showFavorites'),
    };

    const initialState = {};
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
    const newParams = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams[key] = value.toString();
      }
    });
    
    setSearchParams(newParams);
  }, [filters, setSearchParams]);

  const updateFilter = useCallback((key, value) => {
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