import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaGithub,
  FaShoppingBag,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaTags,
  FaStar,
  FaInfoCircle,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { MdFilterList, MdFilterListOff, MdOutlineSort } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./theme/ThemeSwitcher";

interface SortConfig {
  option: string;
  direction: 'asc' | 'desc';
}

interface ActiveFilters {
  search?: string;
  category?: string;
  categoryName?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  [key: string]: string | undefined;
}

interface ProductsHeaderProps {
  title?: string;
  totalCount?: number;
  onSortChange?: (sortConfig: SortConfig) => void;
  activeFilters?: ActiveFilters;
  onClearFilters?: () => void;
  sortConfig?: SortConfig;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  title = "Products",
  totalCount = 0,
  onSortChange,
  activeFilters = {},
  onClearFilters,
  sortConfig: externalSortConfig,
}) => {
  const [sortOption, setSortOption] = useState<string>(externalSortConfig?.option || "default");
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(externalSortConfig?.direction || "asc");
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isProductsPage = location.pathname === "/products";

  useEffect(() => {
    if (!isProductsPage) return;

    const filterCount = Object.keys(activeFilters).filter((key) => {
      if (
        key === "category" &&
        activeFilters.category &&
        activeFilters.category !== "0"
      ) {
        return true;
      }
      if (key === "search" && activeFilters.search) {
        return true;
      }
      if (key === "minPrice" && activeFilters.minPrice) {
        return true;
      }
      if (key === "maxPrice" && activeFilters.maxPrice) {
        return true;
      }
      if (key === "minRating" && activeFilters.minRating) {
        return true;
      }
      if (key === "showFavorites" && activeFilters.showFavorites) {
        return true;
      }
      return false;
    }).length;

    setHasActiveFilters(filterCount > 0);
  }, [activeFilters, isProductsPage]);

  // Sync with external sort config if provided
  useEffect(() => {
    if (externalSortConfig) {
      setSortOption(externalSortConfig.option);
      setSortDirection(externalSortConfig.direction);
    }
  }, [externalSortConfig]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = e.target.value;
    setSortOption(newOption);
    if (onSortChange) {
      onSortChange({ option: newOption, direction: sortDirection });
    }
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    if (onSortChange) {
      onSortChange({ option: sortOption, direction: newDirection });
    }
  };

  // Get icon for sort option
  const getSortOptionIcon = (option: string) => {
    switch (option) {
      case 'price':
        return '$';
      case 'title':
        return 'A';
      case 'rating':
        return <FaStar className="text-gray-600 dark:text-gray-300" />;
      default:
        return <MdOutlineSort className="text-gray-600 dark:text-gray-300" />;
    }
  };

  const getFilterBadges = () => {
    if (!isProductsPage) return null;

    return (
      <div className="flex flex-wrap items-center justify-start gap-2 mt-3 md:mt-0">
        {/* Search filter badge */}
        {activeFilters.search && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"
          >
            <FaSearch className="mr-1 text-gray-600 dark:text-gray-300" size={10} />
            <span>Search: {activeFilters.search}</span>
          </motion.div>
        )}

        {/* Category filter badge */}
        {activeFilters.category && activeFilters.category !== "0" && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"
          >
            <FaTags className="mr-1 text-gray-600 dark:text-gray-300" size={10} />
            <span>
              Category: {activeFilters.categoryName || activeFilters.category}
            </span>
          </motion.div>
        )}

        {/* Price range filter badge */}
        {(activeFilters.minPrice || activeFilters.maxPrice) && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"
          >
            <span>
              Price:{" "}
              {activeFilters.minPrice ? `$${activeFilters.minPrice}` : "$0"} -{" "}
              {activeFilters.maxPrice
                ? `$${activeFilters.maxPrice}`
                : "Any"}
            </span>
          </motion.div>
        )}

        {/* Rating filter badge */}
        {activeFilters.minRating && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"
          >
            <FaStar className="mr-1 text-gray-600 dark:text-gray-300" size={10} />
            <span>Min Rating: {activeFilters.minRating}★</span>
          </motion.div>
        )}

        {/* Favorites filter badge */}
        {activeFilters.showFavorites && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center px-2 py-1 text-xs font-medium text-gray-900 bg-gray-300 rounded-full dark:bg-gray-200 dark:text-gray-800"
          >
            <span>Favorites Only</span>
          </motion.div>
        )}

        {/* Clear filters button - only show if there are active filters */}
        {hasActiveFilters && onClearFilters && (
          <motion.button
            onClick={onClearFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-2 py-1 ml-2 text-xs font-medium text-gray-800 transition-colors bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Clear all filters"
            data-testid="clear-filters-button"
          >
            <MdFilterListOff className="mr-1" />
            Clear All
          </motion.button>
        )}
      </div>
    );
  };

  // Animation variants
  const navItemVariants = {
    initial: { opacity: 0, y: -5 },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      }
    }),
    hover: { 
      y: -3,
      transition: { 
        duration: 0.2,
        type: "spring", 
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  // Mobile menu animations
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };

  const mobileNavItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <div className="mb-8">
      {/* Header with count, navbar, theme switcher */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-between gap-4 pb-4 mb-6 border-b border-gray-200 sm:flex-row dark:border-gray-700"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-4"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
            {title}{" "}
            {isProductsPage && totalCount > 0 && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                ({totalCount})
              </motion.span>
            )}
          </h1>
        </motion.div>

        {/* Mobile menu toggle */}
        <div className="flex items-center justify-end w-full sm:hidden">
          <ThemeSwitcher />
          <motion.button
            className="p-2 ml-3 text-gray-600 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Desktop Navigation */}
        <nav className="items-center hidden gap-5 sm:flex">
          <motion.div
            custom={0}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to="/"
              className="flex flex-col items-center gap-1 text-gray-600 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Home"
            >
              <FaHome className="text-xl" />
              <span className="text-xs">Home</span>
            </Link>
          </motion.div>

          <motion.div
            custom={1}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to="/products"
              className={`flex flex-col items-center gap-1 transition-colors ${
                isProductsPage 
                  ? "text-gray-900 dark:text-white font-medium" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
              aria-label="Products"
              aria-current={isProductsPage ? "page" : undefined}
            >
              <FaShoppingBag className="text-xl" />
              <span className="text-xs">Products</span>
              {isProductsPage && 
                <motion.span 
                  layoutId="activeIndicator"
                  className="block w-full h-0.5 mt-1 bg-gray-900 rounded-full dark:bg-gray-100"
                ></motion.span>
              }
            </Link>
          </motion.div>

          <motion.div
            custom={2}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to="/about"
              className={`flex flex-col items-center gap-1 transition-colors ${
                location.pathname === "/about"
                  ? "text-gray-900 dark:text-white font-medium" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
              aria-label="About"
              aria-current={location.pathname === "/about" ? "page" : undefined}
            >
              <FaInfoCircle className="text-xl" />
              <span className="text-xs">About</span>
              {location.pathname === "/about" && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="block w-full h-0.5 mt-1 bg-gray-900 rounded-full dark:bg-gray-100"
                ></motion.span>
              )}
            </Link>
          </motion.div>

          <motion.div
            custom={3}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <a
              href="https://github.com/khakiiman/react-e-commerce"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-gray-600 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="GitHub Repository"
            >
              <FaGithub className="text-xl" />
              <span className="text-xs">GitHub</span>
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="pl-3 ml-2 border-l border-gray-200 dark:border-gray-700"
          >
            <ThemeSwitcher />
          </motion.div>
        </nav>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="sm:hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.nav className="flex flex-col py-4 mb-6 space-y-3 border-b border-gray-200 dark:border-gray-700">
              <motion.div 
                className="flex justify-between"
                variants={mobileNavItemVariants}
              >
                <Link
                  to="/"
                  className={`flex items-center gap-3 px-2 py-2 rounded-md ${
                    location.pathname === "/"
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" 
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaHome className="text-xl" />
                  <span>Home</span>
                </Link>
              </motion.div>
              
              <motion.div 
                variants={mobileNavItemVariants}
              >
                <Link
                  to="/products"
                  className={`flex items-center gap-3 px-2 py-2 rounded-md ${
                    isProductsPage
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" 
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaShoppingBag className="text-xl" />
                  <span>Products</span>
                </Link>
              </motion.div>
              
              <motion.div 
                variants={mobileNavItemVariants}
              >
                <Link
                  to="/about"
                  className={`flex items-center gap-3 px-2 py-2 rounded-md ${
                    location.pathname === "/about"
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" 
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaInfoCircle className="text-xl" />
                  <span>About</span>
                </Link>
              </motion.div>
              
              <motion.div 
                variants={mobileNavItemVariants}
              >
                <a
                  href="https://github.com/khakiiman/react-e-commerce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-2 py-2 text-gray-600 rounded-md dark:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaGithub className="text-xl" />
                  <span>GitHub</span>
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sorting and filtering controls */}
      {isProductsPage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col items-start justify-between gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex-row sm:items-center dark:bg-gray-800 dark:border-gray-700 backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center w-full gap-4 sm:w-auto">
            <div className="flex items-center w-full sm:w-auto">
              <label
                htmlFor="sort-select"
                className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <MdFilterList className="inline mr-1 text-gray-500 dark:text-gray-400" />
                Sort by:
              </label>
              <div className="relative flex-grow sm:flex-grow-0">
                <select
                  id="sort-select"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="w-full pl-8 pr-10 py-1.5 text-sm bg-white border border-gray-300 rounded-md shadow-sm appearance-none sm:w-auto dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 transition-colors"
                  data-testid="sort-select"
                >
                  <option value="default">Default</option>
                  <option value="price">Price</option>
                  <option value="title">Name</option>
                  <option value="rating">Rating</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  {typeof getSortOptionIcon(sortOption) === 'string' 
                    ? <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{getSortOptionIcon(sortOption)}</span>
                    : getSortOptionIcon(sortOption)
                  }
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaChevronDown className="text-xs text-gray-500 dark:text-gray-400" />
                </div>
              </div>
            </div>

            <motion.button
              onClick={toggleSortDirection}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-3 py-1.5 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 transition-colors"
              aria-label={
                sortDirection === "asc"
                  ? "Sort in descending order"
                  : "Sort in ascending order"
              }
              data-testid="sort-direction-toggle"
            >
              {sortDirection === "asc" ? (
                <>
                  <FaChevronUp className="mr-2 text-gray-600 dark:text-gray-300" />
                  <span>Ascending</span>
                </>
              ) : (
                <>
                  <FaChevronDown className="mr-2 text-gray-600 dark:text-gray-300" />
                  <span>Descending</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Active filters row */}
          <AnimatePresence>
            <div className="flex flex-wrap items-center justify-start w-full gap-2 mt-4 sm:mt-0 sm:justify-end sm:w-auto">
              {getFilterBadges()}
            </div>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ProductsHeader; 