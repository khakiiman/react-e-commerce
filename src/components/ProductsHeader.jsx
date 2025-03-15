import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSortAmountDown, FaSortAmountUp, FaHome, FaGithub } from 'react-icons/fa';
import { MdFilterList, MdFilterListOff } from 'react-icons/md';
import { motion } from 'framer-motion';
import ThemeSwitcher from './theme/ThemeSwitcher';

const ProductsHeader = ({ 
  title = "Products", 
  totalProducts = 0, 
  onSortChange, 
  activeFilters = {},
  onClearFilters
}) => {
  const [sortOption, setSortOption] = useState('default');
  const [sortDirection, setSortDirection] = useState('asc');
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';
  
  useEffect(() => {
    if (!isProductsPage) return;
    
    const filterCount = Object.keys(activeFilters).filter(key => {
      if (key === 'category' && activeFilters[key] !== '0' && activeFilters[key]) return true;
      if (key === 'search' && activeFilters[key]) return true;
      if (key === 'minPrice' && activeFilters[key]) return true;
      if (key === 'maxPrice' && activeFilters[key]) return true;
      if (key === 'minRating' && activeFilters[key] > 0) return true;
      return false;
    }).length;
    
    setHasActiveFilters(filterCount > 0);
  }, [activeFilters, isProductsPage]);
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    if (onSortChange) {
      onSortChange({ option: e.target.value, direction: sortDirection });
    }
  };
  
  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    if (onSortChange && sortOption !== 'default') {
      onSortChange({ option: sortOption, direction: newDirection });
    }
  };
  
  const getFilterBadges = () => {
    const badges = [];
    
    if (activeFilters.category && activeFilters.category !== '0') {
      badges.push({ 
        key: 'category', 
        label: `Category: ${activeFilters.categoryName || activeFilters.category}` 
      });
    }
    
    if (activeFilters.search) {
      badges.push({ 
        key: 'search', 
        label: `Search: ${activeFilters.search}` 
      });
    }
    
    if (activeFilters.minPrice) {
      badges.push({ 
        key: 'minPrice', 
        label: `Min Price: $${activeFilters.minPrice}` 
      });
    }
    
    if (activeFilters.maxPrice) {
      badges.push({ 
        key: 'maxPrice', 
        label: `Max Price: $${activeFilters.maxPrice}` 
      });
    }
    
    if (activeFilters.minRating && activeFilters.minRating > 0) {
      badges.push({ 
        key: 'minRating', 
        label: `Min Rating: ${activeFilters.minRating}★` 
      });
    }
    
    return badges;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-8 overflow-hidden bg-white rounded-lg shadow-md dark:bg-grayshade-500"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900"></div>
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="relative z-20 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <svg 
                  className="w-10 h-10 mr-3"
                  viewBox="0 0 24 24"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 6.5L12 3L19.5 6.5V17.5L12 21L4.5 17.5V6.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800 dark:text-white"
                  />
                  <path
                    d="M12 3V21"
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800 dark:text-white"
                  />
                  <path
                    d="M4.5 6.5L12 10L19.5 6.5"
                    stroke="currentColor"
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800 dark:text-white"
                  />
                </svg>
                <span className="text-xl font-bold text-gray-800 dark:text-white">React-E-Commerce</span>
              </Link>
              <div className="items-center hidden ml-8 space-x-4 md:flex">
                <Link 
                  to="/" 
                  className={`px-3 py-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-grayshade-400 ${
                    location.pathname === '/' ? 'text-[#1f2937] dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <FaHome className="mr-2" />
                    Home
                  </div>
                </Link>
                <Link 
                  to="/products" 
                  className={`px-3 py-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-grayshade-400 ${
                    location.pathname === '/products' ? 'text-[#1f2937] dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Products
                </Link>
                <Link 
                  to="/about" 
                  className={`px-3 py-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-grayshade-400 ${
                    location.pathname === '/about' ? 'text-[#1f2937] dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <Link
                className="p-2 text-gray-700 transition-colors rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-grayshade-400"
                to={"https://github.com/khakiiman/react-e-commerce"}
                target="_blank"
                aria-label="GitHub Repository"
              >
                <FaGithub size={20} />
              </Link>
            </div>
          </div>
        </div>
        
        {isProductsPage && (
          <div className="relative z-10 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Showing <span className="font-semibold">{totalProducts}</span> products
                </p>
              </div>
              
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center overflow-hidden bg-gray-100 rounded-lg dark:bg-grayshade-400">
                  <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="px-3 py-2 pr-8 text-gray-700 bg-transparent appearance-none focus:outline-none dark:text-white dark:bg-gray-700"
                    aria-label="Sort products"
                  >
                    <option value="default">Sort By</option>
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                    <option value="rating">Rating</option>
                  </select>
                  <button 
                    onClick={toggleSortDirection}
                    disabled={sortOption === 'default'}
                    className={`px-3 py-2 ${sortOption === 'default' ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-gray-700 dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-grayshade-300'}`}
                    aria-label={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
                  >
                    {sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                  </button>
                </div>
                
                {hasActiveFilters && (
                  <button
                    onClick={onClearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-grayshade-400 dark:hover:bg-grayshade-300 dark:text-white"
                    aria-label="Clear all filters"
                  >
                    <MdFilterListOff />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            </div>
            
            {hasActiveFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MdFilterList className="mr-1" /> Active Filters:
                  </span>
                  {getFilterBadges().map((badge) => (
                    <span 
                      key={badge.key}
                      className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-grayshade-400 dark:text-white"
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductsHeader; 