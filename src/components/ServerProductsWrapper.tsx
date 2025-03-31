'use client';

import React from 'react';

import { Product as ProductType } from '@/types/api';
import ServerProducts from './ServerProducts';

interface ServerProductsWrapperProps {
  products: ProductType[];
  totalProducts: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

const ServerProductsWrapper: React.FC<ServerProductsWrapperProps> = ({
  products,
  totalProducts,
  currentPage,
  pageSize,
  totalPages,
}) => {
  return (
    <ServerProducts
      products={products}
      totalProducts={totalProducts}
      currentPage={currentPage}
      pageSize={pageSize}
      totalPages={totalPages}
    />
  );
};

export default ServerProductsWrapper;
