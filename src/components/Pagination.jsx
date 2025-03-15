import React from 'react';
import Button from './ui/Button';
import { PAGINATION_CONFIG } from '../constants/config';

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }) => {
  const generatePageNumbers = () => {
    const maxPagesToShow = 5;
    const pageNumbers = [];
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    pageNumbers.push(1);
    
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    if (startPage > 2) {
      pageNumbers.push('...');
    }
    
    if (endPage < totalPages - 1) {
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      pageNumbers.push('...');
    } else {
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange(newSize);
    onPageChange(1);
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex flex-col items-center justify-between w-full gap-4 px-4 py-4 mt-8 bg-white shadow sm:flex-row dark:bg-grayshade-500 rounded-xl">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="px-2 py-1 text-sm border rounded dark:bg-grayshade-400 border-grayshade-50 dark:border-grayshade-200"
        >
          {PAGINATION_CONFIG.PAGE_SIZE_OPTIONS.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-700 dark:text-gray-300">items per page</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="secondary"
          size="sm"
          aria-label="Previous page"
        >
          Prev
        </Button>
        
        {generatePageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-gray-500 dark:text-gray-400">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? 'bg-gray-800 text-white dark:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-grayshade-400'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
        
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="secondary"
          size="sm"
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
      
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination; 