import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  headerMenu: false,
  categoryMenu: false,
};

export const dropMenuSlice = createSlice({
  name: 'dropMenu',
  initialState,
  reducers: {
    switchActiveMenu(state, action) {
      if (action.payload.categoriesIsVisible) {
        state.categoryMenu = !state.categoryMenu;
        state.headerMenu = false;
      }
      if (!action.payload.categoriesIsVisible) {
        state.categoryMenu = false;
        state.headerMenu = !state.headerMenu;
      }
    },
    disableMenu(state) {
      state.headerMenu = false;
      state.categoryMenu = false;
    },
  },
});

export const { switchActiveMenu, disableMenu } = dropMenuSlice.actions;

export default dropMenuSlice.reducer;
