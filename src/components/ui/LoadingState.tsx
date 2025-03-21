import React from 'react';
import { Triangle } from 'react-loader-spinner';

type LoadingSize = 'small' | 'medium' | 'large';

interface SizeConfig {
  height: string;
  width: string;
  containerClass: string;
}

interface SizeMap {
  [key: string]: SizeConfig;
}

interface LoadingStateProps {
  text?: string;
  size?: LoadingSize;
  color?: string;
  className?: string;
  fullHeight?: boolean;
}

/**
 * Reusable loading component with consistent styling
 */
const LoadingState: React.FC<LoadingStateProps> = ({
  text = 'Loading...',
  size = 'medium',
  color = '#1f2937',
  className = '',
  fullHeight = false,
}) => {
  
  const sizeMap: SizeMap = {
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
        visible={true}
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