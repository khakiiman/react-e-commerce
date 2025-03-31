import React, { ReactNode } from 'react';
import colorSystem from '@/styles/colorSystem';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';

interface StatusWrapperProps {
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  children: ReactNode;
  emptyComponent?: ReactNode;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  onRetry?: (() => void) | null;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
}

const StatusWrapper: React.FC<StatusWrapperProps> = ({
  isLoading = false,
  isError = false,
  error = null,
  isEmpty = false,
  children,
  emptyComponent = null,
  loadingComponent = null,
  errorComponent = null,
  onRetry = null,
  loadingText = 'Loading...',
  errorText = 'An error occurred while fetching data.',
  emptyText = 'No data available.',
}) => {
  if (isLoading) {
    return loadingComponent ? <>{loadingComponent}</> : <LoadingState message={loadingText} />;
  }

  if (isError) {
    const errorMessage = error?.message || errorText;
    return errorComponent ? (
      <>{errorComponent}</>
    ) : (
      <ErrorState
        message={errorMessage}
        error={error ?? undefined}
        resetErrorBoundary={onRetry || undefined}
      />
    );
  }

  if (isEmpty) {
    return emptyComponent ? (
      <>{emptyComponent}</>
    ) : (
      <div className="flex flex-col items-center justify-center text-center p-6 min-h-[200px]">
        <p className={colorSystem.light.text.tertiary}>{emptyText}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default StatusWrapper;
