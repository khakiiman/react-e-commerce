import { motion } from "framer-motion";
import ImageSliderSkeleton from "./ImageSliderSkeleton";

const ProductDetailSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white shadow-lg dark:bg-grayshade-400 rounded-xl"
    >
      <div className="sticky top-0 z-20 flex items-center justify-between w-full p-4 bg-white/95 dark:bg-grayshade-400/95 backdrop-blur-sm md:absolute md:w-auto md:right-4 md:top-4 md:bg-transparent md:p-0 md:dark:bg-transparent">
        <div className="w-20 h-8 bg-gray-200 rounded-full dark:bg-grayshade-300 animate-pulse"></div>
        <div className="w-12 h-8 bg-gray-200 rounded-full dark:bg-grayshade-300 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 p-4 pt-16 md:pt-6 lg:grid-cols-2 lg:p-8">
        <div className="relative">
          <ImageSliderSkeleton />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 mb-3"
            >
              <div className="w-24 h-6 bg-gray-200 rounded-full dark:bg-grayshade-300 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-full w-36 dark:bg-grayshade-300 animate-pulse"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-3/4 h-10 mb-4 bg-gray-200 rounded-lg dark:bg-grayshade-300 animate-pulse"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 space-y-2"
            >
              <div className="w-full h-4 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
              <div className="w-full h-4 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
              <div className="w-2/3 h-4 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
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
                <div className="w-16 h-4 mb-2 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
                <div className="w-32 h-8 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
              </div>
              
              <div className="w-32 h-10 bg-gray-200 rounded-lg dark:bg-grayshade-300 animate-pulse"></div>
            </div>

            <div className="w-full h-12 bg-gray-200 rounded-lg dark:bg-grayshade-300 animate-pulse"></div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 pt-8 border-gray-200 md:grid-cols-3 dark:border-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center p-4 bg-gray-100 rounded-lg md:rounded-bl-lg md:rounded-tr-none dark:bg-gray-600"
        >
          <div className="w-12 h-12 mb-2 bg-gray-200 rounded-full dark:bg-grayshade-300 animate-pulse"></div>
          <div className="w-24 h-4 mb-1 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
          <div className="w-32 h-3 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center p-4 mt-2 bg-gray-100 rounded-lg md:rounded-none dark:bg-gray-600 md:mt-0"
        >
          <div className="w-12 h-12 mb-2 bg-gray-200 rounded-full dark:bg-grayshade-300 animate-pulse"></div>
          <div className="w-24 h-4 mb-1 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
          <div className="w-32 h-3 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center p-4 mt-2 bg-gray-100 rounded-lg md:rounded-br-lg md:rounded-tl-none dark:bg-gray-600 md:mt-0"
        >
          <div className="w-12 h-12 mb-2 bg-gray-200 rounded-full dark:bg-grayshade-300 animate-pulse"></div>
          <div className="w-24 h-4 mb-1 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
          <div className="w-32 h-3 bg-gray-200 rounded dark:bg-grayshade-300 animate-pulse"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailSkeleton; 