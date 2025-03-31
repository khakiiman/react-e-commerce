'use client';

import { useEffect } from 'react';

import { colorSystem } from '@/styles/colorSystem';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div
        className={`${colorSystem.light.background.card} dark:${colorSystem.dark.background.card} p-8 rounded-lg text-center max-w-md w-full`}
      >
        <div className="mb-6">
          <svg
            className={`w-16 h-16 mx-auto ${colorSystem.light.status.error} dark:${colorSystem.dark.status.error}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2
          className={`text-2xl font-bold ${colorSystem.light.text.heading} dark:${colorSystem.dark.text.heading} mb-2`}
        >
          Something went wrong!
        </h2>
        <p
          className={`${colorSystem.light.text.secondary} dark:${colorSystem.dark.text.secondary} mb-6`}
        >
          We encountered an error while trying to process your request.
        </p>
        <button
          onClick={() => reset()}
          className={`px-4 py-2 ${colorSystem.light.button.primary} dark:${colorSystem.dark.button.primary} rounded focus:outline-none ${colorSystem.light.interactive.focus} dark:${colorSystem.dark.interactive.focus}`}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
