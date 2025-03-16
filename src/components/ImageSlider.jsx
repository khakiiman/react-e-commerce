import useImageLoading from '../hooks/useImageLoading';
import ImageSliderSkeleton from './ImageSliderSkeleton';

function ImageSlider({ imageList, setImgIndex, imgIndex }) {
  const imagesLoaded = useImageLoading(imageList);
  
  if (!imagesLoaded) {
    return <ImageSliderSkeleton />;
  }
  
  return (
    <div className="flex flex-col-reverse items-center justify-around lg:flex-row">
      <div className="flex flex-row justify-around lg:flex-col">
        {imageList.map((image, index) => (
          <img
            className={`lg:w-20 md:w-16 w-14 my-5 max-md:mx-2 max-lg:mx-5 rounded-xl cursor-pointer ${
              imgIndex === index ? "opacity-30" : ""
            }`}
            key={index}
            src={image}
            onClick={() => setImgIndex(index)}
            alt={`Product thumbnail ${index + 1}`}
          />
        ))}
      </div>
      <img
        className="object-cover lg:w-4/6 max-sm:w-full rounded-xl"
        src={imageList[imgIndex]}
        alt="Product main image"
      />
    </div>
  );
}

export default ImageSlider;
