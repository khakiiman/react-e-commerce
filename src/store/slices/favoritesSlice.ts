import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FavoritesState, RootState } from '../../types/store';

interface FavoriteItem {
  id: number;
  title?: string;
  price?: number;
  image?: string;
  category?: string;
}

let initialItems: number[] = [];
if (typeof window !== 'undefined') {
  try {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      initialItems = parsedFavorites.map((fav: FavoriteItem) => fav.id);
    }
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
  }
}

const initialState: FavoritesState = {
  items: initialItems,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter(id => id !== productId);
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(productId);
      }
    },
    clearFavorites: state => {
      state.items = [];
    },
  },
});
export const { addToFavorites, removeFromFavorites, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;
export const selectFavorites = (state: RootState): number[] => state.favorites.items;
export const selectIsFavorite = (state: RootState, productId: number): boolean =>
  state.favorites.items.includes(productId);
export const selectFavoritesCount = (state: RootState): number => state.favorites.items.length;
export default favoritesSlice.reducer;
