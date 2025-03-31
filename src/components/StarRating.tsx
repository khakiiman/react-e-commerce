import React, { useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRating?: boolean;
  className?: string;
  count?: number;
}
const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  interactive = false,
  size = 'md',
  showRating = false,
  className = '',
  count = 5,
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const currentRating = rating ?? 0;
  const starSizes: Record<string, string> = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };
  const starSize = starSizes[size] || starSizes.md;
  const handleStarClick = (newRating: number) => {
    if (interactive && onRatingChange) {
      console.log('Star clicked:', newRating);
      onRatingChange(newRating);
    }
  };
  const handleMouseEnter = (index: number) => {
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
    const stars = [];
    const activeRating = hoverRating || currentRating;
    const roundedRating = Math.round(activeRating * 2) / 2;
    for (let i = 1; i <= count; i++) {
      let star;
      const isActive = interactive && (!hoverRating || hoverRating >= i);
      if (roundedRating >= i) {
        star = (
          <FaStar
            key={i}
            className={`text-yellow-400 ${isActive ? 'cursor-pointer' : ''} ${starSize}`}
            onClick={() => interactive && handleStarClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            data-testid={`star-${i}`}
          />
        );
      } else if (roundedRating >= i - 0.5) {
        star = (
          <FaStarHalfAlt
            key={i}
            className={`text-yellow-400 ${isActive ? 'cursor-pointer' : ''} ${starSize}`}
            onClick={() => interactive && handleStarClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            data-testid={`star-${i}`}
          />
        );
      } else {
        star = (
          <FaRegStar
            key={i}
            className={`text-gray-300 dark:text-gray-600 ${isActive ? 'cursor-pointer' : ''} ${starSize}`}
            onClick={() => interactive && handleStarClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            data-testid={`star-${i}`}
          />
        );
      }
      stars.push(star);
    }
    return stars;
  };
  return (
    <div className={`flex items-center ${className}`} data-testid="star-rating">
      <div className="flex">{renderStars()}</div>
      {showRating && (
        <div
          className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400"
          data-testid="rating-value"
        >
          {currentRating.toFixed(1)}
        </div>
      )}
    </div>
  );
};
export default StarRating;
