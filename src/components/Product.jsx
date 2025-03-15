import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import textShrink from "../utils/helpers/textShrink";
import AddToCart from "./AddToCart";
import StarRating from "./StarRating";
import { toggleFavorite, selectIsFavorite } from "../store/slices/favoritesSlice";

function Product({ productData }) {
  const { id, title, price, images, category, description, rating } = productData;
  const [image] = images;
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const isProductFavorite = useSelector(state => selectIsFavorite(state, id));
  
  
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [image]);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    dispatch(toggleFavorite(productData));
  };
  
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); 
  };
  
  return (
    <div 
      className="group relative border border-grayshade-50 dark:border-grayshade-300 rounded-xl dark:bg-grayshade-500 w-full overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] will-change-transform backface-visibility-hidden"
      style={{ 
        perspective: '1000px',
        WebkitPerspective: '1000px',
        WebkitBackfaceVisibility: 'hidden',
        WebkitTransformStyle: 'preserve-3d'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="product-card"
    >
      {/* Image Container with Overlay */}
      <div className="relative w-full h-64 overflow-hidden">
        <Link to={`${id}`} className="block w-full h-full">
          <div className="absolute inset-0 z-10 transition-all duration-300 bg-black/5 group-hover:bg-black/20"></div>
          
          {/* Skeleton Loader */}
          {!imageLoaded && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-grayshade-400 dark:to-grayshade-500 animate-pulse"
              aria-hidden="true"
            >
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                style={{
                  animationDuration: '1.5s',
                  animationIterationCount: 'infinite'
                }}
              />
            </div>
          )}
          
          {/* Actual Image */}
          <img
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={image}
            alt={title}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {/* Fallback for image error */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-grayshade-400">
              <div className="p-4 text-center">
                <svg className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Image unavailable</p>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-100">
            <p className="text-sm font-medium text-white truncate">{title}</p>
          </div>
        </Link>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute z-30 p-2 transition-transform duration-300 transform rounded-full shadow-lg top-4 right-4 bg-white/90 dark:bg-grayshade-500/90 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-700"
          aria-label={isProductFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isProductFavorite ? (
            <FaHeart className="w-5 h-5 text-red-500" />
          ) : (
            <FaRegHeart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
      
      {/* Content Container */}
      <div className="p-4">
        <div className="w-full">
          <p className="h-auto mb-2 text-xl font-semibold truncate">{title}</p>
          <p className="mb-3 text-xs text-grayshade-100 dark:text-grayshade-50">
            {textShrink(description)}
            <Link
              className="ml-1 text-xs font-semibold text-grayshade-100 dark:text-white hover:underline"
              to={`${id}`}
              state={{ some: "value" }}
            >
              Read More
            </Link>
          </p>
          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-full dark:bg-grayshade-400">
              {category.name}
            </span>
            {rating && (
              <div className="flex items-center">
                <StarRating rating={rating} interactive={false} size="sm" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between w-full pt-2 border-t border-gray-100 dark:border-grayshade-400">
          <div>
            <p className="text-xs text-grayshade-100 dark:text-grayshade-50">Price</p>
            <p className="text-lg font-semibold text-grayshade-300 dark:text-white product-price" data-testid="product-price">
              $ {price.toLocaleString()}
            </p>
          </div>
          <div className="transition-transform duration-300 transform group-hover:scale-105">
            <AddToCart cartData={{id, title, price}}/>
          </div>
        </div>
      </div>
      
      {/* Shine effect on hover */}
      <div 
        className={`absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
        style={{ 
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.8s ease-in-out, opacity 0.3s ease-in-out'
        }}
      ></div>
    </div>
  );
}

export default Product;
