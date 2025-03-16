import { useState, useEffect } from 'react';

const useImageLoading = (images) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    setImagesLoaded(false);
    
    if (!images || images.length === 0) {
      setImagesLoaded(true);
      return;
    }
    
    const imageObjects = images.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
    
    let loadedCount = 0;
    
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };
    
    const handleImageError = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };
    
    imageObjects.forEach(img => {
      img.addEventListener('load', handleImageLoad);
      img.addEventListener('error', handleImageError);
      
      if (img.complete) {
        handleImageLoad();
      }
    });
    
    return () => {
      imageObjects.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageError);
      });
    };
  }, [images]);
  
  return imagesLoaded;
};

export default useImageLoading; 