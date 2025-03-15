import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  isDrawerOpen: false,
  activePage: 'home',
  loading: {
    products: false,
    productDetail: false,
    checkout: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setDrawerState: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
  },
});

export const { 
  toggleDarkMode, 
  setDarkMode, 
  toggleDrawer, 
  setDrawerState, 
  setActivePage,
  setLoading 
} = uiSlice.actions;

export const selectDarkMode = (state) => state.ui.darkMode;
export const selectDrawerState = (state) => state.ui.isDrawerOpen;
export const selectActivePage = (state) => state.ui.activePage;
export const selectLoadingState = (state, key) => state.ui.loading[key];

export default uiSlice.reducer; 