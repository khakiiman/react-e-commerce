'use client';

import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

import FilterCategory from '@/components/FilterCategory';
import NoProductFound from '@/components/NoProductFound';
import Product from '@/components/Product';
import Search from '@/components/molecules/Search';
import ServerPagination from '@/components/ServerPagination';
import { useTheme } from '@/contexts/ThemeContext';
import useDebounce from '@/hooks/useDebounce';
import { useCategories } from '@/hooks/useProductsApi';
import { selectFavorites } from '@/store/slices/favoritesSlice';
import { Category, Product as ProductType } from '@/types/api';
import colorSystem from '@/styles/colorSystem';

interface ServerProductsProps {
  products: ProductType[];
  totalProducts: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  isLoading?: boolean;
  initialSearchParams?: Record<string, string | string[] | undefined>;
}

const ServerProducts: React.FC<ServerProductsProps> = ({
  products,
  totalProducts,
  currentPage,
  pageSize,
  totalPages,
  isLoading = false,
}) => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colorSystem.dark : colorSystem.light;

  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams?.get('search') || '');
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams?.get('category') || ''
  );
  const [priceRange, setPriceRange] = useState({
    min: searchParams?.get('minPrice') || '',
    max: searchParams?.get('maxPrice') || '',
  });
  const [minRating, setMinRating] = useState<string>(searchParams?.get('minRating') || '');
  const [showFavorites, setShowFavorites] = useState<boolean>(
    searchParams?.get('showFavorites') === 'true'
  );

  const { data: categories = [] } = useCategories();
  const categoriesArray = categories as Category[];
  const favorites = useSelector(selectFavorites);

  const updateUrlParams = useCallback(
    (params: Record<string, string | null>) => {
      const urlParams = new URLSearchParams(searchParams?.toString() || '');

      const isFilterChange = Object.keys(params).some(key =>
        ['search', 'category', 'minPrice', 'maxPrice', 'minRating', 'showFavorites'].includes(key)
      );

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === '') {
          urlParams.delete(key);
        } else {
          urlParams.set(key, value);
        }
      });

      if (isFilterChange && !('page' in params)) {
        urlParams.set('page', '1');
      }

      if (!urlParams.has('page')) {
        urlParams.set('page', searchParams?.get('page') || '1');
      }

      router.replace(`/products?${urlParams.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  useEffect(() => {
    setSearchQuery(searchParams?.get('search') || '');
    setSelectedCategory(searchParams?.get('category') || '');
    setPriceRange({
      min: searchParams?.get('minPrice') || '',
      max: searchParams?.get('maxPrice') || '',
    });
    setMinRating(searchParams?.get('minRating') || '');
    setShowFavorites(searchParams?.get('showFavorites') === 'true');
  }, [searchParams]);

  useEffect(() => {
    if (debouncedSearchQuery !== searchParams?.get('search')) {
      if (debouncedSearchQuery === '' && !searchParams?.has('search')) {
        return;
      }
      updateUrlParams({ search: debouncedSearchQuery || null });
    }
  }, [debouncedSearchQuery, searchParams, updateUrlParams]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
    updateUrlParams({ search: null });
  }, [updateUrlParams]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);

      updateUrlParams({
        category: category && category !== '0' && category !== '' ? category : null,
      });
    },
    [updateUrlParams]
  );

  const handlePriceRangeChange = useCallback(
    (min: string, max: string) => {
      setPriceRange({ min, max });
      updateUrlParams({
        minPrice: min || null,
        maxPrice: max || null,
      });
    },
    [updateUrlParams]
  );

  const handleRatingChange = useCallback(
    (rating: string) => {
      setMinRating(rating);
      updateUrlParams({
        minRating: rating || null,
      });
    },
    [updateUrlParams]
  );

  const handleToggleFavorites = useCallback(() => {
    const newValue = !showFavorites;
    setShowFavorites(newValue);
    updateUrlParams({
      showFavorites: newValue ? 'true' : null,
    });
  }, [showFavorites, updateUrlParams]);

  const getCategoryName = useCallback(
    (categoryId?: string) => {
      if (!categoryId || categoryId === '0') return null;
      const category = categoriesArray.find((cat: Category) => cat.id.toString() === categoryId);
      return category ? category.name : null;
    },
    [categoriesArray]
  );

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setMinRating('');
    setShowFavorites(false);

    const urlParams = new URLSearchParams();
    if (searchParams?.has('page')) {
      urlParams.set('page', searchParams.get('page')!);
    }
    router.replace(`/products?${urlParams.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    if (searchQuery && searchQuery !== searchParams?.get('search')) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== searchParams?.get('category')) {
      filtered = filtered.filter(product => product.category.id.toString() === selectedCategory);
    }

    if (priceRange.min && priceRange.min !== searchParams?.get('minPrice')) {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }

    if (priceRange.max && priceRange.max !== searchParams?.get('maxPrice')) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    if (minRating && minRating !== searchParams?.get('minRating')) {
      filtered = filtered.filter(product => (product.rating || 0) >= parseFloat(minRating));
    }

    if (showFavorites) {
      filtered = filtered.filter(product => favorites.includes(product.id as number));
    }

    return filtered;
  }, [
    products,
    searchQuery,
    selectedCategory,
    priceRange.min,
    priceRange.max,
    minRating,
    showFavorites,
    searchParams,
    favorites,
  ]);

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto sm:px-6 max-w-7xl min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <div
          className={`flex flex-col items-center justify-center p-8 rounded-lg ${themeColors.background.primary}/50 backdrop-blur-sm`}
        >
          <Triangle
            visible={true}
            height="80"
            width="80"
            color={theme === 'dark' ? '#FFFFFF' : '#334970'}
            ariaLabel="triangle-loading"
            wrapperClass=""
          />
          <p className={`mt-4 ${themeColors.text.tertiary}`}>Loading products...</p>
        </div>
      </div>
    );
  }

  if (!filteredProducts.length) {
    const emptyStateType = showFavorites
      ? 'favorites'
      : searchQuery
        ? 'search'
        : selectedCategory || priceRange.min || priceRange.max || minRating
          ? 'filter'
          : 'default';

    return (
      <div className="container px-4 mx-auto sm:px-6 max-w-7xl min-h-[calc(100vh-200px)]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-between gap-4 pt-2 mb-8 md:flex-row md:items-center"
        >
          <div>
            <h1 className={`text-3xl font-bold ${themeColors.text.primary}`}>Products</h1>
            <p className={`mt-1 text-sm ${themeColors.text.tertiary}`}>
              {showFavorites
                ? 'Your favorites collection'
                : 'No products found for your current filters'}
            </p>
          </div>
        </motion.div>

        {(searchQuery ||
          selectedCategory ||
          priceRange.min ||
          priceRange.max ||
          minRating ||
          showFavorites) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <span
                className={`flex items-center px-3 py-1 text-sm ${themeColors.background.badge} rounded-full`}
              >
                Search: {searchQuery}
                <button
                  onClick={handleSearchClear}
                  className={`ml-2 ${themeColors.icon.interactive}`}
                  aria-label="Clear search filter"
                >
                  ×
                </button>
              </span>
            )}

            {selectedCategory && (
              <span
                className={`flex items-center px-3 py-1 text-sm ${themeColors.background.badge} rounded-full`}
              >
                Category: {getCategoryName(selectedCategory) || selectedCategory}
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`ml-2 ${themeColors.icon.interactive}`}
                  aria-label="Clear category filter"
                >
                  ×
                </button>
              </span>
            )}

            {(priceRange.min || priceRange.max) && (
              <span
                className={`flex items-center px-3 py-1 text-sm ${themeColors.background.badge} rounded-full`}
              >
                Price: {priceRange.min || '0'} - {priceRange.max || 'Any'}
                <button
                  onClick={() => handlePriceRangeChange('', '')}
                  className={`ml-2 ${themeColors.icon.interactive}`}
                  aria-label="Clear price filter"
                >
                  ×
                </button>
              </span>
            )}

            {minRating && (
              <span
                className={`flex items-center px-3 py-1 text-sm ${themeColors.background.badge} rounded-full`}
              >
                Min Rating: {minRating}★
                <button
                  onClick={() => handleRatingChange('')}
                  className={`ml-2 ${themeColors.icon.interactive}`}
                  aria-label="Clear rating filter"
                >
                  ×
                </button>
              </span>
            )}

            {showFavorites && (
              <span
                className={`flex items-center px-3 py-1 text-sm ${themeColors.interactive.selected} rounded-full`}
              >
                Favorites Only
                <button
                  onClick={handleToggleFavorites}
                  className={`ml-2 ${themeColors.icon.interactive}`}
                  aria-label="Clear favorites filter"
                >
                  ×
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className={`px-3 py-1 text-sm ${themeColors.button.secondary} rounded-full`}
              data-testid="clear-all-filters"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-6">
              <Search
                initialValue={searchQuery}
                onSearch={handleSearch}
                onClear={handleSearchClear}
              />
              <div className={`${themeColors.background.card} p-4`}>
                <FilterCategory
                  query={{
                    query: {
                      category: selectedCategory,
                      minPrice: priceRange.min,
                      maxPrice: priceRange.max,
                      minRating: minRating,
                      showFavorites: showFavorites ? 'true' : undefined,
                      search: searchQuery,
                    },
                    setQuery: newQuery => {
                      console.debug('FilterCategory setQuery called with:', newQuery);

                      if ('category' in newQuery && newQuery.category !== selectedCategory) {
                        const category = newQuery.category || '';
                        handleCategoryChange(category);
                      }

                      const hasMinPriceChange =
                        'minPrice' in newQuery && newQuery.minPrice !== priceRange.min;
                      const hasMaxPriceChange =
                        'maxPrice' in newQuery && newQuery.maxPrice !== priceRange.max;

                      if (hasMinPriceChange || hasMaxPriceChange) {
                        handlePriceRangeChange(newQuery.minPrice || '', newQuery.maxPrice || '');
                      }

                      if ('minRating' in newQuery && newQuery.minRating !== minRating) {
                        handleRatingChange(newQuery.minRating || '');
                      }

                      if ('showFavorites' in newQuery) {
                        const newShowFavorites = newQuery.showFavorites === 'true';
                        if (newShowFavorites !== showFavorites) {
                          handleToggleFavorites();
                        }
                      }

                      if ('search' in newQuery && newQuery.search !== searchQuery) {
                        handleSearch(newQuery.search || '');
                      }
                    },
                  }}
                />
              </div>
            </div>
          </aside>

          <main className="w-full lg:w-3/4">
            <NoProductFound type={emptyStateType} showBackButton={emptyStateType !== 'default'} />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto sm:px-6 max-w-7xl min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col justify-between gap-4 pt-2 mb-8 md:flex-row md:items-center"
      >
        <div>
          <h1 className={`text-3xl font-bold ${themeColors.text.primary}`}>Products</h1>
          <p className={`mt-1 text-sm ${themeColors.text.tertiary}`}>
            Browse our collection of {totalProducts} products
          </p>
        </div>
      </motion.div>

      {(searchQuery ||
        selectedCategory ||
        priceRange.min ||
        priceRange.max ||
        minRating ||
        showFavorites) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchQuery && (
            <span
              className={`flex items-center px-3 py-1 text-sm ${themeColors.background.badge} rounded-full`}
            >
              Search: {searchQuery}
              <button
                onClick={handleSearchClear}
                className={`ml-2 ${themeColors.icon.interactive}`}
                aria-label="Clear search filter"
              >
                ×
              </button>
            </span>
          )}

          {selectedCategory && (
            <span
              className={`flex items-center px-3 py-1 text-sm ${themeColors.background.badge} rounded-full`}
            >
              Category: {getCategoryName(selectedCategory) || selectedCategory}
              <button
                onClick={() => handleCategoryChange('')}
                className={`ml-2 ${themeColors.icon.interactive}`}
                aria-label="Clear category filter"
              >
                ×
              </button>
            </span>
          )}

          {(priceRange.min || priceRange.max) && (
            <span
              className={`flex items-center px-3 py-1 text-sm ${themeColors.background.badge} rounded-full`}
            >
              Price: {priceRange.min || '0'} - {priceRange.max || 'Any'}
              <button
                onClick={() => handlePriceRangeChange('', '')}
                className={`ml-2 ${themeColors.icon.interactive}`}
                aria-label="Clear price filter"
              >
                ×
              </button>
            </span>
          )}

          {minRating && (
            <span
              className={`flex items-center px-3 py-1 text-sm ${themeColors.background.badge} rounded-full`}
            >
              Min Rating: {minRating}★
              <button
                onClick={() => handleRatingChange('')}
                className={`ml-2 ${themeColors.icon.interactive}`}
                aria-label="Clear rating filter"
              >
                ×
              </button>
            </span>
          )}

          {showFavorites && (
            <span
              className={`flex items-center px-3 py-1 text-sm ${themeColors.interactive.selected} rounded-full`}
            >
              Favorites Only
              <button
                onClick={handleToggleFavorites}
                className={`ml-2 ${themeColors.icon.interactive}`}
                aria-label="Clear favorites filter"
              >
                ×
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className={`px-3 py-1 text-sm ${themeColors.button.secondary} rounded-full`}
            data-testid="clear-all-filters"
          >
            Clear All
          </button>
        </div>
      )}

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-6">
            <Search
              initialValue={searchQuery}
              onSearch={handleSearch}
              onClear={handleSearchClear}
            />
            <div className={`${themeColors.background.card} p-4`}>
              <FilterCategory
                query={{
                  query: {
                    category: selectedCategory,
                    minPrice: priceRange.min,
                    maxPrice: priceRange.max,
                    minRating: minRating,
                    showFavorites: showFavorites ? 'true' : undefined,
                    search: searchQuery,
                  },
                  setQuery: newQuery => {
                    console.debug('FilterCategory setQuery called with:', newQuery);

                    if ('category' in newQuery && newQuery.category !== selectedCategory) {
                      const category = newQuery.category || '';
                      handleCategoryChange(category);
                    }

                    const hasMinPriceChange =
                      'minPrice' in newQuery && newQuery.minPrice !== priceRange.min;
                    const hasMaxPriceChange =
                      'maxPrice' in newQuery && newQuery.maxPrice !== priceRange.max;

                    if (hasMinPriceChange || hasMaxPriceChange) {
                      handlePriceRangeChange(newQuery.minPrice || '', newQuery.maxPrice || '');
                    }

                    if ('minRating' in newQuery && newQuery.minRating !== minRating) {
                      handleRatingChange(newQuery.minRating || '');
                    }

                    if ('showFavorites' in newQuery) {
                      const newShowFavorites = newQuery.showFavorites === 'true';
                      if (newShowFavorites !== showFavorites) {
                        handleToggleFavorites();
                      }
                    }

                    if ('search' in newQuery && newQuery.search !== searchQuery) {
                      handleSearch(newQuery.search || '');
                    }
                  },
                }}
              />
            </div>
          </div>
        </aside>

        <main className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 sm:gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <Product key={product.id} product={product} index={index} />
            ))}
          </div>

          <ServerPagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} />
        </main>
      </div>
    </div>
  );
};

export default ServerProducts;
