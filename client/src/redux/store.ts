import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import categories from './slices/categorySlice';
import dropMenu from './slices/dropMenuSlice';
import sort from './slices/sortSlice';
import search from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    cart,
    categories,
    dropMenu,
    sort,
    search,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
