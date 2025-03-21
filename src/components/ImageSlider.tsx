import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiMaximize } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useImageLoading from '../hooks/useImageLoading';
import ImageSliderSkeleton from './ImageSliderSkeleton';

interface ImageSliderProps {
  images?: string[];
  imageList?: string[]; // For backward compatibility
  setImgIndex?: React.Dispatch<React.SetStateAction<number>>;
  imgIndex?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ 
  images = [],
  imageList = [], 
  setImgIndex, 
  imgIndex = 0 
}) => {
  // Use images prop if provided, otherwise fall back to imageList (backward compatibility)
  const imageArray = images.length > 0 ? images : imageList;
  
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(imgIndex);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [enlargedView, setEnlargedView] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(0); // For animation direction
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const allImagesLoaded = useImageLoading(imageArray);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  
  // Add delay to skeleton hiding to ensure smooth transition
  useEffect(() => {
    if (allImagesLoaded) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 300); // Delay hiding skeleton to ensure images are visible
      return () => clearTimeout(timer);
    }
  }, [allImagesLoaded]);
  
  // Use internal or external image index state based on props
  useEffect(() => {
    if (setImgIndex) {
      setImgIndex(currentImageIndex);
    }
  }, [currentImageIndex, setImgIndex]);
  
  // Sync with external imgIndex if provided
  useEffect(() => {
    if (setImgIndex) {  // Only sync if we're using external state
      setCurrentImageIndex(imgIndex);
    }
  }, [imgIndex, setImgIndex]);

  // Handle individual image load states
  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => ({
      ...prev,
      [index]: true
    }));
    
    if (index === currentImageIndex) {
      setIsTransitioning(false);
    }
  };

  // Reset image loaded state when image list changes
  useEffect(() => {
    setImageLoaded({});
  }, [imageArray]);

  // Preload next and previous images
  useEffect(() => {
    if (imageArray.length <= 1) return;
    
    const nextIndex = (currentImageIndex + 1) % imageArray.length;
    const prevIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
    
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    
    preloadImage(imageArray[nextIndex]);
    preloadImage(imageArray[prevIndex]);
  }, [currentImageIndex, imageArray]);

  const changeImage = useCallback((newIndex: number) => {
    // Determine direction for animation
    setDirection(newIndex > currentImageIndex ? 1 : -1);
    
    // Set transitioning state
    setIsTransitioning(true);
    
    // Calculate new index with wraparound
    const index = (newIndex + imageArray.length) % imageArray.length;
    setCurrentImageIndex(index);
    
    // Safety timeout to reset transitioning state if image load fails
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [imageArray.length, currentImageIndex]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return; // Prevent rapid clicking
    changeImage(currentImageIndex + 1);
  }, [changeImage, currentImageIndex, isTransitioning]);

  const handlePrevious = useCallback(() => {
    if (isTransitioning) return; // Prevent rapid clicking
    changeImage(currentImageIndex - 1);
  }, [changeImage, currentImageIndex, isTransitioning]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'Escape' && enlargedView) {
        setEnlargedView(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrevious, enlargedView]);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 30; // Minimum swipe distance
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swiped left, show next image
        handleNext();
      } else {
        // Swiped right, show previous image
        handlePrevious();
      }
    }
    
    // Reset touch points
    setTouchStart(null);
    setTouchEnd(null);
  };

  const toggleEnlargedView = () => {
    setEnlargedView(!enlargedView);
  };

  if (showSkeleton) {
    return <ImageSliderSkeleton />;
  }

  if (!imageArray || imageArray.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg dark:bg-gray-700">
        <p className="text-gray-500 dark:text-gray-400">No images available</p>
      </div>
    );
  }

  // Animation variants for image transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  // Loading spinner animation variant
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: { 
        repeat: Infinity, 
        duration: 1,
        ease: "linear"
      }
    }
  };

  return (
    <>
      {/* Enlarged view overlay */}
      {enlargedView && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={toggleEnlargedView}
        >
          <button 
            className="absolute p-2 text-white bg-black bg-opacity-50 rounded-full top-4 right-4"
            onClick={toggleEnlargedView}
            aria-label="Close enlarged view"
          >
            <FiMaximize size={24} />
          </button>
          <img 
            src={imageArray[currentImageIndex]} 
            alt="Enlarged view" 
            className="object-contain max-w-full max-h-screen p-4"
          />
        </div>
      )}

      <div 
        className="relative group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        data-testid="image-slider"
      >
        {/* Main image display */}
        <div 
          className="relative overflow-hidden rounded-lg aspect-square bg-gray-50 dark:bg-gray-800" 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          data-testid="main-image-container"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="relative w-full h-full"
              data-testid={`product-image-container-${currentImageIndex}`}
            >
              {/* Image skeleton placeholder */}
              {(!imageLoaded[currentImageIndex]) && (
                <div className="absolute inset-0 bg-gray-200 rounded-lg dark:bg-grayshade-300 animate-pulse" 
                     data-testid="image-skeleton"></div>
              )}
              
              <img
                src={imageArray[currentImageIndex]}
                alt={`Product view ${currentImageIndex + 1}`}
                className={`w-full h-full object-contain cursor-pointer transition-opacity duration-300 ${
                  imageLoaded[currentImageIndex] ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={toggleEnlargedView}
                onLoad={() => handleImageLoad(currentImageIndex)}
                data-testid={`product-image-${currentImageIndex}`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Loading indicator overlay */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-40"
                data-testid="image-loading-indicator"
              >
                <motion.div
                  variants={spinnerVariants}
                  animate="animate"
                  className="text-white"
                >
                  <AiOutlineLoading3Quarters size={36} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls || imageArray.length <= 1 ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 p-2 text-gray-700 bg-white rounded-full shadow-md top-2 right-2 bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 dark:text-gray-300 hover:bg-opacity-100 dark:hover:bg-opacity-100"
            onClick={toggleEnlargedView}
            aria-label="Enlarge image"
            data-testid="enlarge-button"
          >
            <FiMaximize size={20} />
          </motion.button>

          {/* Navigation arrows */}
          {imageArray.length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: showControls ? 1 : 0, x: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute z-30 p-2 text-gray-700 transform -translate-y-1/2 bg-white rounded-full shadow-md left-2 top-1/2 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                onClick={handlePrevious}
                disabled={isTransitioning}
                aria-label="Previous image"
                data-testid="previous-button"
              >
                <FiChevronLeft size={24} />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: showControls ? 1 : 0, x: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute z-30 p-2 text-gray-700 transform -translate-y-1/2 bg-white rounded-full shadow-md right-2 top-1/2 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                onClick={handleNext}
                disabled={isTransitioning}
                aria-label="Next image"
                data-testid="next-button"
              >
                <FiChevronRight size={24} />
              </motion.button>
            </>
          )}

          {/* Image counter indicator */}
          {imageArray.length > 1 && (
            <div className="absolute z-30 px-3 py-1 text-xs text-white transform -translate-x-1/2 bg-black bg-opacity-50 rounded-full bottom-2 left-1/2">
              {currentImageIndex + 1} / {imageArray.length}
            </div>
          )}
        </div>
        
        {/* Thumbnails */}
        {imageArray.length > 1 && (
          <div className="flex gap-2 pb-2 mt-4 overflow-x-auto snap-x snap-mandatory" data-testid="thumbnail-container">
            {imageArray.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => !isTransitioning && changeImage(index)}
                whileHover={{ scale: !isTransitioning ? 1.05 : 1 }}
                whileTap={{ scale: !isTransitioning ? 0.95 : 1 }}
                className={`relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-md snap-start ${
                  isTransitioning
                    ? 'cursor-wait'
                    : 'cursor-pointer'
                }`}
                disabled={isTransitioning}
                aria-label={`View image ${index + 1}`}
                aria-current={index === currentImageIndex}
                data-testid={`thumbnail-${index}`}
              >
                {/* Thumbnail skeleton */}
                {!imageLoaded[index] && (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-grayshade-300 animate-pulse"></div>
                )}
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`object-cover w-full h-full transition-opacity duration-300 ${
                    imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(index)}
                />
                <div
                  className={`absolute inset-0 border-2 transition-opacity duration-200 rounded-md ${
                    index === currentImageIndex
                      ? 'opacity-100 border-gray-800 dark:border-white'
                      : 'opacity-0 border-transparent'
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-200 ${
                    index === currentImageIndex
                      ? 'opacity-0'
                      : 'opacity-30 hover:opacity-0'
                  }`}
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ImageSlider; 