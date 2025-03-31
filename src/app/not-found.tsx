import Link from 'next/link';

import { colorSystem } from '@/styles/colorSystem';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={`${colorSystem.light.background.card} dark:${colorSystem.dark.background.card} p-8 rounded-lg text-center max-w-md`}
      >
        <h1
          className={`text-6xl font-bold ${colorSystem.light.text.heading} dark:${colorSystem.dark.text.heading}`}
        >
          404
        </h1>
        <h2
          className={`mt-4 text-3xl font-semibold ${colorSystem.light.text.secondary} dark:${colorSystem.dark.text.secondary}`}
        >
          Page Not Found
        </h2>
        <p
          className={`mt-2 text-lg ${colorSystem.light.text.tertiary} dark:${colorSystem.dark.text.tertiary}`}
        >
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className={`inline-flex items-center px-4 py-2 ${colorSystem.light.button.primary} dark:${colorSystem.dark.button.primary} rounded-md ${colorSystem.light.interactive.focus} dark:${colorSystem.dark.interactive.focus}`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
