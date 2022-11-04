import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';

const { items, totalPrice } = getCartFromLS();

export type CartItem = {
  id: number;
  price: number;
  name: string;
  image: string;
  count: number;
};

interface ICart {
  totalPrice: number;
  items: CartItem[];
}

const initialState: ICart = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 1) findItem.count--;
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) state.totalPrice -= findItem.count * findItem.price;

      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
