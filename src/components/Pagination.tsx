import React from 'react';
import Button from './ui/buttons/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}
const DOTS = '...';
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
  className = '',
}) => {
  const generatePageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage <= 3) {
        pageNumbers.push(2, 3, 4, DOTS, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(DOTS, totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pageNumbers.push(DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS);
      }
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
  };
  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  if (totalPages <= 1) return null;
  return (
    <div
      className={`mt-10 mb-6 py-6 border-t border-gray-200 dark:border-gray-700 ${className}`}
      aria-label="Pagination navigation"
      data-testid="pagination-controls"
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="px-2 shadow-sm hover:shadow transition-shadow"
            aria-label="Go to first page"
            data-testid="first-page-button"
          >
            &laquo;
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="px-2 shadow-sm hover:shadow transition-shadow"
            aria-label="Go to previous page"
            data-testid="prev-page-button"
          >
            &lsaquo;
          </Button>
          <div className="flex items-center gap-2 mx-2">
            {pageNumbers.map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === DOTS ? (
                  <span className="px-3 py-1 text-gray-500 dark:text-gray-400">...</span>
                ) : (
                  <Button
                    onClick={() => handlePageChange(pageNumber as number)}
                    variant={pageNumber === currentPage ? 'primary' : 'outline'}
                    size="sm"
                    className={`${
                      pageNumber === currentPage
                        ? 'font-bold shadow-md'
                        : 'text-gray-700 dark:text-gray-300 shadow-sm hover:shadow transition-shadow'
                    } w-9 h-9 flex items-center justify-center`}
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={pageNumber === currentPage ? 'page' : undefined}
                    data-testid={`page-${pageNumber}-button`}
                  >
                    {pageNumber}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="px-2 shadow-sm hover:shadow transition-shadow"
            aria-label="Go to next page"
            data-testid="next-page-button"
          >
            &rsaquo;
          </Button>
          <Button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="px-2 shadow-sm hover:shadow transition-shadow"
            aria-label="Go to last page"
            data-testid="last-page-button"
          >
            &raquo;
          </Button>
        </div>
        {onPageSizeChange && (
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-grayshade-500 px-4 py-2 rounded-lg shadow-sm">
            <label
              htmlFor="page-size-select"
              className="text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              Items per page:
            </label>
            <select
              id="page-size-select"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md dark:bg-grayshade-600 dark:border-grayshade-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
              aria-label="Select page size"
              data-testid="page-size-select"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Showing page {currentPage} of {totalPages}
      </div>
    </div>
  );
};
export default Pagination;
