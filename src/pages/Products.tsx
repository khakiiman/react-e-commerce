import React, { useState, useEffect, useTransition, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import { Triangle } from "react-loader-spinner";
import Search from "../components/Search";
import FilterCategory from "../components/FilterCategory";
import addProductRatings from "../utils/helpers/addProductRatings";
import NoProductFound from "../components/NoProductFound";
import Pagination from "../components/Pagination";
import { useProducts, useCategories } from "../hooks/useProductsApi";
import { selectFavorites } from "../store/slices/favoritesSlice";
import { Product as ProductType, Category } from "../types/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaSort, FaChevronDown, FaChevronUp, FaAngleDown } from "react-icons/fa";
import { MdFilterList, MdOutlineSort } from "react-icons/md";

interface QueryParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  showFavorites?: string;
  [key: string]: string | undefined;
}

interface SortConfig {
  option: string;
  direction: 'asc' | 'desc';
}

interface ApiParams {
  offset: number;
  limit: number;
  title?: string;
  categoryId?: number;
  price_min?: number;
  price_max?: number;
  min_rating?: number;
  showFavorites?: boolean;
  [key: string]: string | number | boolean | undefined;
}

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [query, setQuery] = useState<QueryParams>({ search: "" });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ option: 'default', direction: 'asc' });
  const [, startTransition] = useTransition();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  
  const { data: categories = [] } = useCategories();
  
  // Add this line to assert the type of categories
  const categoriesArray = categories as Category[];
  
  const getOffset = useCallback(() => (currentPage - 1) * pageSize, [currentPage, pageSize]);
  
  const favorites = useSelector(selectFavorites);
  
  const apiParams = useMemo<ApiParams>(() => {
    const params: ApiParams = {
      offset: getOffset(),
      limit: pageSize,
    };
    
    if (query.search) params.title = query.search;
    if (query.category && query.category !== '0') params.categoryId = parseInt(query.category, 10);
    if (query.minPrice) params.price_min = parseFloat(query.minPrice);
    if (query.maxPrice) params.price_max = parseFloat(query.maxPrice);
    if (query.minRating) params.min_rating = parseFloat(query.minRating);
    if (query.showFavorites === 'true') params.showFavorites = true;
    
    return params;
  }, [getOffset, pageSize, query]);
  
  const { 
    data: productsResponse = { data: [], total: 0 }, 
    isLoading, 
    isError
  } = useProducts(apiParams);
  
  // Extract products and total from the response
  const products = useMemo(() => {
    return (productsResponse as { data: ProductType[], total: number }).data || [];
  }, [productsResponse]);
  
  const totalProducts = (productsResponse as { data: ProductType[], total: number }).total || 0;
  
  const totalPages = Math.ceil(totalProducts / pageSize);
  
  // Sort options with friendly labels
  const sortOptions = useMemo(() => [
    { id: 'default', label: 'Default', icon: <MdOutlineSort className="mr-2"/> },
    { id: 'price-asc', label: 'Price: Low to High', icon: <FaChevronUp className="mr-2"/> },
    { id: 'price-desc', label: 'Price: High to Low', icon: <FaChevronDown className="mr-2"/> },
    { id: 'title-asc', label: 'Name: A to Z', icon: <FaChevronUp className="mr-2"/> },
    { id: 'title-desc', label: 'Name: Z to A', icon: <FaChevronDown className="mr-2"/> },
    { id: 'rating-desc', label: 'Highest Rated', icon: <FaChevronDown className="mr-2"/> },
    { id: 'rating-asc', label: 'Lowest Rated', icon: <FaChevronUp className="mr-2"/> },
  ], []);

  // Get the active sort option label
  const getActiveSortLabel = useCallback(() => {
    const option = sortConfig.option;
    const direction = sortConfig.direction;
    const sortId = option !== 'default' ? `${option}-${direction}` : 'default';
    return sortOptions.find(opt => opt.id === sortId)?.label || 'Sort';
  }, [sortConfig, sortOptions]);

  // Enhanced sort handler
  const handleSortOptionSelect = useCallback((option: string) => {
    // Parse the option ID to get sort option and direction
    const [optionName, direction] = option.split('-');
    
    // Only update if the option is different from current
    if (option !== 'default' && optionName && direction) {
      setSortConfig({ 
        option: optionName, 
        direction: direction as 'asc' | 'desc' 
      });
    } else {
      setSortConfig({ option: 'default', direction: 'asc' });
    }
    
    setSortMenuOpen(false);
  }, []);
  
  const processedProducts = useMemo(() => {
    let filtered = products.length ? addProductRatings(products) : [];
    
    if (query.showFavorites === 'true' && filtered.length > 0) {
      filtered = filtered.filter(product => favorites.includes(product.id));
    }
    
    // Apply local sorting
    if (sortConfig.option !== 'default') {
      filtered = [...filtered].sort((a, b) => {
        let aValue, bValue;
        
        switch (sortConfig.option) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case 'rating':
            aValue = a.rating || 0;
            bValue = b.rating || 0;
            break;
          default:
            return 0;
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  }, [products, favorites, query.showFavorites, sortConfig]);
  
  // Update search parameters whenever query or pagination changes
  const updateSearchParams = useCallback(() => {
    const queryParams: Record<string, string> = {};
    
    if (query.search) queryParams.search = query.search;
    if (query.category && query.category !== '0') queryParams.category = query.category;
    if (query.minPrice) queryParams.minPrice = query.minPrice;
    if (query.maxPrice) queryParams.maxPrice = query.maxPrice;
    if (query.minRating) queryParams.minRating = query.minRating;
    if (query.showFavorites) queryParams.showFavorites = query.showFavorites;
    
    // Always include page and pageSize
    queryParams.page = currentPage.toString();
    queryParams.pageSize = pageSize.toString();
    
    // Include sort configuration
    if (sortConfig.option !== 'default') {
      queryParams.sortOption = sortConfig.option;
      queryParams.sortDirection = sortConfig.direction;
    }
    
    setSearchParams(queryParams);
  }, [query, currentPage, pageSize, sortConfig, setSearchParams]);
  
  // Update search parameters whenever query or pagination changes
  useEffect(() => {
    updateSearchParams();
  }, [updateSearchParams]);
  
  // Initialize state from URL parameters on mount
  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    const categoryId = searchParams.get('category') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const minRating = searchParams.get('minRating') || '';
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
    const size = searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize') as string, 10) : 10;
    const sortOption = searchParams.get('sortOption') || 'default';
    const sortDirection = searchParams.get('sortDirection') as 'asc' | 'desc' || 'asc';
    const showFavorites = searchParams.get('showFavorites') || '';
    
    setQuery({
      search: searchQuery,
      category: categoryId,
      minPrice,
      maxPrice,
      minRating,
      showFavorites
    });
    
    setCurrentPage(page);
    setPageSize(size);
    setSortConfig({ 
      option: sortOption, 
      direction: sortDirection 
    });
  }, [searchParams]);
  
  const handleSearch = useCallback((searchTerm: string) => {
    startTransition(() => {
      setQuery(prev => ({ ...prev, search: searchTerm }));
      setCurrentPage(1);
    });
  }, []);
  
  const handleClearSearch = useCallback(() => {
    startTransition(() => {
      setQuery(prev => {
        const newQuery = { ...prev };
        delete newQuery.search;
        return newQuery;
      });
    });
  }, []);
  
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);
  
  const handleClearFilters = useCallback(() => {
    // Reset query parameters to empty object to clear all filters
    setQuery({});
    // Reset sort configuration to default
    setSortConfig({ option: 'default', direction: 'asc' });
    // Reset pagination to first page
    setCurrentPage(1);
  }, []);
  
  const getCategoryName = useCallback((categoryId?: string) => {
    if (!categoryId || categoryId === '0') return null;
    
    const category = categoriesArray.find((cat: Category) => cat.id.toString() === categoryId);
    return category ? category.name : null;
  }, [categoriesArray]);
  
  const activeFilters = useMemo(() => ({
    ...query,
    categoryName: getCategoryName(query.category)
  }), [query, getCategoryName]);

  const productList = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#1f2937"
            ariaLabel="triangle-loading"
            wrapperClass=""
          />
          <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      );
    }
    
    if (isError) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Error loading products. Please try again later.
          </p>
        </div>
      );
    }
    
    if (notFound) {
      return <NoProductFound />;
    }
    
    if (!processedProducts.length) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No products found. Try adjusting your filters.
          </p>
        </div>
      );
    }
    
    return (
      <>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 sm:gap-6 md:gap-8">
          {processedProducts.map((product) => (
            <Product key={product.id} productData={product as ProductType} />
          ))}
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </>
    );
  }, [
    isLoading, 
    isError, 
    notFound, 
    processedProducts, 
    currentPage, 
    totalPages, 
    pageSize, 
    handlePageChange, 
    handlePageSizeChange
  ]);

  // Check for empty products and update notFound state
  useEffect(() => {
    setNotFound(processedProducts.length === 0 && !isLoading && !isError);
  }, [processedProducts, isLoading, isError]);

  return (
    <div className="container px-4 mx-auto sm:px-6 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col justify-between gap-4 pt-2 mb-8 md:flex-row md:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Products</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Browse our collection of {totalProducts} products
          </p>
        </div>
        
        <div className="flex items-center justify-around gap-2 md:gap-4">
          {/* Enhanced Sort Dropdown */}
          <div className="text-sm text-gray-900 md:text-lg dark:text-gray-400">SortBy:</div>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSortMenuOpen(!sortMenuOpen)}
              className="flex items-center justify-between md:px-4 py-2 text-sm font-medium bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 min-w-[150px] px-2 md:min-w-[190px]"
              aria-expanded={sortMenuOpen}
              aria-haspopup="true"
              data-testid="sort-dropdown"
            >
              <span className="flex items-center">
                <FaSort className="mr-1 text-gray-500 md:mr-2 dark:text-gray-400" />
                {getActiveSortLabel()}
              </span>
              <FaAngleDown className={`ml-1 md:ml-2 transition-transform ${sortMenuOpen ? 'rotate-180' : ''}`} />
            </motion.button>
            
            <AnimatePresence>
              {sortMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="sort-dropdown"
                  data-testid="sort-menu"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)", color: "#111" }}
                        whileTap={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                        onClick={() => handleSortOptionSelect(option.id)}
                        className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                          option.id === (sortConfig.option !== 'default' ? `${sortConfig.option}-${sortConfig.direction}` : 'default')
                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white font-medium'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                        role="menuitem"
                        data-testid={`sort-option-${option.id}`}
                      >
                        {option.icon}
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearFilters}
            disabled={!activeFilters.search && !activeFilters.category && !activeFilters.minPrice && !activeFilters.maxPrice && !activeFilters.minRating && !activeFilters.showFavorites && sortConfig.option === 'default'}
            className={`flex items-center md:px-4 py-2 text-xs font-medium rounded-md shadow-sm px-2 ${
              activeFilters.search || activeFilters.category || activeFilters.minPrice || activeFilters.maxPrice || activeFilters.minRating || activeFilters.showFavorites || sortConfig.option !== 'default'
                ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700' 
                : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600'
            }`}
          >
            <MdFilterList className="mr-1 md:mr-2" />
            <div className="text-xs md:text-sm">Clear Sort</div>
          </motion.button>
        </div>
      </motion.div>
      
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-6">
            <Search
              initialValue={query.search || ""}
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="p-4">
                <FilterCategory
                  query={{ query, setQuery }}
                />
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content - Products Grid */}
        <main className="w-full lg:w-3/4">
          {productList}
        </main>
      </div>
    </div>
  );
};

export default Products;