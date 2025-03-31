import { useEffect, useState } from 'react';

type LoadingStatus = {
  [key: number]: 'loaded' | 'error';
};

const useImageLoading = (images?: string[]): boolean => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [, setLoadingStatus] = useState<LoadingStatus>({});

  useEffect(() => {
    setImagesLoaded(false);
    setLoadingStatus({});

    if (!images || images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    const imageObjects = images.map((src: string, index: number) => {
      const img = new Image();

      const handleImageLoad = () => {
        setLoadingStatus(prev => {
          const newStatus: LoadingStatus = {
            ...prev,
            [index]: 'loaded',
          };

          const allLoaded = images.every(
            (_, i) => newStatus[i] === 'loaded' || newStatus[i] === 'error'
          );

          if (allLoaded && images.length === Object.keys(newStatus).length) {
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
            [index]: 'error',
          };
          const allLoaded = images.every(
            (_, i) => newStatus[i] === 'loaded' || newStatus[i] === 'error'
          );
          if (allLoaded && images.length === Object.keys(newStatus).length) {
            setTimeout(() => {
              setImagesLoaded(true);
            }, 100);
          }
          return newStatus;
        });
      };

      img.addEventListener('load', handleImageLoad);
      img.addEventListener('error', handleImageError);
      img.src = src;

      if (img.complete) {
        handleImageLoad();
      }

      return img;
    });

    return () => {
      imageObjects.forEach(img => {
        img.removeEventListener('load', () => {});
        img.removeEventListener('error', () => {});
      });
    };
  }, [images]);
  return imagesLoaded;
};
export default useImageLoading;
