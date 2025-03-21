import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleFavorite, selectIsFavorite } from "../store/slices/favoritesSlice";
import StarRating from './StarRating';
import { AppRootState } from "../store";
import type { Product } from '../types/api';
import { useToast } from '../contexts/ToastProvider';

interface ProductProps {
  productData: Product;
}

const Product: React.FC<ProductProps> = ({ productData }) => {
  const dispatch = useDispatch();
  const { id, title, price, category, images, rating, discountPercentage } = productData;
  const isProductFavorite = useSelector((state: AppRootState) => selectIsFavorite(state, id));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { showToast } = useToast();

  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  }, [dispatch, id]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Just show toast message instead of actually adding to cart
    showToast(`${title} has been added to your cart.`);
  }, [dispatch, productData, title, showToast]);

  // Round the discount percentage to a whole number
  const roundedDiscountPercentage = discountPercentage ? Math.round(discountPercentage) : null;

  const discountedPrice = roundedDiscountPercentage 
    ? (price - (price * (roundedDiscountPercentage / 100))).toFixed(2)
    : null;

  // Animation variants for the discount badge
  const discountBadgeVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0, 
      rotateZ: -10,
      y: -10,
    },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotateZ: 0,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15,
        delay: 0.1
      }
    },
    hover: {
      scale: 1.1,
      rotateZ: 0,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col w-full h-full mx-auto overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
      data-testid="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${id}`} className="relative block overflow-hidden aspect-[4/3] bg-gray-50 dark:bg-gray-850">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        <img 
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={images && images.length > 0 ? images[0] : 'https://placehold.co/400x300?text=No+Image'} 
          alt={title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        {imageLoaded && roundedDiscountPercentage && (
          <motion.div 
            className="absolute top-2 left-2 bg-gradient-to-br from-gray-300 via-gray-900 to-gray-300 text-white text-sm font-bold px-3 py-1.5 rounded-md shadow-lg transform origin-top-left dark:from-gray-300 dark:via-gray-900 dark:to-gray-300"
            style={{
              textShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)',
              boxShadow: isHovered 
                ? '0 4px 10px -2px rgb(33, 33, 33), 0 2px 6px -1px rgba(0, 0, 0, 0.2)' 
                : '0 4px 6px -1px rgb(33, 33, 33), 0 2px 4px -1px rgba(0, 0, 0, 0.1)'
            }}
            variants={discountBadgeVariants}
            initial="initial"
            animate={isHovered ? ["animate", "pulse"] : "animate"}
            whileHover="hover"
          >
            {roundedDiscountPercentage}% OFF
          </motion.div>
        )}
      </Link>

      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
            {category?.name || 'Uncategorized'}
          </span>
          {rating !== undefined && (
            <StarRating rating={rating} size="sm" />
          )}
        </div>
        
        <Link to={`/products/${id}`} className="block mb-2 group">
          <h3 className="font-semibold text-gray-900 transition-colors line-clamp-2 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-white">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100 dark:border-gray-700">
          <div>
            {discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">${discountedPrice}</span>
                <span className="text-sm text-gray-500 line-through dark:text-gray-400">${price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">${price}</span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleToggleFavorite}
              className="p-2 text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:outline-none"
              aria-label={isProductFavorite ? "Remove from favorites" : "Add to favorites"}
              data-testid="favorite-button"
            >
              {isProductFavorite ? (
                <AiFillHeart className="text-gray-900 dark:text-gray-100" size={20} />
              ) : (
                <AiOutlineHeart size={20} />
              )}
            </button>
            
            <button 
              onClick={handleAddToCart}
              className="p-2 text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:outline-none"
              aria-label="Add to cart"
              data-testid="add-to-cart-button"
            >
              <BsCartPlus size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Product; 