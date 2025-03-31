import type { Metadata } from 'next';
import React from 'react';

import ServerProducts from '@/components/ServerProducts';
import { productService } from '@/services/api';
import { getPaginationParams, calculateTotalPages } from './server/utils';

export const metadata: Metadata = {
  title: 'Products - Nextjs FullStack Shop',
  description: 'Browse our collection of products',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page, pageSize, offset } = getPaginationParams(searchParams);

  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const minPrice = typeof searchParams.minPrice === 'string' ? searchParams.minPrice : undefined;
  const maxPrice = typeof searchParams.maxPrice === 'string' ? searchParams.maxPrice : undefined;
  const minRating = typeof searchParams.minRating === 'string' ? searchParams.minRating : undefined;

  try {
    const results = await productService.getProducts({
      limit: pageSize,
      offset,
      title: search,
      categoryId: category !== '0' ? category : undefined,
      price_min: minPrice ? parseFloat(minPrice) : undefined,
      price_max: maxPrice ? parseFloat(maxPrice) : undefined,
      min_rating: minRating ? parseFloat(minRating) : undefined,
    });

    const totalPages = calculateTotalPages(results.total, pageSize);

    return (
      <main className="container mx-auto px-4 py-8">
        <ServerProducts
          products={results.data}
          totalProducts={results.total}
          currentPage={page}
          pageSize={pageSize}
          totalPages={totalPages}
          initialSearchParams={searchParams}
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
            Error Loading Products
          </h2>
          <p className="text-red-600 dark:text-red-300">
            We encountered an error while trying to load products. Please try again later.
          </p>
        </div>
      </main>
    );
  }
}
