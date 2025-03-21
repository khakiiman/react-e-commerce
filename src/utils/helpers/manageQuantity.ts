import findItem from "./FindCartProduct";

interface CartItem {
  id: number | string;
  quantity: number;
  price: number;
  [key: string]: any;
}

type QuantityAction = "INCREASE" | "DECREASE";

function manageQuantity(cartArray: CartItem[], id: number | string, action: QuantityAction): CartItem {
  try {
    // Get the item from the cart
    const item = findItem(cartArray, id);
    
    // Create a CartItem with required properties
    const foundItem: CartItem = {
      ...item,
      quantity: typeof item.quantity === 'number' ? item.quantity : 0,
      price: typeof item.price === 'number' ? item.price : 0
    };
    
    if (action === "INCREASE") {
      foundItem.quantity++;
    } else if (action === "DECREASE" && foundItem.quantity > 0) {
      foundItem.quantity--;
    }
    
    return foundItem;
  } catch (error) {
    // If item is not found, create a default CartItem
    return {
      id,
      quantity: 0,
      price: 0
    };
  }
}

const orderSum = (ordersArray: CartItem[]): number => {
  const ordersCount = ordersArray.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  return ordersCount;
};

const PriceSum = (ordersArray: CartItem[]): number => {
  const totalPrice = ordersArray.reduce(
    (previousValue, currentValue) => previousValue + (currentValue.price * currentValue.quantity),
    0
  );

  return totalPrice;
};

export { manageQuantity, orderSum, PriceSum }; 