'use client';
import { FC, ReactNode } from 'react';

interface ProductsLayoutProps {
  children: ReactNode;
}
const ProductsLayout: FC<ProductsLayoutProps> = ({ children }) => {
  return <>{children}</>;
};
export default ProductsLayout;
