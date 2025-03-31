import { NextRequest, NextResponse } from 'next/server';

import { productService } from '@/services/api';

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
    const pageSize = searchParams.get('pageSize')
      ? parseInt(searchParams.get('pageSize') as string, 10)
      : 10;

    const offset = (page - 1) * pageSize;

    const title = searchParams.get('search') || undefined;
    const categoryId = searchParams.get('category') || undefined;
    const price_min = searchParams.get('minPrice')
      ? parseFloat(searchParams.get('minPrice') as string)
      : undefined;
    const price_max = searchParams.get('maxPrice')
      ? parseFloat(searchParams.get('maxPrice') as string)
      : undefined;
    const min_rating = searchParams.get('minRating')
      ? parseFloat(searchParams.get('minRating') as string)
      : undefined;

    const cacheKey = new URLSearchParams(
      Array.from(searchParams.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([k, v]) => [k, v])
    ).toString();

    const results = await productService.getProducts({
      limit: pageSize,
      offset,
      title,
      categoryId: categoryId !== '0' ? categoryId : undefined,
      price_min,
      price_max,
      min_rating,
    });

    const response = NextResponse.json({
      products: results.data,
      total: results.total,
      page,
      pageSize,
      totalPages: Math.ceil(results.total / pageSize),
    });

    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    response.headers.set('X-Cache-Key', cacheKey);

    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
