import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import useDebounce from "../hooks/useDebounce";

interface SearchProps {
  initialValue?: string;
  onSearch?: (term: string) => void;
  onClear?: () => void;
  className?: string;
  placeholder?: string;
  delay?: number;
}

const Search: React.FC<SearchProps> = ({
  initialValue = "",
  onSearch,
  onClear,
  className = "",
  placeholder = "Search products...",
  delay = 500,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue);
  const debouncedSearchTerm = useDebounce<string>(searchTerm, delay);
  const navigate = useNavigate();
  const location = useLocation();

  // Update search term when initialValue prop changes
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  // Handle search when debounced term changes
  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(debouncedSearchTerm);
    } else {
      // Default behavior - navigate to products page with search param
      const params = new URLSearchParams(location.search);
      if (debouncedSearchTerm) {
        params.set("search", debouncedSearchTerm);
      } else {
        params.delete("search");
      }
      navigate(`/products?${params.toString()}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
    if (onClear) {
      onClear();
    }
  };

  return (
    <div
      className={`relative flex items-center ${className}`}
      role="search"
      aria-label="Product search"
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full py-2 pl-10 pr-10 text-sm bg-gray-100 border border-gray-300 rounded-lg dark:bg-grayshade-600 dark:border-grayshade-300 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          aria-label="Search input"
          data-testid="search-input"
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
            onClick={clearSearch}
            aria-label="Clear search"
            data-testid="clear-search-button"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search; 