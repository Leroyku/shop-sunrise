import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';

const { items, promocodeRes, totalPrice } = getCartFromLS();

export type CartItem = {
  id: number | string;
  price: number;
  name: string;
  image: string[];
  count: number;
  stock: number;
  category: string;
};
type resPromType = {
  id: number;
  promocode: string;
  stock: string;
  value: string;
};

interface ICart {
  totalPrice: number;
  promocodeRes: { proms: resPromType[] };
  items: CartItem[];
}

const initialState: ICart = {
  totalPrice,
  items,
  promocodeRes,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        if (findItem.count < findItem.stock) {
          findItem.count++;
        }
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

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
    addPromocode(state, action: PayloadAction<{ prom: { proms: resPromType[] } }>) {
      state.promocodeRes = action.payload.prom;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    clearPromocode(state) {
      state.promocodeRes = { proms: [] };
    },
  },
});

export const { addItem, minusItem, removeItem, addPromocode, clearItems, clearPromocode } =
  cartSlice.actions;

export default cartSlice.reducer;
