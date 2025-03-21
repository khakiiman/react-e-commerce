import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  AiOutlineHeart, 
  AiFillHeart, 
  AiFillStar,
  AiOutlineStar, 
} from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { FaShieldAlt } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { motion } from "framer-motion";
import { toggleFavorite, selectIsFavorite } from "../store/slices/favoritesSlice";
import AddToCart from "../components/AddToCart";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";
import ImageSlider from "../components/ImageSlider";
import { useProduct } from "../hooks/useProductsApi";
import { AppRootState } from "../store";
import { Product } from "../types/api";
import { useToast } from "../contexts/ToastProvider";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const { showToast } = useToast();

  if (!id) {
    navigate("/not-found");
    return null;
  }

  const { 
    data, 
    isLoading, 
    isError,
    error
  } = useProduct(parseInt(id, 10));

  // Properly type the product
  const product = data as unknown as Product;

  const isProductFavorite = useSelector((state: AppRootState) => selectIsFavorite(state, parseInt(id, 10)));

  const handleToggleFavorite = (productId: number) => {
    dispatch(toggleFavorite(productId));
  };

  const handleAddToCart = () => {
    // Demo mode - only show toast without actually adding to cart
    if (product) {
      showToast(`${product.title} has been added to your cart.`);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto md:px-6 lg:px-8 max-w-7xl">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            {error instanceof Error ? error.message : "Error loading product"}
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            The product you are looking for might have been removed or is temporarily unavailable.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 font-medium text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { 
    title, 
    description, 
    price, 
    discountPercentage, 
    category, 
    rating, 
    stock, 
    images 
  } = product;

  const discountedPrice = discountPercentage 
    ? (price - (price * (discountPercentage / 100))).toFixed(2)
    : null;

  return (
    <div className="container px-4 py-8 mx-auto md:px-6 lg:px-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-white shadow-lg dark:bg-grayshade-400 rounded-xl"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between w-full p-4 bg-white/95 dark:bg-grayshade-400/95 backdrop-blur-sm md:absolute md:w-auto md:right-10 md:top-12 lg:right-4 lg:top-6 md:bg-transparent md:p-0 md:dark:bg-transparent">
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 text-sm font-medium text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-grayshade-500 dark:text-gray-100 dark:hover:bg-grayshade-600"
          >
            Back
          </button>
          <button
            onClick={() => handleToggleFavorite(parseInt(id, 10))}
            className="p-2 ml-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-grayshade-500 dark:text-gray-100 dark:hover:bg-grayshade-600"
            aria-label={isProductFavorite ? "Remove from favorites" : "Add to favorites"}
            data-testid="detail-favorite-button"
          >
            {isProductFavorite ? (
              <AiFillHeart className="text-red-500" size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 p-4 pt-6 lg:grid-cols-2 lg:p-8">
          <div className="relative">
            <ImageSlider images={images} />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-2 mb-3"
              >
                <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded dark:bg-grayshade-500 dark:text-gray-300">
                  {category?.name || "Uncategorized"}
                </span>
                {stock && stock < 10 && (
                  <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded dark:bg-grayshade-500 dark:text-gray-300">
                    Only {stock} left!
                  </span>
                )}
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white"
              >
                {title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <p className="text-gray-600 dark:text-gray-300">{description}</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>
                        {rating && index < Math.floor(rating) ? (
                          <AiFillStar className="text-yellow-400" size={20} />
                        ) : (
                          <AiOutlineStar className="text-gray-300 dark:text-gray-600" size={20} />
                        )}
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {rating?.toFixed(1) || "No ratings"}
                    </span>
                  </div>
                  {discountedPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${discountedPrice}
                      </span>
                      <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                        ${price}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-200">
                        Save {discountPercentage}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${price}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center p-2 rounded-lg bg-gray-50 dark:bg-grayshade-500" data-testid="stock-indicator">
                  {!stock || stock === 0 ? (
                    <div className="flex items-center space-x-2">
                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">Out of stock</span>
                    </div>
                  ) : stock <= 5 ? (
                    <div className="flex items-center space-x-2">
                      <span className="inline-block w-3 h-3 bg-orange-500 rounded-full"></span>
                      <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Low stock: {stock} left</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">In stock: {stock} available</span>
                    </div>
                  )}
                </div>
              </div>

              <AddToCart
                product={product}
                onAddToCart={handleAddToCart}
                quantity={quantity}
                setQuantity={setQuantity}
                demoMode={true}
              />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 pt-8 border-gray-200 md:grid-cols-3 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-600 "
          >
            <TbTruckDelivery className="w-10 h-10 mb-2 text-gray-600 dark:text-gray-300" />
            <h3 className="mb-1 font-semibold text-gray-800 dark:text-gray-100">Free Shipping</h3>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              Free delivery for all orders over $50
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center p-4 mt-2 bg-gray-100 dark:bg-gray-600 md:mt-0"
          >
            <FaShieldAlt className="w-10 h-10 mb-2 text-gray-600 dark:text-gray-300" />
            <h3 className="mb-1 font-semibold text-gray-800 dark:text-gray-100">1 Year Warranty</h3>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              We offer warranty for all products purchased
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center p-4 mt-2 bg-gray-100 dark:bg-gray-600 md:mt-0 "
          >
            <MdOutlineLocalOffer className="w-10 h-10 mb-2 text-gray-600 dark:text-gray-300" />
            <h3 className="mb-1 font-semibold text-gray-800 dark:text-gray-100">Special Offers</h3>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              Get special offers and priority delivery
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailPage; 