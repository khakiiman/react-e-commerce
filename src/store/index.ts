import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Use a dynamic import approach to avoid immediate loading of non-TS files
// We'll replace these with proper TS imports as we convert each slice
import favoritesReducer from './slices/favoritesSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

const persistConfig: any = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'cart', 'auth'],
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cart: cartReducer,
  auth: authReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
// Type for useSelector
export type AppRootState = ReturnType<typeof store.getState>;