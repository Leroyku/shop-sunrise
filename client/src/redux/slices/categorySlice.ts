import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type categoriesItem = {
  category_name: string;
  category_link: string;
  category_photo: string;
};

export interface IProducts {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  categorylink: string;
  meta: string;
  updated: string;
}

interface ICategories {
  categories: categoriesItem[];
  data: IProducts[];
}

const initialState: ICategories = {
  categories: [],
  data: [],
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(
      state,
      action: PayloadAction<{
        categories: categoriesItem[];
      }>,
    ) {
      state.categories = [...action.payload.categories];
    },

    setData(state, action: PayloadAction<IProducts[]>) {
      state.data = [...action.payload];
    },
    removeData(state) {
      state.data = [];
    },
  },
});

export const { setData, removeData, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
