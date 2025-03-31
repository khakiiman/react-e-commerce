import React from 'react';
import { Triangle } from 'react-loader-spinner';
import colorSystem from '@/styles/colorSystem';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'medium',
  className = '',
}) => {
  const sizeMap = {
    small: { height: '40', width: '40', className: 'min-h-[100px]' },
    medium: { height: '60', width: '60', className: 'min-h-[200px]' },
    large: { height: '80', width: '80', className: 'min-h-[300px]' },
  };

  const { height, width, className: sizeClassName } = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center ${sizeClassName} p-4 ${className}`}>
      <Triangle
        visible={true}
        height={height}
        width={width}
        color="#334970"
        ariaLabel="loading-indicator"
      />
      <p className={`mt-4 ${colorSystem.light.text.tertiary} text-center`}>{message}</p>
    </div>
  );
};

export default LoadingState;
