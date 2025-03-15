import { useState } from "react";
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

function AddToCart({cartData}) {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  
  const isInCart = useSelector(state => selectIsInCart(state, cartData.id));
  const cartItems = useSelector(selectCartItems);
  const item = cartItems.find(item => item.id === cartData.id);
  
  const handleAddToCart = () => {    
    setIsAdded(true);
    dispatch(addToCart({
      id: cartData.id,
      title: cartData.title,
      price: cartData.price,
      quantity: 1
    }));
    
    const productName = cartData.title || 'Product';
    const productPrice = cartData.price ? `$${cartData.price}` : '';
    const toastMessage = productPrice 
      ? `Added ${productName} (${productPrice}) to cart!`
      : `Added ${productName} to cart!`;
      
    showToast(toastMessage, 'success');
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(cartData.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(cartData.id));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(cartData.id));
    showToast(`${cartData.title || 'Product'} removed from cart!`, 'info');
  };
  
  if (isInCart) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 text-white"
          >
            <FaPlus className="text-sm" />
          </motion.button>
          
          <span className="inline-block px-3 py-1 text-center border rounded-lg dark:bg-grayshade-300 bg-zinc-200 text-grayshade-500 dark:text-white border-grayshade-50 dark:border-grayshade-100 min-w-10">
            {item?.quantity || 0}
          </span>
          
          {item?.quantity > 1 ? (
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleDecrease}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 text-white"
            >
              <FaMinus className="text-sm" />
            </motion.button>
          ) : (
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-red-500 text-white"
            >
              <FaTrash className="text-sm" />
            </motion.button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-between">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant={isAdded ? "success" : "primary"}
          onClick={handleAddToCart}
          disabled={isAdded}
          className={isAdded ? "transition-all duration-300" : ""}
        >
          <span className="flex items-center">
            {isAdded ? (
              <>
                <FaCheck className="mr-2" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <FaShoppingCart className="mr-2" />
                <span>Add To Cart</span>
              </>
            )}
          </span>
        </Button>
      </motion.div>
    </div>
  );
}

export default AddToCart;