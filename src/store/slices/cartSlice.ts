import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddToCartPayload, CartItem, CartState, RootState } from '../../types/store';
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  checkout: false,
};
const recalculateTotals = (state: CartState): void => {
  state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity = 1 } = action.payload;
      if (product) {
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity,
            image: product.images?.[0],
          });
        }
      } else {
        const { id, title, price, image } = action.payload;
        if (id !== undefined && title && price !== undefined) {
          const existingItem = state.items.find(item => item.id === id);
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            state.items.push({
              id,
              title,
              price,
              quantity,
              image,
            });
          }
        }
      }
      recalculateTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      recalculateTotals(state);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
        recalculateTotals(state);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity -= 1;
        }
        recalculateTotals(state);
      }
    },
    setCheckout: (state, action: PayloadAction<boolean>) => {
      state.checkout = action.payload;
    },
    clearCart: state => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.checkout = false;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCheckout,
  clearCart,
} = cartSlice.actions;
export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;
export const selectCartTotalQuantity = (state: RootState): number => state.cart.totalQuantity;
export const selectCartTotalPrice = (state: RootState): number => state.cart.totalPrice;
export const selectCheckoutStatus = (state: RootState): boolean => state.cart.checkout;
export const selectIsInCart = (state: RootState, productId: number): boolean =>
  state.cart.items.some(item => item.id === productId);
export default cartSlice.reducer;
