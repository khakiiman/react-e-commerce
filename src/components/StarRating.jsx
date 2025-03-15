import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ 
  rating, 
  onRatingChange,
  interactive = false,
  size = 'md', 
  showRating = false, 
  className = '',
  count = 5
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  if (!rating && rating !== 0) {
    rating = 0;
  }

  const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const starSize = starSizes[size] || starSizes.md;

  const handleStarClick = (newRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(newRating);
    }
  };
  
  const handleMouseEnter = (index) => {
    if (interactive) {
      setHoverRating(index);
    }
  };
  
  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const renderStars = () => {
    return [...Array(count)].map((_, i) => {
      const position = i + 1;
      const displayRating = hoverRating || rating;
      const isFullStar = displayRating >= position;
      const isHalfStar = displayRating >= position - 0.5 && displayRating < position;

      const baseClass = `${starSize} ${interactive ? 'cursor-pointer transition-transform duration-150' : ''}`;
      
      if (isFullStar) {
        return (
          <span 
            key={`star-${i}`}
            onClick={() => interactive && handleStarClick(position)}
            onMouseEnter={() => handleMouseEnter(position)}
            onMouseLeave={handleMouseLeave}
            className={interactive ? 'transition-transform hover:scale-110' : ''}
          >
            <FaStar
              className={`text-yellow-400 ${baseClass}`}
              aria-hidden="true"
            />
          </span>
        );
      } else if (isHalfStar) {
        return (
          <span 
            key={`star-${i}`}
            onClick={() => interactive && handleStarClick(position)}
            onMouseEnter={() => handleMouseEnter(position)}
            onMouseLeave={handleMouseLeave}
            className={interactive ? 'transition-transform hover:scale-110' : ''}
          >
            <FaStarHalfAlt
              className={`text-yellow-400 ${baseClass}`}
              aria-hidden="true"
            />
          </span>
        );
      } else {
        return (
          <span 
            key={`star-${i}`}
            onClick={() => interactive && handleStarClick(position)}
            onMouseEnter={() => handleMouseEnter(position)}
            onMouseLeave={handleMouseLeave}
            className={interactive ? 'transition-transform hover:scale-110' : ''}
          >
            <FaRegStar
              className={`text-gray-300 dark:text-gray-600 ${baseClass} ${interactive ? 'hover:text-yellow-300' : ''}`}
              aria-hidden="true"
            />
          </span>
        );
      }
    });
  };

  return (
    <div 
      className={`flex items-center gap-1 ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="flex" 
        role={interactive ? "slider" : "img"} 
        aria-label={interactive ? "Select a rating" : `Rating: ${rating} out of 5 stars`}
        aria-valuemin={0}
        aria-valuemax={5}
        aria-valuenow={rating}
      >
        {renderStars()}
      </div>
      {showRating && (
        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
          {hoverRating > 0 && interactive ? hoverRating.toFixed(1) : parseFloat(rating).toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating; 