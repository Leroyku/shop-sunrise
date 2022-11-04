import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import categoryFull from './slices/categorySlice';
import dropMenu from './slices/dropMenuSlice';
import sort from './slices/sortSlice';

export const store = configureStore({
  reducer: {
    cart,
    categoryFull,
    dropMenu,
    sort,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
