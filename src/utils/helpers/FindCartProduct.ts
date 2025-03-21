interface CartItem {
  id: number | string;
  [key: string]: any;
}

/**
 * Finds an item in the cart array by its ID
 * @param {CartItem[]} cartArray - Array of cart items
 * @param {number|string} id - ID of the item to find
 * @returns {CartItem} - Found cart item
 */
const findItem = (cartArray: CartItem[], id: number | string): CartItem => {
  const foundItem = cartArray.find(item => item.id === id);
  
  if (!foundItem) {
    throw new Error(`Item with ID ${id} not found in cart`);
  }
  
  return foundItem;
};

export default findItem; 