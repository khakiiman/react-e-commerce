'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export function ClientOnly() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
        <h1 className="text-2xl font-bold mb-4">React Shop</h1>
        <p className="mb-4">Redirecting to the home page...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    </div>
  );
}
