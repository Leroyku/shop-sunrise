import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IItemList = {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  updated: string;
};

interface SearchState {
  mobVersion: boolean;
  items: IItemList[];
  query: string;
}

const initialState: SearchState = {
  mobVersion: false,
  items: [],
  query: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    versionSwitcher(state, action: PayloadAction<{ hand?: boolean }>) {
      if (action.payload.hand) {
        state.mobVersion = false;
      }
      if (!action.payload.hand) {
        state.mobVersion = !state.mobVersion;
      }
    },
    setItemListAndQuery(state, action: PayloadAction<{ items?: IItemList[]; query?: string }>) {
      if (action.payload.items) {
        state.items = [];
        state.items = action.payload.items;
      }
      if (action.payload.query) {
        state.query = '';
        state.query = action.payload.query;
      }
    },
    clearItemListAndQuery(state) {
      state.items = [];
      state.query = '';
    },
  },
});

export const { versionSwitcher, setItemListAndQuery, clearItemListAndQuery } = searchSlice.actions;

export default searchSlice.reducer;
