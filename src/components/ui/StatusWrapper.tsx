import React, { ReactNode } from 'react';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

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

/**
 * A wrapper component that handles loading, error and empty states
 * Can be used to wrap any component that fetches data
 */
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
    return loadingComponent ? <>{loadingComponent}</> : <LoadingState text={loadingText} />;
  }

  
  if (isError) {
    const errorMessage = error?.message || errorText;
    return errorComponent ? <>{errorComponent}</> : (
      <ErrorState 
        message={errorMessage} 
        onRetry={onRetry}
        showRetry={!!onRetry}
      />
    );
  }

  
  if (isEmpty) {
    return emptyComponent ? <>{emptyComponent}</> : (
      <div className="flex flex-col items-center justify-center text-center p-6 min-h-[200px]">
        <p className="text-gray-500 dark:text-gray-400">{emptyText}</p>
      </div>
    );
  }

  
  return <>{children}</>;
};

export default StatusWrapper; 