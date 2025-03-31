'use client';

import React, { ErrorInfo } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import ErrorState from '@/components/ui/ErrorState';

interface QueryErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const QueryErrorBoundary: React.FC<QueryErrorBoundaryProps> = ({ children, fallback }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          FallbackComponent={({ error, resetErrorBoundary }: FallbackProps) =>
            fallback || (
              <ErrorState
                error={error}
                message="Failed to load data"
                resetErrorBoundary={resetErrorBoundary}
              />
            )
          }
          onReset={reset}
          onError={(error: Error, info: ErrorInfo) => {
            console.error('Query Error Boundary caught an error:', error, info);
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default QueryErrorBoundary;
