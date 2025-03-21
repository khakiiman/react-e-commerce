import { useState, useEffect } from 'react';

type LoadingStatus = {
  [key: number]: 'loaded' | 'error';
};

const useImageLoading = (images?: string[]): boolean => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [_loadingStatus, setLoadingStatus] = useState<LoadingStatus>({});
  
  useEffect(() => {
    // Reset loading state when image list changes
    setImagesLoaded(false);
    setLoadingStatus({});
    
    if (!images || images.length === 0) {
      setImagesLoaded(true);
      return;
    }
    
    // For each image URL, create a new Image object to track loading
    const imageObjects = images.map((src: string, index: number) => {
      const img = new Image();
      
      // Add a small delay to prevent immediate transition
      const handleImageLoad = () => {
        setLoadingStatus(prev => {
          const newStatus: LoadingStatus = { 
            ...prev, 
            [index]: 'loaded' 
          };
          
          // Check if all images are loaded immediately after updating this one
          const allLoaded = images.every((_, i) => 
            newStatus[i] === 'loaded' || newStatus[i] === 'error'
          );
          
          if (allLoaded && images.length === Object.keys(newStatus).length) {
            // Add a small delay before transitioning to prevent flicker
            setTimeout(() => {
              setImagesLoaded(true);
            }, 100);
          }
          
          return newStatus;
        });
      };
      
      const handleImageError = () => {
        setLoadingStatus(prev => {
          const newStatus: LoadingStatus = { 
            ...prev, 
            [index]: 'error' 
          };
          
          // Check if all images are loaded immediately after updating this one
          const allLoaded = images.every((_, i) => 
            newStatus[i] === 'loaded' || newStatus[i] === 'error'
          );
          
          if (allLoaded && images.length === Object.keys(newStatus).length) {
            // Add a small delay before transitioning to prevent flicker
            setTimeout(() => {
              setImagesLoaded(true);
            }, 100);
          }
          
          return newStatus;
        });
      };
      
      // Add event listeners
      img.addEventListener('load', handleImageLoad);
      img.addEventListener('error', handleImageError);
      
      // Set src after adding event listeners to ensure they're caught
      img.src = src;
      
      // If image is already in browser cache, it might be complete already
      if (img.complete) {
        handleImageLoad();
      }
      
      return img;
    });
    
    // Cleanup event listeners on unmount or when images change
    return () => {
      imageObjects.forEach(img => {
        img.removeEventListener('load', () => {});
        img.removeEventListener('error', () => {});
      });
    };
  }, [images]); // Remove dependency on loadingStatus to prevent infinite loops
  
  return imagesLoaded;
};

export default useImageLoading; 