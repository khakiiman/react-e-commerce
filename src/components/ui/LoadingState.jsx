import React from 'react';
import { Triangle } from 'react-loader-spinner';

/**
 * Reusable loading component with consistent styling
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - Loading text to display
 * @param {string} props.size - Size of the loader (small, medium, large)
 * @param {string} props.color - Color of the loader
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.fullHeight - Whether to take full height of parent
 */
const LoadingState = ({
  text = 'Loading...',
  size = 'medium',
  color = '#1f2937',
  className = '',
  fullHeight = false,
}) => {
  
  const sizeMap = {
    small: { height: '40', width: '40', containerClass: 'min-h-[100px]' },
    medium: { height: '80', width: '80', containerClass: 'min-h-[200px]' },
    large: { height: '120', width: '120', containerClass: 'min-h-[300px]' },
  };

  const { height, width, containerClass } = sizeMap[size] || sizeMap.medium;

  return (
    <div 
      className={`
        flex flex-col items-center justify-center 
        ${fullHeight ? 'h-full' : containerClass}
        ${className}
      `}
      data-testid="loading-indicator"
    >
      <Triangle
        visible
        height={height}
        width={width}
        color={color}
        ariaLabel="loading-indicator"
      />
      {text && (
        <p className="mt-4 font-medium text-center text-gray-600 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingState; 