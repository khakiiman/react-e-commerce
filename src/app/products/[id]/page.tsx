import type { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import { notFound } from 'next/navigation';

import { getProductById } from '@/services/api/products';

import ProductDetailSkeleton from '@/components/ProductDetailSkeleton';

const ProductDetail = dynamicImport(() => import('@/components/ProductDetail'), {
  loading: () => <ProductDetailSkeleton />,
  ssr: false,
});

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const product = await getProductById(parseInt(params.id));

    return {
      title: `${product.title} - React Shop`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.images[0] || '', alt: product.title }],
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found - React Shop',
      description: 'The requested product was not found.',
    };
  }
}

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  try {
    const productId = parseInt(params.id);

    const product = await getProductById(productId);

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductDetail product={product} />
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
}
