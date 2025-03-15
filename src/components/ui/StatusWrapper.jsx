import React from 'react';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

/**
 * A wrapper component that handles loading, error and empty states
 * Can be used to wrap any component that fetches data
 *
 * @param {Object} props
 * @param {boolean} props.isLoading - Whether data is loading
 * @param {boolean} props.isError - Whether an error occurred
 * @param {Error|null} props.error - Error object if an error occurred
 * @param {boolean} props.isEmpty - Whether data is empty
 * @param {React.ReactNode} props.children - Content to show when not loading/error/empty
 * @param {React.ReactNode} props.emptyComponent - Component to show when empty
 * @param {React.ReactNode} props.loadingComponent - Custom loading component
 * @param {React.ReactNode} props.errorComponent - Custom error component
 * @param {Function} props.onRetry - Function to call when retry button is clicked
 * @param {string} props.loadingText - Text to show when loading
 * @param {string} props.errorText - Text to show when error occurs
 * @param {string} props.emptyText - Text to show when empty
 */
const StatusWrapper = ({
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
    return loadingComponent || <LoadingState text={loadingText} />;
  }

  
  if (isError) {
    const errorMessage = error?.message || errorText;
    return errorComponent || (
      <ErrorState 
        message={errorMessage} 
        onRetry={onRetry}
        showRetry={!!onRetry}
      />
    );
  }

  
  if (isEmpty) {
    return emptyComponent || (
      <div className="flex flex-col items-center justify-center text-center p-6 min-h-[200px]">
        <p className="text-gray-500 dark:text-gray-400">{emptyText}</p>
      </div>
    );
  }

  
  return children;
};

export default StatusWrapper; 