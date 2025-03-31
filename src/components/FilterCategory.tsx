import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  useCategoryFilter,
  useFavoritesFilter,
  usePriceFilter,
  useRatingFilter,
  type QueryParams,
} from '../hooks/useFilterHooks';
import { useTheme } from '../contexts/ThemeContext';
import { useCategories } from '../hooks/useProductsApi';
import { selectFavorites } from '../store/slices/favoritesSlice';
import { Category } from '../types/api';
import { CategoryFilter, FavoritesFilter, PriceFilter, RatingFilter } from './ui/FilterComponents';
import colorSystem from '../styles/colorSystem';

interface FilterCategoryProps {
  query: {
    query: QueryParams;
    setQuery: (newQuery: QueryParams) => void;
  };
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ query: { query, setQuery } }) => {
  const favorites = useSelector(selectFavorites);

  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colorSystem.dark : colorSystem.light;

  const {
    data: categoriesData = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  const categories = categoriesData as Category[];

  const { selectedCat, handleCategoryChange } = useCategoryFilter(query, setQuery);

  const {
    priceRange,
    priceError,
    isPriceFilterActive,
    handlePriceChange,
    applyPriceFilter,
    clearPriceFilter,
  } = usePriceFilter(query, setQuery);

  const { minRating, handleRatingChange, clearRatingFilter } = useRatingFilter(query, setQuery);

  const { showOnlyFavorites, handleFavoritesToggle } = useFavoritesFilter(query, setQuery);

  useEffect(() => {
    console.debug('FilterCategory mounted with query:', query);
  }, [query]);

  return (
    <div data-testid="filter-category-container" className={themeColors.text.primary}>
      <FavoritesFilter
        showOnlyFavorites={showOnlyFavorites}
        favoritesCount={favorites.length}
        onToggle={handleFavoritesToggle}
      />

      <CategoryFilter
        selectedCategory={selectedCat}
        categories={categories}
        isLoading={isCategoriesLoading}
        isError={isCategoriesError}
        onChange={handleCategoryChange}
      />

      <PriceFilter
        priceRange={priceRange}
        priceError={priceError}
        isPriceFilterActive={isPriceFilterActive}
        onPriceChange={handlePriceChange}
        onApply={applyPriceFilter}
        onClear={clearPriceFilter}
      />

      <RatingFilter
        minRating={minRating}
        onRatingChange={handleRatingChange}
        onClear={clearRatingFilter}
      />
    </div>
  );
};

export default FilterCategory;
