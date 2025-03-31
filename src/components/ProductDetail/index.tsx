'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FaBox,
  FaCheck,
  FaImage,
  FaShieldAlt,
  FaShoppingCart,
  FaTimes,
  FaTruck,
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import StarRating from '@/components/atoms/StarRating';
import { useToast } from '@/contexts/ToastProvider';
import { useAppSelector } from '@/store';
import { addToCart, removeFromCart, selectIsInCart } from '@/store/slices/cartSlice';
import { colorSystem } from '@/styles/colorSystem';
import { Product } from '@/types/api';

interface ProductDetailProps {
  product: Product & { thumbnail?: string };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.thumbnail || product.images[0] || ''
  );
  const [imageError, setImageError] = useState<boolean>(false);
  const [allImages, setAllImages] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const isInCart = useAppSelector(state => selectIsInCart(state, product.id));

  useEffect(() => {
    if (product) {
      const thumbnail = product.thumbnail || product.images[0] || '';
      const thumbnailAndImages = [thumbnail, ...(product.images || [])].filter(Boolean);
      setAllImages([...new Set(thumbnailAndImages)]);
      setSelectedImage(thumbnail);
      setImageError(false);
    }
  }, [product]);

  if (!product) {
    return null;
  }

  const { title, description, price, rating, brand, category, discountPercentage } = product;
  const discount = discountPercentage ? Math.round(discountPercentage) : 0;
  const originalPrice = discount ? Math.round(price / (1 - discount / 100)) : price;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
    setImageError(false);
  };

  const handleCartAction = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
      showToast({
        id: `remove-${product.id}-${Date.now()}`,
        message: `${title} has been removed from your cart.`,
        type: 'info',
        duration: 3000,
      });
    } else {
      dispatch(addToCart({ product }));
      showToast({
        id: `add-${product.id}-${Date.now()}`,
        message: `${title} has been added to your cart.`,
        type: 'success',
        duration: 3000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white shadow-lg dark:bg-yinmn-blue rounded-xl col-span-2"
    >
      <div className="grid grid-cols-1 gap-8 p-4 pt-6 lg:grid-cols-2 lg:p-8">
        <div className="relative">
          <div className="overflow-hidden rounded-lg aspect-square bg-gray-100 dark:bg-gray-800">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {imageError ? (
                <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                  <FaImage className="w-12 h-12 mb-2" />
                  <p className="text-sm">Image not available</p>
                </div>
              ) : (
                <Image
                  src={selectedImage}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  priority
                  onError={handleImageError}
                />
              )}
            </motion.div>
          </div>

          <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`relative w-16 h-16 cursor-pointer rounded-md overflow-hidden border-2 ${
                  selectedImage === image
                    ? 'border-gray-900 dark:border-gray-100'
                    : 'border-transparent'
                }`}
                onClick={() => handleThumbnailClick(image)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 mb-3"
            >
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${colorSystem.light.background.badge} dark:${colorSystem.dark.background.badge}`}
              >
                {category?.name || 'Product'}
              </span>
              <span
                className={`text-sm ${colorSystem.light.text.tertiary} dark:${colorSystem.dark.text.tertiary}`}
              >
                {brand}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`mb-4 text-2xl font-bold md:text-3xl ${colorSystem.light.text.heading} dark:${colorSystem.dark.text.heading}`}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`mb-8 ${colorSystem.light.text.secondary} dark:${colorSystem.dark.text.secondary}`}
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mb-6"
            >
              <StarRating rating={rating || 0} showRating size="md" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="grid grid-cols-2 gap-4 mb-6 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-medium ${colorSystem.light.text.secondary} dark:${colorSystem.dark.text.secondary}`}
                >
                  Brand:
                </span>
                <span
                  className={
                    colorSystem.light.text.primary + ' dark:' + colorSystem.dark.text.primary
                  }
                >
                  {brand}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-medium ${colorSystem.light.text.secondary} dark:${colorSystem.dark.text.secondary}`}
                >
                  Category:
                </span>
                <span
                  className={
                    colorSystem.light.text.primary + ' dark:' + colorSystem.dark.text.primary
                  }
                >
                  {category?.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-medium ${colorSystem.light.text.secondary} dark:${colorSystem.dark.text.secondary}`}
                >
                  Stock:
                </span>
                <span
                  className={`${product.stock && product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {product.stock && product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-medium ${colorSystem.light.text.secondary} dark:${colorSystem.dark.text.secondary}`}
                >
                  ID:
                </span>
                <span
                  className={
                    colorSystem.light.text.tertiary + ' dark:' + colorSystem.dark.text.tertiary
                  }
                >
                  #{product.id}
                </span>
              </div>
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
                <span
                  className={`text-sm ${colorSystem.light.text.tertiary} dark:${colorSystem.dark.text.tertiary}`}
                >
                  Price
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-2xl font-bold ${colorSystem.light.text.primary} dark:${colorSystem.dark.text.primary}`}
                  >
                    ${price.toFixed(2)}
                  </span>
                  {discount > 0 && (
                    <span
                      className={`text-sm line-through ${colorSystem.light.text.tertiary} dark:${colorSystem.dark.text.tertiary}`}
                    >
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                      {discount}% OFF
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <span
                  className={`flex items-center gap-1 text-sm ${product.stock && product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {product.stock && product.stock > 0 ? (
                    <>
                      <FaCheck size={12} />
                      In stock
                    </>
                  ) : (
                    <>
                      <FaTimes size={12} />
                      Out of stock
                    </>
                  )}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCartAction}
              className={`
                w-full py-3 px-4 text-base font-medium transition-all border border-silver-lake-blue duration-300 rounded-lg
                flex items-center justify-center gap-2
                ${
                  isInCart
                    ? `${colorSystem.light.button.danger} dark:${colorSystem.dark.button.danger}`
                    : `${colorSystem.light.button.primary} dark:${colorSystem.dark.button.primary}`
                }
                shadow-md hover:shadow-lg
                transform hover:-translate-y-0.5
              `}
              data-testid="cart-button"
            >
              {isInCart ? (
                <>
                  <FaTimes size={16} />
                  Remove from Cart
                </>
              ) : (
                <>
                  <FaShoppingCart size={16} />
                  Add to Cart
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 pt-8 md:grid-cols-3 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center p-4 bg-gray-100 rounded-lg md:rounded-bl-lg md:rounded-tr-none dark:bg-gray-800"
        >
          <FaTruck className="w-6 h-6 mb-2 text-gray-600 dark:text-gray-300" />
          <h3
            className={`mb-1 font-medium ${colorSystem.light.text.primary} dark:${colorSystem.dark.text.primary}`}
          >
            Free Shipping
          </h3>
          <p
            className={`text-xs text-center ${colorSystem.light.text.tertiary} dark:${colorSystem.dark.text.tertiary}`}
          >
            On orders over $50
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center p-4 mt-2 bg-gray-100 rounded-lg md:rounded-none dark:bg-gray-800 md:mt-0"
        >
          <FaShieldAlt className="w-6 h-6 mb-2 text-gray-600 dark:text-gray-300" />
          <h3
            className={`mb-1 font-medium ${colorSystem.light.text.primary} dark:${colorSystem.dark.text.primary}`}
          >
            2 Year Warranty
          </h3>
          <p
            className={`text-xs text-center ${colorSystem.light.text.tertiary} dark:${colorSystem.dark.text.tertiary}`}
          >
            Full coverage
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center p-4 mt-2 bg-gray-100 rounded-lg md:rounded-br-lg md:rounded-tl-none dark:bg-gray-800 md:mt-0"
        >
          <FaBox className="w-6 h-6 mb-2 text-gray-600 dark:text-gray-300" />
          <h3
            className={`mb-1 font-medium ${colorSystem.light.text.primary} dark:${colorSystem.dark.text.primary}`}
          >
            30 Day Returns
          </h3>
          <p
            className={`text-xs text-center ${colorSystem.light.text.tertiary} dark:${colorSystem.dark.text.tertiary}`}
          >
            No questions asked
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
