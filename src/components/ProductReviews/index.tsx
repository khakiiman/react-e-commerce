'use client';

import React from 'react';

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  return (
    <div className="product-reviews">
      <h2 className="text-xl font-semibold mb-4">Product Reviews</h2>
      <div className="space-y-4">
        <p>Loading reviews for product ID: {productId}</p>
      </div>
    </div>
  );
}
