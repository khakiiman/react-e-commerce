import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

import searchnotfound from '../assets/searchnotfound.png';

interface NoProductFoundProps {
  type?: 'favorites' | 'search' | 'filter' | 'default';
  showBackButton?: boolean;
}

const NoProductFound: React.FC<NoProductFoundProps> = ({
  type = 'default',
  showBackButton = false,
}) => {
  const router = useRouter();

  const getTitleMessage = () => {
    switch (type) {
      case 'favorites':
        return 'No favorites found';
      case 'search':
        return 'No search results found';
      case 'filter':
        return 'No products match your filters';
      default:
        return 'No results found';
    }
  };

  const getSubtitleMessage = () => {
    switch (type) {
      case 'favorites':
        return 'Add products to your favorites collection by clicking the heart icon on any product.';
      case 'search':
        return 'Try using different keywords or check your spelling.';
      case 'filter':
        return 'Try adjusting your filter settings or removing some filters.';
      default:
        return 'Please try again or browse our catalog.';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full text-center py-12 min-h-[calc(100vh-400px)]">
      {type === 'favorites' ? (
        <div className="mb-6 p-4 rounded-full bg-gray-100 dark:bg-gray-800">
          <FaHeart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
        </div>
      ) : (
        <div className="relative w-40 h-40 lg:w-80 lg:h-80 md:w-60 md:h-60 mb-4">
          <Image
            src={searchnotfound}
            alt="No results found"
            fill
            priority
            sizes="(max-width: 768px) 10rem, (max-width: 1024px) 15rem, 20rem"
            className="object-contain"
          />
        </div>
      )}

      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
        {getTitleMessage()}
      </h2>

      <p className="mb-8 text-base text-gray-600 dark:text-gray-400 max-w-md">
        {getSubtitleMessage()}
      </p>

      {showBackButton && (
        <button
          onClick={() => router.push('/products')}
          className="px-6 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="View all products"
        >
          View All Products
        </button>
      )}
    </div>
  );
};

export default NoProductFound;
