import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, Toast, ToastPayload, UIState } from '../../types/store';
const initialState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  cartDrawerOpen: false,
  modalOpen: false,
  modalContent: null,
  toasts: [],
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCartDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.cartDrawerOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<React.ReactNode>) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: state => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    addToast: (state, action: PayloadAction<ToastPayload>) => {
      const { message, type, duration = 5000 } = action.payload;
      const id = Date.now().toString();
      state.toasts.push({
        id,
        message,
        type,
        duration,
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.toasts = state.toasts.filter(toast => toast.id !== id);
    },
  },
});
export const {
  toggleTheme,
  setSidebarOpen,
  setCartDrawerOpen,
  openModal,
  closeModal,
  addToast,
  removeToast,
} = uiSlice.actions;
export const selectTheme = (state: RootState): 'light' | 'dark' => state.ui.theme;
export const selectIsSidebarOpen = (state: RootState): boolean => state.ui.sidebarOpen;
export const selectIsCartDrawerOpen = (state: RootState): boolean => state.ui.cartDrawerOpen;
export const selectModalState = (
  state: RootState
): { open: boolean; content: React.ReactNode | null } => ({
  open: state.ui.modalOpen,
  content: state.ui.modalContent,
});
export const selectToasts = (state: RootState): Toast[] => state.ui.toasts;
export default uiSlice.reducer;
