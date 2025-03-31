import React from 'react';
import { Metadata } from 'next';

import ProductsClientWrapper from '@/components/products/ProductsClientWrapper';

export const metadata: Metadata = {
  title: 'Products - React Shop',
  description: 'Browse our collection of products',
};

export default function ProductsRootLayout({ children }: { children: React.ReactNode }) {
  return <ProductsClientWrapper>{children}</ProductsClientWrapper>;
}
