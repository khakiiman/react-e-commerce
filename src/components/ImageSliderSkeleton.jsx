function ImageSliderSkeleton() {
  const thumbnailSkeletons = Array(4).fill(0).map((_, index) => (
    <div 
      key={index}
      className="h-20 my-5 bg-gray-200 lg:w-20 md:w-16 w-14 max-md:mx-2 max-lg:mx-5 rounded-xl dark:bg-grayshade-300 animate-pulse"
    />
  ));

  return (
    <div className="flex flex-col-reverse items-center justify-around lg:flex-row">
      <div className="flex flex-row justify-around lg:flex-col">
        {thumbnailSkeletons}
      </div>
      <div 
        className="bg-gray-200 lg:w-4/6 max-sm:w-full h-80 md:h-96 rounded-xl dark:bg-grayshade-300 animate-pulse"
      />
    </div>
  );
}

export default ImageSliderSkeleton; 