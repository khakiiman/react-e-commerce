import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

import { generatePageNumbers } from '@/app/products/server/utils';

import Button from './ui/buttons/Button';

interface ServerPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  className?: string;
}

const DOTS = '...';

const ServerPagination: React.FC<ServerPaginationProps> = ({
  currentPage,
  totalPages,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  className = '',
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number, size?: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', page.toString());

    if (size) {
      params.set('pageSize', size.toString());
    }

    return `${pathname}?${params.toString()}`;
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
          <Link
            href={createPageUrl(1)}
            aria-label="Go to first page"
            data-testid="first-page-button"
            prefetch={false}
            replace={true}
          >
            <Button
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="px-2 shadow-sm hover:shadow transition-shadow"
            >
              &laquo;
            </Button>
          </Link>

          <Link
            href={createPageUrl(Math.max(1, currentPage - 1))}
            aria-label="Go to previous page"
            data-testid="prev-page-button"
            prefetch={false}
            replace={true}
          >
            <Button
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="px-2 shadow-sm hover:shadow transition-shadow"
            >
              &lsaquo;
            </Button>
          </Link>

          <div className="flex items-center gap-2 mx-2">
            {pageNumbers.map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === DOTS ? (
                  <span className="px-3 py-1 text-gray-500 dark:text-gray-400">...</span>
                ) : (
                  <Link
                    href={createPageUrl(pageNumber as number)}
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={pageNumber === currentPage ? 'page' : undefined}
                    data-testid={`page-${pageNumber}-button`}
                    prefetch={false}
                    replace={true}
                  >
                    <Button
                      variant={pageNumber === currentPage ? 'primary' : 'outline'}
                      size="sm"
                      className={`${
                        pageNumber === currentPage
                          ? 'font-bold shadow-md'
                          : 'text-gray-700 dark:text-gray-300 shadow-sm hover:shadow transition-shadow'
                      } w-9 h-9 flex items-center justify-center`}
                    >
                      {pageNumber}
                    </Button>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>

          <Link
            href={createPageUrl(Math.min(totalPages, currentPage + 1))}
            aria-label="Go to next page"
            data-testid="next-page-button"
            prefetch={false}
            replace={true}
          >
            <Button
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="px-2 shadow-sm hover:shadow transition-shadow"
            >
              &rsaquo;
            </Button>
          </Link>

          <Link
            href={createPageUrl(totalPages)}
            aria-label="Go to last page"
            data-testid="last-page-button"
            prefetch={false}
            replace={true}
          >
            <Button
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="px-2 shadow-sm hover:shadow transition-shadow"
            >
              &raquo;
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 dark:bg-yinmn-blue px-4 py-2 rounded-lg shadow-sm">
          <label
            htmlFor="page-size-select"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Items per page:
          </label>
          <select
            id="page-size-select"
            value={pageSize}
            onChange={e => {
              const newSize = parseInt(e.target.value, 10);
              const url = createPageUrl(1, newSize);
              window.location.href = url;
            }}
            className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md dark:bg-glaucous dark:border-silver-lake-blue dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
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
      </div>

      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Showing page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default ServerPagination;
