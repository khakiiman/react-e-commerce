import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export interface PriceRange {
  min: string;
  max: string;
}

export interface QueryParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  search?: string;
  showFavorites?: string;
  [key: string]: string | undefined;
}

export const updateUrlParams = (
  router: ReturnType<typeof useRouter>,
  params: Record<string, string | null>
) => {
  const urlParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === '') {
      urlParams.delete(key);
    } else {
      urlParams.set(key, value);
    }
  });

  if (urlParams.has('page')) {
    urlParams.set('page', '1');
  }

  router.push(`/products?${urlParams.toString()}`, { scroll: false });
};

export const useSyncQuery = (query: QueryParams, setQuery: (newQuery: QueryParams) => void) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const updateQueryAndUrl = (key: string, value: string | null) => {
    startTransition(() => {
      const newQuery = { ...query };

      if (value === null) {
        delete newQuery[key];
      } else {
        newQuery[key] = value;
      }

      setQuery(newQuery);

      updateUrlParams(router, { [key]: value });
    });
  };

  return {
    updateQueryAndUrl,
    router,
    startTransition,
  };
};

export const useCategoryFilter = (
  query: QueryParams,
  setQuery: (newQuery: QueryParams) => void
) => {
  const { updateQueryAndUrl } = useSyncQuery(query, setQuery);
  const [selectedCat, setSelectedCat] = useState<string>(query.category || '0');

  useEffect(() => {
    setSelectedCat(query.category || '0');
  }, [query.category]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const catId = e.target.value;
    setSelectedCat(catId);
    updateQueryAndUrl('category', catId === '0' ? null : catId);
  };

  return {
    selectedCat,
    handleCategoryChange,
  };
};

export const usePriceFilter = (query: QueryParams, setQuery: (newQuery: QueryParams) => void) => {
  const { router, startTransition } = useSyncQuery(query, setQuery);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: query.minPrice || '',
    max: query.maxPrice || '',
  });
  const [priceError, setPriceError] = useState<string>('');
  const isPriceFilterActive = priceRange.min !== '' || priceRange.max !== '';

  useEffect(() => {
    setPriceRange({
      min: query.minPrice || '',
      max: query.maxPrice || '',
    });
    validatePriceRange({
      min: query.minPrice || '',
      max: query.maxPrice || '',
    });
  }, [query.minPrice, query.maxPrice]);

  const validatePriceRange = (range: PriceRange): boolean => {
    const min = range.min ? parseFloat(range.min) : 0;
    const max = range.max ? parseFloat(range.max) : Infinity;
    if (range.min && range.max && min >= max) {
      setPriceError('Min price must be lower than max price');
      return false;
    }
    if (min < 0 || (range.max && max < 0)) {
      setPriceError('Price cannot be negative');
      return false;
    }
    setPriceError('');
    return true;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newRange = { ...priceRange, [name]: value };
    setPriceRange(newRange);
    validatePriceRange(newRange);
  };

  const applyPriceFilter = () => {
    if (!validatePriceRange(priceRange)) return;

    startTransition(() => {
      const newQuery = { ...query };

      if (priceRange.min) {
        newQuery.minPrice = priceRange.min;
      } else {
        delete newQuery.minPrice;
      }

      if (priceRange.max) {
        newQuery.maxPrice = priceRange.max;
      } else {
        delete newQuery.maxPrice;
      }

      setQuery(newQuery);

      updateUrlParams(router, {
        minPrice: priceRange.min || null,
        maxPrice: priceRange.max || null,
      });
    });
  };

  const clearPriceFilter = () => {
    setPriceRange({ min: '', max: '' });
    setPriceError('');

    startTransition(() => {
      const newQuery = { ...query };
      delete newQuery.minPrice;
      delete newQuery.maxPrice;
      setQuery(newQuery);

      updateUrlParams(router, {
        minPrice: null,
        maxPrice: null,
      });
    });
  };

  return {
    priceRange,
    priceError,
    isPriceFilterActive,
    handlePriceChange,
    applyPriceFilter,
    clearPriceFilter,
  };
};

export const useRatingFilter = (query: QueryParams, setQuery: (newQuery: QueryParams) => void) => {
  const { updateQueryAndUrl } = useSyncQuery(query, setQuery);
  const [minRating, setMinRating] = useState<number>(
    query.minRating ? parseFloat(query.minRating) : 0
  );

  useEffect(() => {
    setMinRating(query.minRating ? parseFloat(query.minRating) : 0);
  }, [query.minRating]);

  const handleRatingChange = (rating: number) => {
    const newRating = rating === minRating ? 0 : rating;
    setMinRating(newRating);
    updateQueryAndUrl('minRating', newRating === 0 ? null : newRating.toString());
  };

  const clearRatingFilter = () => {
    setMinRating(0);
    updateQueryAndUrl('minRating', null);
  };

  return {
    minRating,
    handleRatingChange,
    clearRatingFilter,
  };
};

export const useFavoritesFilter = (
  query: QueryParams,
  setQuery: (newQuery: QueryParams) => void
) => {
  const { updateQueryAndUrl } = useSyncQuery(query, setQuery);
  const showOnlyFavorites = query.showFavorites === 'true';

  const handleFavoritesToggle = () => {
    const newFavoritesState = !showOnlyFavorites;
    updateQueryAndUrl('showFavorites', newFavoritesState ? 'true' : null);
  };

  return {
    showOnlyFavorites,
    handleFavoritesToggle,
  };
};
