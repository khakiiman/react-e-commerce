'use client';

import React from 'react';

interface RelatedProductsProps {
  productId: number;
  onProductHover: (id: number) => void;
}

export default function RelatedProducts({ productId }: RelatedProductsProps) {
  return (
    <div className="related-products">
      <h2 className="text-xl font-semibold mb-4">Related Products</h2>
      <div className="space-y-4">
        <p>Loading related products for product ID: {productId}</p>
      </div>
    </div>
  );
}
