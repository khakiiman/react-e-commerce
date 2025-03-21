import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../contexts/ToastProvider";
import Button from "./ui/Button";
import { motion } from "framer-motion";
import { FaShoppingCart, FaCheck, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity,
  selectIsInCart,
  selectCartItems
} from "../store/slices/cartSlice";
import { Product } from "../types/api";
import { AppRootState } from "../store";

interface AddToCartProps {
  product: Product;
  onAddToCart?: () => void;
  quantity?: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
  demoMode?: boolean;
}

const AddToCart: React.FC<AddToCartProps> = ({ 
  product, 
  onAddToCart, 
  quantity: externalQuantity, 
  setQuantity: setExternalQuantity,
  demoMode = false
}) => {
  // Guard clause to prevent rendering errors when product is undefined
  if (!product) {
    return null;
  }

  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [internalQuantity, setInternalQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Use external quantity state if provided, otherwise use internal
  const quantity = externalQuantity !== undefined ? externalQuantity : internalQuantity;
  const setQuantity = setExternalQuantity || setInternalQuantity;
  
  const isInCart = useSelector((state: AppRootState) => selectIsInCart(state, product.id));
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find(item => item.product?.id === product.id);
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (demoMode) {
      // In demo mode, just show toast without adding to cart
      showToast({
        id: `add-${product.id}-${Date.now()}`,
        message: `${product.title} has been added to your cart.`,
        type: 'success'
      });
      
      // Show added confirmation animation
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
      return;
    }

    if (!isInCart) {
      dispatch(addToCart({ product, quantity }));
      
      // If custom onAddToCart handler is provided, call it
      if (onAddToCart) {
        onAddToCart();
      }
      
      showToast({
        id: `add-${product.id}-${Date.now()}`,
        message: `${product.title} has been added to your cart.`,
        type: 'success'
      });
      
      // Show added confirmation animation
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const handleRemoveFromCart = () => {
    if (demoMode) {
      showToast({
        id: `remove-${product.id}-${Date.now()}`,
        message: `${product.title} has been removed from your cart.`,
        type: 'info'
      });
      return;
    }

    dispatch(removeFromCart(product.id));
    showToast({
      id: `remove-${product.id}-${Date.now()}`,
      message: `${product.title} has been removed from your cart.`,
      type: 'info'
    });
  };

  const handleIncreaseQuantity = () => {
    if (demoMode) return;
    
    if (isInCart) {
      dispatch(increaseQuantity(product.id));
    } else {
      setQuantity(prev => Math.min(prev + 1, product.stock || 10));
    }
  };

  const handleDecreaseQuantity = () => {
    if (demoMode) return;
    
    if (isInCart && cartQuantity > 1) {
      dispatch(decreaseQuantity(product.id));
    } else if (!isInCart && quantity > 1) {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <button
            onClick={handleDecreaseQuantity}
            disabled={demoMode || (isInCart ? cartQuantity <= 1 : quantity <= 1)}
            className={`flex items-center justify-center w-8 h-8 text-gray-700 bg-gray-200 rounded-l-md dark:bg-grayshade-500 dark:text-gray-200 focus:outline-none ${
              demoMode || (isInCart ? cartQuantity <= 1 : quantity <= 1)
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-300 dark:hover:bg-grayshade-400'
            }`}
            aria-label="Decrease quantity"
          >
            <FaMinus className="w-3 h-3" />
          </button>
          
          <div className="flex items-center justify-center w-12 h-8 text-center text-gray-700 bg-gray-100 dark:bg-grayshade-300 dark:text-gray-200">
            {isInCart ? cartQuantity : quantity}
          </div>
          
          <button
            onClick={handleIncreaseQuantity}
            disabled={demoMode || (isInCart ? cartQuantity >= (product.stock || 10) : quantity >= (product.stock || 10))}
            className={`flex items-center justify-center w-8 h-8 text-gray-700 bg-gray-200 rounded-r-md dark:bg-grayshade-500 dark:text-gray-200 focus:outline-none ${
              demoMode || (isInCart ? cartQuantity >= (product.stock || 10) : quantity >= (product.stock || 10))
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-300 dark:hover:bg-grayshade-400'
            }`}
            aria-label="Increase quantity"
          >
            <FaPlus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {isInCart && !demoMode ? (
        <Button
          onClick={handleRemoveFromCart}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
          aria-label="Remove from cart"
          data-testid="remove-from-cart-button"
        >
          <FaTrash className="w-4 h-4" />
          <span>Remove from Cart</span>
        </Button>
      ) : (
        <motion.div
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`relative flex items-center justify-center w-full gap-2 px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none ${
              isAdded ? 'bg-green-600 hover:bg-green-600' : ''
            }`}
            aria-label="Add to cart"
            data-testid="add-to-cart-detail-button"
          >
            {isAdded ? (
              <>
                <FaCheck className="w-4 h-4" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <FaShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default AddToCart; 