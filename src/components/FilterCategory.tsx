import React, { useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { TbCategoryPlus } from "react-icons/tb";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import StarRating from "./StarRating";
import { useCategories } from "../hooks/useProductsApi";
import { selectFavorites } from "../store/slices/favoritesSlice";
import { Category } from "../types/api";

interface PriceRange {
  min: string;
  max: string;
}

interface QueryParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  search?: string;
  showFavorites?: string;
  [key: string]: string | undefined;
}

interface FilterCategoryProps {
  query: {
    query: QueryParams;
    setQuery: (newQuery: QueryParams) => void;
  };
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center my-4">
    <ThreeDots
      visible={true}
      height="30"
      width="30"
      color="#1f2937"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading categories...</p>
  </div>
);

const FilterCategory: React.FC<FilterCategoryProps> = ({ query: { query, setQuery } }) => {
  const [selectedCat, setSelectedCat] = useState<string>(query.category || '0');
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: query.minPrice || "",
    max: query.maxPrice || ""
  });
  const [priceError, setPriceError] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(query.minRating ? parseFloat(query.minRating) : 0);
  const [_, startTransition] = useTransition();
  const favorites = useSelector(selectFavorites);
  const showOnlyFavorites = query.showFavorites === 'true';

  const { 
    data: categories = [], 
    isLoading: isCategoriesLoading, 
    isError: isCategoriesError 
  } = useCategories();

  const isPriceFilterActive = priceRange.min !== "" || priceRange.max !== "";

  useEffect(() => {
    startTransition(() => {
      if (query.category) {
        setSelectedCat(query.category);
      } else {
        setSelectedCat('0');
      }
      
      setPriceRange({
        min: query.minPrice || "",
        max: query.maxPrice || ""
      });
      
      setMinRating(query.minRating ? parseFloat(query.minRating) : 0);
      
      validatePriceRange({
        min: query.minPrice || "",
        max: query.maxPrice || ""
      });
    });
  }, [query]);

  const categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const catId = e.target.value;
    setSelectedCat(catId);

    startTransition(() => {
      const newQuery = { ...query };
      if (catId === '0') {
        delete newQuery.category;
      } else {
        newQuery.category = catId;
      }
      setQuery(newQuery);
    });
  };

  const validatePriceRange = (range: PriceRange): boolean => {
    const min = range.min ? parseFloat(range.min) : 0;
    const max = range.max ? parseFloat(range.max) : Infinity;
    
    if (range.min && range.max && min >= max) {
      setPriceError("Min price must be lower than max price");
      return false;
    }
    
    if (min < 0 || (range.max && max < 0)) {
      setPriceError("Price cannot be negative");
      return false;
    }
    
    setPriceError("");
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
    });
  };

  const clearPriceFilter = () => {
    setPriceRange({ min: "", max: "" });
    setPriceError("");
    
    startTransition(() => {
      const newQuery = { ...query };
      delete newQuery.minPrice;
      delete newQuery.maxPrice;
      setQuery(newQuery);
    });
  };
  
  const handleRatingChange = (rating: number) => {
    // Toggle the rating if clicking on same star twice
    const newRating = rating === minRating ? 0 : rating;
    setMinRating(newRating);
    
    startTransition(() => {
      const newQuery = { ...query };
      if (newRating === 0) {
        delete newQuery.minRating;
      } else {
        newQuery.minRating = newRating.toString();
      }
      setQuery(newQuery);
    });
  };
  
  const clearRatingFilter = () => {
    setMinRating(0);
    
    startTransition(() => {
      const newQuery = { ...query };
      delete newQuery.minRating;
      setQuery(newQuery);
    });
  };

  const handleFavoritesToggle = () => {
    startTransition(() => {
      const newQuery = { ...query };
      if (showOnlyFavorites) {
        delete newQuery.showFavorites;
      } else {
        newQuery.showFavorites = 'true';
      }
      setQuery(newQuery);
    });
  };

  return (
    <div>
      {/* Favorites Filter */}
      <div className="mb-6">
        <button
          onClick={handleFavoritesToggle}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors rounded-lg ${
            showOnlyFavorites
              ? 'bg-gray-700 text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-grayshade-600 dark:text-gray-600 dark:hover:bg-grayshade-500'
          }`}
          data-testid="favorites-toggle"
        >
          <FaHeart className={showOnlyFavorites ? 'text-red-500' : ''} />
          {showOnlyFavorites ? 'Show All Products' : `Show Favorites (${favorites.length})`}
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <TbCategoryPlus className="mr-2 text-gray-500" />
          <label htmlFor="category-select" className="text-xl font-medium">Categories:</label>
        </div>
        
        {isCategoriesLoading ? (
          <LoadingSpinner />
        ) : isCategoriesError ? (
          <p className="text-sm text-red-500">Error loading categories</p>
        ) : (
          <select
            id="category-select"
            value={selectedCat}
            onChange={categoryHandler}
            className="w-full p-2 text-lg border rounded-lg border-grayshade-50 dark:border-grayshade-300 dark:bg-grayshade-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
            data-testid="category-dropdown"
          >
            <option value="0">All</option>
            {Array.isArray(categories) && categories.map((category: Category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </div>
      
      {/* Price Range Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <FaMoneyBillWave className="mr-2 text-gray-500" />
          <label className="text-xl font-medium">Price Range:</label>
        </div>
        
        <div className="p-3 border rounded-lg border-grayshade-50 dark:border-grayshade-300 dark:bg-grayshade-500">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <label htmlFor="min-price" className="w-12 text-sm">Min:</label>
              <input
                type="number"
                id="min-price"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                placeholder="Min price"
                min="0"
                className={`w-full p-2 text-sm border rounded-md ${
                  priceError ? 'border-red-500' : 'border-grayshade-50 dark:border-grayshade-300'
                } dark:bg-grayshade-600 focus:outline-none focus:ring-1 focus:ring-gray-700`}
                data-testid="min-price-input"
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="max-price" className="w-12 text-sm">Max:</label>
              <input
                type="number"
                id="max-price"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                placeholder="Max price"
                min="0"
                className={`w-full p-2 text-sm border rounded-md ${
                  priceError ? 'border-red-500' : 'border-grayshade-50 dark:border-grayshade-300'
                } dark:bg-grayshade-600 focus:outline-none focus:ring-1 focus:ring-gray-700`}
                data-testid="max-price-input"
              />
            </div>
            
            {priceError && (
              <div className="text-xs font-medium text-red-500" data-testid="price-error">
                {priceError}
              </div>
            )}
            
            <div className="flex justify-between pt-2">
              <button
                onClick={applyPriceFilter}
                disabled={!!priceError}
                className={`px-3 py-1 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  priceError 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gray-700 hover:bg-gray-800 focus:ring-gray-700'
                }`}
                data-testid="apply-price-filter"
              >
                Apply
              </button>
              
              <button
                onClick={clearPriceFilter}
                disabled={!isPriceFilterActive}
                className={`px-3 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  !isPriceFilterActive
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-grayshade-600 dark:text-grayshade-300'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-300 dark:bg-grayshade-400 dark:text-white dark:hover:bg-grayshade-300'
                }`}
                data-testid="clear-price-filter"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rating Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <MdStars className="mr-2 text-gray-500" />
          <label className="text-xl font-medium">Minimum Rating:</label>
        </div>
        
        <div className="p-3 border rounded-lg border-grayshade-50 dark:border-grayshade-300 dark:bg-grayshade-500">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-center">
              <StarRating 
                rating={minRating} 
                onRatingChange={handleRatingChange}
                interactive={true}
                size="lg"
                showRating={true}
              />
            </div>
            
            <div className="flex justify-between pt-2">
              <button
                onClick={clearRatingFilter}
                disabled={minRating === 0}
                className={`w-full px-3 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  minRating === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-grayshade-600 dark:text-grayshade-300'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-300 dark:bg-grayshade-400 dark:text-white dark:hover:bg-grayshade-300'
                }`}
                data-testid="clear-rating-filter"
              >
                Clear Rating Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCategory; 