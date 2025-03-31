import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaGithub,
  FaHome,
  FaInfoCircle,
  FaSearch,
  FaShoppingBag,
  FaStar,
  FaTags,
  FaTimes,
} from 'react-icons/fa';
import { MdFilterList, MdFilterListOff, MdOutlineSort } from 'react-icons/md';

import ThemeSwitcher from './theme/ThemeSwitcher';

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
  title = 'Products',
  totalCount = 0,
  onSortChange,
  activeFilters = {},
  onClearFilters,
  sortConfig: externalSortConfig,
}) => {
  const [sortOption, setSortOption] = useState<string>(externalSortConfig?.option || 'default');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    externalSortConfig?.direction || 'asc'
  );
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isProductsPage = pathname === '/products';

  useEffect(() => {
    if (!isProductsPage) return;
    const filterCount = Object.keys(activeFilters).filter(key => {
      if (key === 'category' && activeFilters.category && activeFilters.category !== '0') {
        return true;
      }
      if (key === 'search' && activeFilters.search) {
        return true;
      }
      if (key === 'minPrice' && activeFilters.minPrice) {
        return true;
      }
      if (key === 'maxPrice' && activeFilters.maxPrice) {
        return true;
      }
      if (key === 'minRating' && activeFilters.minRating) {
        return true;
      }
      if (key === 'showFavorites' && activeFilters.showFavorites) {
        return true;
      }
      return false;
    }).length;
    setHasActiveFilters(filterCount > 0);
  }, [activeFilters, isProductsPage]);

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
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    if (onSortChange) {
      onSortChange({ option: sortOption, direction: newDirection });
    }
  };

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

        {activeFilters.category && activeFilters.category !== '0' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"
          >
            <FaTags className="mr-1 text-gray-600 dark:text-gray-300" size={10} />
            <span>Category: {activeFilters.categoryName || activeFilters.category}</span>
          </motion.div>
        )}

        {(activeFilters.minPrice || activeFilters.maxPrice) && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"
          >
            <span>
              Price: {activeFilters.minPrice ? `${activeFilters.minPrice}` : '$0'} -{' '}
              {activeFilters.maxPrice ? `${activeFilters.maxPrice}` : 'Any'}
            </span>
          </motion.div>
        )}

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

  const navItemVariants = {
    initial: { opacity: 0, y: -5 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    hover: {
      y: -3,
      transition: {
        duration: 0.2,
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center"
        >
          <h1 className="text-2xl font-bold md:text-3xl">
            {title}{' '}
            {isProductsPage && totalCount > 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-lg font-normal text-gray-600 dark:text-gray-400"
              >
                ({totalCount})
              </motion.span>
            )}
          </h1>
        </motion.div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeSwitcher />
          <motion.button
            className="p-2 md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </motion.button>
        </div>

        <nav className="hidden md:flex md:items-center md:ml-8 lg:ml-12">
          <motion.div
            custom={0}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="/"
              className="flex flex-col items-center gap-1 text-gray-600 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Home page"
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
              href="/products"
              className={`flex flex-col items-center gap-1 ml-6 ${
                isProductsPage
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              } transition-colors relative`}
              aria-label="Products page"
              aria-current={isProductsPage ? 'page' : undefined}
            >
              <FaShoppingBag className="text-xl" />
              <span className="text-xs">Products</span>
              {isProductsPage && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 dark:bg-white"
                ></motion.span>
              )}
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
              href="/about"
              className={`flex flex-col items-center gap-1 ml-6 ${
                pathname === '/about'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              } transition-colors relative`}
              aria-label="About page"
              aria-current={pathname === '/about' ? 'page' : undefined}
            >
              <FaInfoCircle className="text-xl" />
              <span className="text-xs">About</span>
              {pathname === '/about' && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 dark:bg-white"
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
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 ml-6 pl-6 border-l border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub Repository"
            >
              <FaGithub className="text-xl" />
              <span className="text-xs">GitHub</span>
            </a>
          </motion.div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden"
          >
            <motion.nav
              variants={mobileMenuVariants}
              className="flex flex-col py-4 mb-6 space-y-3 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between">
                <Link
                  href="/"
                  className={`flex items-center gap-2 p-2 rounded-lg ${
                    pathname === '/'
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaHome className="text-xl" />
                  <span>Home</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/products"
                  className={`flex items-center gap-2 p-2 rounded-lg ${
                    isProductsPage
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaShoppingBag className="text-xl" />
                  <span>Products</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/about"
                  className={`flex items-center gap-2 p-2 rounded-lg ${
                    pathname === '/about'
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaInfoCircle className="text-xl" />
                  <span>About</span>
                </Link>
              </div>
              <div>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 text-gray-600 transition-colors rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaGithub className="text-xl" />
                  <span>GitHub</span>
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {isProductsPage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <label
                htmlFor="sort-select"
                className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <MdFilterList className="mr-1 text-gray-500" />
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort-select"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="p-2 pr-8 text-sm bg-white border rounded-lg appearance-none dark:bg-grayshade-500 dark:border-grayshade-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  data-testid="sort-select"
                >
                  <option value="default">Default</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </select>
                <div className="absolute top-0 bottom-0 left-0 flex items-center pl-2 pointer-events-none">
                  {typeof getSortOptionIcon(sortOption) === 'string' ? (
                    <span className="text-xs font-semibold">{getSortOptionIcon(sortOption)}</span>
                  ) : (
                    getSortOptionIcon(sortOption)
                  )}
                </div>
                <div className="absolute top-0 bottom-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
            <motion.button
              onClick={toggleSortDirection}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-grayshade-600 dark:text-gray-300"
              aria-label={
                sortDirection === 'asc' ? 'Switch to descending order' : 'Switch to ascending order'
              }
              data-testid="sort-direction-toggle"
            >
              {sortDirection === 'asc' ? (
                <>
                  <FaChevronUp className="mr-1" />
                  <span>Ascending</span>
                </>
              ) : (
                <>
                  <FaChevronDown className="mr-1" />
                  <span>Descending</span>
                </>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            <div className="mt-4">{getFilterBadges()}</div>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ProductsHeader;
