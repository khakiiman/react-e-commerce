import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our data structures
interface Product {
  id: number;
  title: string;
  price: number;
  images?: string[];
  category: string;
}

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

// Create the context with a default value of undefined
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps): JSX.Element {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product): void => {
    setFavorites(prevFavorites => {
      const isProductFavorite = prevFavorites.some(fav => fav.id === product.id);
      
      if (isProductFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id);
      } else {
        return [...prevFavorites, { 
          id: product.id, 
          title: product.title,
          price: product.price,
          image: product.images?.[0] || '',
          category: product.category
        }];
      }
    });
  };

  const isFavorite = (productId: number): boolean => {
    return favorites.some(fav => fav.id === productId);
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