import { useState, useEffect } from 'react';
import useImageLoading from '../hooks/useImageLoading';
import ImageSliderSkeleton from './ImageSliderSkeleton';

function ImageSlider({ imageList, setImgIndex, imgIndex }) {
  const [individualImageLoaded, setIndividualImageLoaded] = useState({});
  const allImagesLoaded = useImageLoading(imageList);
  const [showSkeleton, setShowSkeleton] = useState(true);
  
  // Reset image loaded state when image list changes
  useEffect(() => {
    setIndividualImageLoaded({});
  }, [imageList]);
  
  // Add delay to skeleton hiding to ensure smooth transition
  useEffect(() => {
    if (allImagesLoaded) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 300); // Delay hiding skeleton to ensure images are visible
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(true);
    }
  }, [allImagesLoaded]);
  
  const handleImageLoad = (index) => {
    setIndividualImageLoaded(prev => ({
      ...prev,
      [index]: true
    }));
  };
  
  return (
    <div className="flex flex-col-reverse items-center justify-around lg:flex-row relative" style={{ minHeight: '300px' }}>
      {showSkeleton && (
        <div className="absolute inset-0 z-10">
          <ImageSliderSkeleton />
        </div>
      )}
      
      <div className={`flex flex-row justify-around lg:flex-col ${showSkeleton ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
        {imageList.map((image, index) => (
          <div key={index} className="relative lg:w-20 md:w-16 w-14 my-5 max-md:mx-2 max-lg:mx-5">
            <img
              className={`w-full h-auto rounded-xl cursor-pointer transition-opacity duration-300 ${
                imgIndex === index ? "opacity-30" : ""
              } ${individualImageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
              src={image}
              onLoad={() => handleImageLoad(index)}
              onClick={() => setImgIndex(index)}
              alt={`Product thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
      
      <div className={`lg:w-4/6 max-sm:w-full relative ${showSkeleton ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
        <img
          className={`object-cover w-full h-auto rounded-xl transition-opacity duration-300 ${
            individualImageLoaded[imgIndex] ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ minHeight: '280px' }}
          src={imageList[imgIndex]}
          onLoad={() => handleImageLoad(imgIndex)}
          alt="Product main image"
        />
      </div>
    </div>
  );
}

export default ImageSlider;
