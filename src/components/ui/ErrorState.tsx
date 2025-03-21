import React, { ReactNode } from 'react';
import Button from './Button';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorStateProps {
  message?: string;
  onRetry?: (() => void) | null;
  showRetry?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Reusable error component with consistent styling
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong',
  onRetry,
  showRetry = true,
  className = '',
  children,
}) => {
  return (
    <div 
      className={`
        flex flex-col items-center justify-center text-center p-6
        min-h-[200px] ${className}
      `}
      data-testid="error-state"
    >
      <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Error Encountered
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        {message}
      </p>
      
      {children}
      
      {showRetry && onRetry && (
        <Button 
          variant="primary" 
          onClick={onRetry}
          className="mt-2"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState; 