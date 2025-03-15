export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generatePaginationRange = (currentPage, totalPages, maxPages = 5) => {
  if (totalPages <= maxPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - 1, 1);
  const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, '...', ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = [leftSiblingIndex, currentPage, rightSiblingIndex];
    return [1, '...', ...middleRange, '...', totalPages];
  }
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getRandomRating = () => {
  return Math.floor(Math.random() * 3) + 3;
};

export const getRandomReviewCount = () => {
  return Math.floor(Math.random() * 500) + 50;
};

export const sortProducts = (products, { option, direction }) => {
  if (option === 'default') return products;

  return [...products].sort((a, b) => {
    let comparison = 0;
    switch (option) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'name':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'rating':
        comparison = (a.rating || 0) - (b.rating || 0);
        break;
      default:
        return 0;
    }
    return direction === 'asc' ? comparison : -comparison;
  });
};

export const filterProducts = (products, filters) => {
  return products.filter(product => {
    if (filters.search && !product.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    if (filters.category && filters.category !== '0' && product.category.id.toString() !== filters.category) {
      return false;
    }

    if (filters.minPrice && product.price < parseFloat(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) {
      return false;
    }

    if (filters.minRating && product.rating < parseFloat(filters.minRating)) {
      return false;
    }

    return true;
  });
}; 