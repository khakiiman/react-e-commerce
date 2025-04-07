import { createContext, ReactNode, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@/store';
import {
  selectFavorites,
  toggleFavorite as toggleFavoriteAction,
} from '@/store/slices/favoritesSlice';
import { Product } from '@/types/api';

interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps): JSX.Element {
  const dispatch = useDispatch();
  const favoriteIds = useAppSelector(selectFavorites);

  // Convert the favorite IDs to favorite items for backward compatibility
  const favorites: FavoriteItem[] = [];

  const toggleFavorite = (product: Product): void => {
    dispatch(toggleFavoriteAction(product.id));
  };

  const isFavorite = (productId: number): boolean => {
    return favoriteIds.includes(productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
