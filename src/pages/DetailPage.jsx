import { Link, useParams } from "react-router-dom";
import { useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { Triangle } from "react-loader-spinner";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import AddToCart from "../components/AddToCart";
import ImageSlider from "../components/ImageSlider";
import { useProduct } from "../hooks/useProductsApi";
import { toggleFavorite, selectIsFavorite } from "../store/slices/favoritesSlice";
import StatusWrapper from "../components/ui/StatusWrapper";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <Triangle
      visible
      height="120"
      width="120"
      color="#1f2937"
      ariaLabel="triangle-loading"
    />
    <p className="text-lg text-gray-600 dark:text-gray-400">Loading product details...</p>
  </div>
);

const DeliveryInfo = () => (
  <div className="grid grid-cols-1 pt-8 border-gray-200 md:grid-cols-3 dark:border-gray-700">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-center p-4 bg-gray-100 rounded-bl-lg md:rounded-tr-none dark:bg-gray-600"
    >
      <MdLocalShipping className="mb-2 text-3xl text-gray-700 dark:text-gray-300" />
      <h3 className="font-medium">Free Shipping</h3>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400">On orders over $100</p>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col items-center p-4 mt-2 bg-gray-100 dark:bg-gray-600 md:mt-0"
    >
      <TbTruckDelivery className="mb-2 text-3xl text-gray-700 dark:text-gray-300" />
      <h3 className="font-medium">Fast Delivery</h3>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400">2-3 business days</p>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex flex-col items-center p-4 mt-2 bg-gray-100 rounded-br-lg md:rounded-tl-none dark:bg-gray-600 md:mt-0"
    >
      <BsBoxSeam className="mb-2 text-3xl text-gray-700 dark:text-gray-300" />
      <h3 className="font-medium">Easy Returns</h3>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400">30-day return policy</p>
    </motion.div>
  </div>
);

export default function DetailPage() {
  const [imgIndex, setImgIndex] = useState(0);
  const { id } = useParams();
  const { data: product, isLoading, isError, error, refetch } = useProduct(parseInt(id, 10));
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const dispatch = useDispatch();
  const isProductFavorite = useSelector(state => selectIsFavorite(state, parseInt(id, 10)));

  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product));
  };

  const rating = product ? (product.rating || Math.floor(Math.random() * 3) + 3) : 0;
  const reviews = product ? Math.floor(Math.random() * 500) + 50 : 0;

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl wrapper">
      {isLoading ? (
        <ProductDetailSkeleton />
      ) : isError ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-white shadow-lg dark:bg-grayshade-400 rounded-xl"
        >
          <div className="flex flex-col items-center justify-center p-8 py-16 text-center">
            <div className="p-6 mb-6 bg-gray-200 rounded-full dark:bg-gray-900">
              <RiSignalWifiErrorFill className="w-24 h-24 text-gray-900 dark:text-gray-200" />
            </div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-100"
            >
              Unable to Load Product
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mb-8 text-base text-gray-600 dark:text-gray-300"
            >
              We encountered an issue while fetching the product details. This might be due to network connectivity or the product may no longer be available.
            </motion.p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={refetch}
                className="px-6 py-3 font-medium text-gray-100 transition-colors bg-gray-700 rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 dark:focus:ring-offset-gray-700 dark:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-300"
              >
                Try Again
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/products"
                  className="flex items-center justify-center px-6 py-3 font-medium text-gray-700 transition-colors bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 dark:bg-gray-700 dark:border-gray-300 dark:text-gray-100 dark:hover:bg-gray-900 dark:focus:ring-offset-grayshade-900"
                >
                  Back to Products
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : product ? (
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden bg-white shadow-lg dark:bg-grayshade-400 rounded-xl"
          >
            {/* Navigation and Action Bar - Fixed position on mobile, absolute on desktop */}
            <div className="sticky top-0 z-20 flex items-center justify-between w-full p-4 bg-white/95 dark:bg-grayshade-400/95 backdrop-blur-sm md:absolute md:w-auto md:right-4 md:top-4 md:bg-transparent md:p-0 md:dark:bg-transparent">
              <Link
                to="/products"
                className="flex items-center px-3 py-2 space-x-1 text-sm text-gray-700 transition-colors bg-white rounded-full shadow-sm md:px-4 md:py-2 md:text-base dark:bg-grayshade-500 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-grayshade-400"
              >
                <IoIosArrowBack className="flex-shrink-0" />
                <span>Back</span>
              </Link>
              
              <button
                onClick={() => handleToggleFavorite(product)}
                className="flex items-center px-3 py-2 space-x-1 text-sm transition-colors bg-white rounded-full shadow-sm md:px-4 md:py-2 md:text-base dark:bg-grayshade-500 hover:bg-gray-50 dark:hover:bg-grayshade-400 group"
                aria-label={isProductFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isProductFavorite ? (
                  <>
                    <FaHeart className="flex-shrink-0 w-5 h-5 text-red-500" />
                    <span className="hidden text-gray-700 dark:text-gray-200 sm:inline">Saved</span>
                  </>
                ) : (
                  <>
                    <FaRegHeart className="flex-shrink-0 w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-red-500" />
                    <span className="hidden text-gray-700 dark:text-gray-200 sm:inline">Save</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 p-4 pt-16 md:pt-6 lg:grid-cols-2 lg:p-8">
              <div className="relative">
                <ImageSlider
                  imageList={product.images}
                  setImgIndex={setImgIndex}
                  imgIndex={imgIndex}
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center gap-2 mb-3"
                  >
                    <span className="inline-block px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-grayshade-500 dark:text-gray-300">
                      {product.category.name}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={`${
                              index < rating
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            } w-4 h-4`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        ({reviews} reviews)
                      </span>
                    </div>
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white"
                  >
                    {product.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8 text-base text-gray-600 sm:text-lg dark:text-gray-300"
                  >
                    {product.description}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-end justify-around px-4"
                >
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Price</p>
                      <p className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="w-full">
                    <AddToCart
                      cartData={{
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantity: selectedQuantity,
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <DeliveryInfo />
          </motion.div>
        </Suspense>
      ) : null}
    </div>
  );
}
