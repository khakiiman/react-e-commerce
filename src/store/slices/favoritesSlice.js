import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const isProductFavorite = state.items.some(item => item.id === product.id);
      
      if (isProductFavorite) {
        state.items = state.items.filter(item => item.id !== product.id);
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0] || '',
          category: product.category
        });
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (state, productId) => 
  state.favorites.items.some(item => item.id === productId);

export default favoritesSlice.reducer; 