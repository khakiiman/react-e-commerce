import React from 'react';
import { FaHeart, FaMoneyBillWave } from 'react-icons/fa';
import { MdStars } from 'react-icons/md';
import { TbCategoryPlus } from 'react-icons/tb';
import { ThreeDots } from 'react-loader-spinner';

import { PriceRange } from '../../hooks/useFilterHooks';
import { Category } from '../../types/api';
import StarRating from '../StarRating';
import { colorSystem } from '../../styles/colorSystem';
import { useTheme } from '../../contexts/ThemeContext';

export const LoadingSpinner: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center my-4" data-testid="loading-spinner">
      <ThreeDots
        visible={true}
        height="30"
        width="30"
        color={theme === 'light' ? '#1f2937' : '#f5f5f5'}
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p className={`mt-2 text-sm ${colorSystem[theme].text.tertiary}`}>Loading categories...</p>
    </div>
  );
};

interface FavoritesFilterProps {
  showOnlyFavorites: boolean;
  favoritesCount: number;
  onToggle: () => void;
}

export const FavoritesFilter: React.FC<FavoritesFilterProps> = ({
  showOnlyFavorites,
  favoritesCount,
  onToggle,
}) => {
  const { theme } = useTheme();

  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm border border-silver-lake-blue font-medium transition-colors rounded-lg ${
          showOnlyFavorites
            ? `${colorSystem[theme].button.danger}`
            : `${colorSystem[theme].background.secondary} ${colorSystem[theme].text.primary} ${colorSystem[theme].background.hover}`
        }`}
        data-testid="favorites-toggle"
      >
        <FaHeart className={showOnlyFavorites ? `${colorSystem[theme].text.primary}` : ''} />
        {showOnlyFavorites ? 'Show All Products' : `Show Favorites (${favoritesCount})`}
      </button>
    </div>
  );
};

interface CategoryFilterProps {
  selectedCategory: string;
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  categories,
  isLoading,
  isError,
  onChange,
}) => {
  const { theme } = useTheme();

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <TbCategoryPlus className={`mr-2 ${colorSystem[theme].icon.secondary}`} />
        <label htmlFor="category-select" className="text-xl font-medium">
          Categories:
        </label>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <p className={`text-sm ${colorSystem[theme].text.primary}`} data-testid="categories-error">
          Error loading categories
        </p>
      ) : (
        <select
          id="category-select"
          value={selectedCategory}
          onChange={onChange}
          className={`w-full p-2 text-lg border rounded-lg ${colorSystem[theme].border.input} ${colorSystem[theme].background.input} focus:outline-none focus:ring-2 ${
            theme === 'light' ? 'focus:ring-glaucous' : 'focus:ring-silver-lake-blue'
          }`}
          data-testid="category-dropdown"
        >
          <option value="0">All</option>
          {Array.isArray(categories) &&
            categories.map((category: Category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

interface PriceFilterProps {
  priceRange: PriceRange;
  priceError: string;
  isPriceFilterActive: boolean;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApply: () => void;
  onClear: () => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  priceRange,
  priceError,
  isPriceFilterActive,
  onPriceChange,
  onApply,
  onClear,
}) => {
  const { theme } = useTheme();

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <FaMoneyBillWave className={`mr-2 ${colorSystem[theme].icon.secondary}`} />
        <label className="text-xl font-medium">Price Range:</label>
      </div>
      <div
        className={`p-3 border rounded-lg ${colorSystem[theme].border.primary} ${colorSystem[theme].background.secondary}`}
      >
        <div className="flex flex-col space-y-3">
          <div className="flex items-center">
            <label htmlFor="min-price" className="w-12 text-sm">
              Min:
            </label>
            <input
              type="number"
              id="min-price"
              name="min"
              value={priceRange.min}
              onChange={onPriceChange}
              placeholder="Min price"
              min="0"
              className={`w-full p-2 text-sm border rounded-md ${
                priceError
                  ? `${colorSystem[theme].text.primary}`
                  : `${colorSystem[theme].border.input}`
              } ${colorSystem[theme].background.input} focus:outline-none focus:ring-1 ${
                theme === 'light' ? 'focus:ring-glaucous' : 'focus:ring-silver-lake-blue'
              }`}
              data-testid="min-price-input"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="max-price" className="w-12 text-sm">
              Max:
            </label>
            <input
              type="number"
              id="max-price"
              name="max"
              value={priceRange.max}
              onChange={onPriceChange}
              placeholder="Max price"
              min="0"
              className={`w-full p-2 text-sm border rounded-md ${
                priceError
                  ? `${colorSystem[theme].text.primary}`
                  : `${colorSystem[theme].border.input}`
              } ${colorSystem[theme].background.input} focus:outline-none focus:ring-1 ${
                theme === 'light' ? 'focus:ring-glaucous' : 'focus:ring-silver-lake-blue'
              }`}
              data-testid="max-price-input"
            />
          </div>
          {priceError && (
            <div
              className={`text-xs font-medium ${colorSystem[theme].text.primary}`}
              data-testid="price-error"
            >
              {priceError}
            </div>
          )}
          <div className="flex justify-between pt-2">
            <button
              onClick={onApply}
              disabled={!!priceError}
              className={`px-3 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                priceError
                  ? `${colorSystem[theme].interactive.disabled} cursor-not-allowed`
                  : `${colorSystem[theme].button.primary} ${
                      theme === 'light' ? 'focus:ring-glaucous' : 'focus:ring-silver-lake-blue'
                    }`
              }`}
              data-testid="apply-price-filter"
            >
              Apply
            </button>
            <button
              onClick={onClear}
              disabled={!isPriceFilterActive}
              className={`px-3 py-1 text-sm rounded-md focus:outline-none focus:ring-2 border border-silver-lake-blue focus:ring-offset-2 bg-${
                !isPriceFilterActive
                  ? `${colorSystem[theme].interactive.disabled} cursor-not-allowed`
                  : `${colorSystem[theme].button.ghost} ${
                      theme === 'light' ? 'focus:ring-glaucous' : 'focus:ring-silver-lake-blue'
                    }`
              }`}
              data-testid="clear-price-filter"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RatingFilterProps {
  minRating: number;
  onRatingChange: (rating: number) => void;
  onClear: () => void;
}

export const RatingFilter: React.FC<RatingFilterProps> = ({
  minRating,
  onRatingChange,
  onClear,
}) => {
  const { theme } = useTheme();

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <MdStars className={`mr-2 ${colorSystem[theme].icon.secondary}`} />
        <label className="text-xl font-medium">Minimum Rating:</label>
      </div>
      <div
        className={`p-3 border rounded-lg ${colorSystem[theme].border.primary} ${colorSystem[theme].background.secondary}`}
      >
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-center">
            <StarRating
              rating={minRating}
              onRatingChange={onRatingChange}
              interactive={true}
              size="lg"
              showRating={true}
            />
          </div>
          <div className="flex justify-between pt-2">
            <button
              onClick={onClear}
              disabled={minRating === 0}
              className={`w-full px-3 py-1 text-sm rounded-md focus:outline-none border border-silver-lake-blue focus:ring-2 focus:ring-offset-2 bg-${
                minRating === 0
                  ? `${colorSystem[theme].interactive.disabled} cursor-not-allowed`
                  : `${colorSystem[theme].button.ghost} ${
                      theme === 'light' ? 'focus:ring-glaucous' : 'focus:ring-silver-lake-blue'
                    }`
              }`}
              data-testid="clear-rating-filter"
            >
              Clear Rating Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
