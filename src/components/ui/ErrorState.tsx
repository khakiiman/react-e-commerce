import React from 'react';
import colorSystem from '@/styles/colorSystem';
import Button from './buttons/Button';

interface ErrorStateProps {
  message?: string;
  error?: Error;
  resetErrorBoundary?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong.',
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className={`mb-4 text-rich-black`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className={`mb-2 text-xl font-bold ${colorSystem.light.text.primary}`}>{message}</h3>
      {error && (
        <p className={`mb-4 text-sm ${colorSystem.light.text.tertiary}`}>
          {error.message || 'An unexpected error occurred.'}
        </p>
      )}
      {resetErrorBoundary && (
        <Button onClick={resetErrorBoundary} className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
