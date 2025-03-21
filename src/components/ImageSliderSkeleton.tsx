import React from 'react';

const ImageSliderSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden bg-gray-200 rounded-lg aspect-square dark:bg-grayshade-300 animate-pulse"></div>
      
      <div className="flex space-x-2">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className="w-16 h-16 rounded bg-gray-200 dark:bg-grayshade-300 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSliderSkeleton; 