import { PAGINATION_CONFIG } from './constants';

export function getPaginationParams(searchParams: Record<string, string | string[] | undefined>) {
  const rawPage = searchParams.page;
  const rawPageSize = searchParams.pageSize;

  let page = 1;
  if (typeof rawPage === 'string') {
    const parsed = parseInt(rawPage, 10);
    if (!isNaN(parsed) && parsed > 0) {
      page = parsed;
    }
  }

  let pageSize = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE;
  if (typeof rawPageSize === 'string') {
    const parsed = parseInt(rawPageSize, 10);
    if (
      !isNaN(parsed) &&
      parsed >= PAGINATION_CONFIG.MIN_PAGE_SIZE &&
      parsed <= PAGINATION_CONFIG.MAX_PAGE_SIZE
    ) {
      pageSize = parsed;
    }
  }

  const offset = (page - 1) * pageSize;

  return {
    page,
    pageSize,
    offset,
  };
}

export function calculateTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxPages: number = 5
): (number | string)[] {
  const result: (number | string)[] = [];

  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }
  } else {
    result.push(1);

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3;
      for (let i = 2; i <= leftItemCount; i++) {
        result.push(i);
      }
      result.push('...');
      result.push(totalPages);
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      result.push('...');
      for (let i = totalPages - 2; i <= totalPages - 1; i++) {
        result.push(i);
      }
      result.push(totalPages);
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      result.push('...');
      result.push(leftSiblingIndex);
      result.push(currentPage);
      result.push(rightSiblingIndex);
      result.push('...');
      result.push(totalPages);
    }
  }

  return result;
}
