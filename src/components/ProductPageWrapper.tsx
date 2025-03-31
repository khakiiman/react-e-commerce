'use client';

import React, { Suspense } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import LoadingState from '@/components/ui/LoadingState';
import QueryErrorBoundary from '@/components/QueryErrorBoundary';
import { prefetchProductPage } from '@/lib/cachingUtils';

const ProductDetails = dynamic(() => import('@/components/ProductDetail'), {
  loading: () => <LoadingState message="Loading product details..." size="medium" />,
});

const RelatedProducts = dynamic(() => import('@/components/RelatedProducts/index'), {
  loading: () => <LoadingState message="Loading related products..." size="small" />,
});

const ProductReviews = dynamic(() => import('@/components/ProductReviews/index'), {
  loading: () => <LoadingState message="Loading reviews..." size="small" />,
});

interface ProductPageWrapperProps {
  productId: number;
}

const ProductPageWrapper: React.FC<ProductPageWrapperProps> = ({ productId }) => {
  const queryClient = useQueryClient();

  const handleRelatedProductHover = (id: number) => {
    prefetchProductPage(queryClient, id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <QueryErrorBoundary>
        <Suspense fallback={<LoadingState message="Loading product details..." size="large" />}>
          <ProductDetails
            product={{
              id: productId,
              title: 'Loading Product...',
              price: 0,
              description: 'Product details are loading',
              category: { id: 0, name: 'Loading', image: '', creationAt: '', updatedAt: '' },
              images: [],
              creationAt: '',
              updatedAt: '',
            }}
          />
        </Suspense>
      </QueryErrorBoundary>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2">
          <QueryErrorBoundary>
            <Suspense fallback={<LoadingState message="Loading reviews..." size="medium" />}>
              <ProductReviews productId={productId} />
            </Suspense>
          </QueryErrorBoundary>
        </div>

        <div className="md:col-span-1">
          <QueryErrorBoundary>
            <Suspense fallback={<LoadingState message="Loading related items..." size="small" />}>
              <RelatedProducts productId={productId} onProductHover={handleRelatedProductHover} />
            </Suspense>
          </QueryErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default ProductPageWrapper;
