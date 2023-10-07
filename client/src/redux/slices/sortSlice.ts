import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentFilters = {
  filter_name: string;
  filter_variants: string[];
};

interface SortState {
  currentFilters: CurrentFilters[];
  currentSort: string;
  mobFiltres: boolean;
}

const initialState: SortState = {
  currentFilters: [],
  currentSort: 'price-asc',
  mobFiltres: false,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setCurrentFilters(state, action) {
      const currentFiltersArray = [];

      for (const key in action.payload) {
        if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
          const filterName = key;
          const filterVariants = action.payload[key];

          currentFiltersArray.push({ filter_name: filterName, filter_variants: filterVariants });
        }
      }

      state.currentFilters = currentFiltersArray;
    },
    setCurrentSort(state, action) {
      if (state.currentSort != action.payload) state.currentSort = action.payload;
    },
    setMobFiltres(state, action) {
      if (action.payload) state.mobFiltres = true;
      if (!action.payload) state.mobFiltres = false;
    },

    delFilters(state) {
      state.currentFilters = [];
    },
  },
});

export const { setCurrentFilters, delFilters, setCurrentSort, setMobFiltres } = sortSlice.actions;

export default sortSlice.reducer;
