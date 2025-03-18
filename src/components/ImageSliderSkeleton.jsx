function ImageSliderSkeleton() {
  const thumbnailSkeletons = Array(4).fill(0).map((_, index) => (
    <div 
      key={index}
      className="lg:w-20 md:w-16 w-14 my-5 max-md:mx-2 max-lg:mx-5 h-20 md:h-16 rounded-xl bg-gray-200 dark:bg-grayshade-300 animate-pulse"
      style={{ aspectRatio: '1/1' }}
    />
  ));

  return (
    <div className="flex flex-col-reverse items-center justify-around w-full lg:flex-row">
      <div className="flex flex-row justify-around lg:flex-col">
        {thumbnailSkeletons}
      </div>
      <div 
        className="bg-gray-200 lg:w-4/6 max-sm:w-full rounded-xl dark:bg-grayshade-300 animate-pulse"
        style={{ 
          aspectRatio: '4/3',
          height: 'auto',
          minHeight: '280px'
        }}
      />
    </div>
  );
}

export default ImageSliderSkeleton; 