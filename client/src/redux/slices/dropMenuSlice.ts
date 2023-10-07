import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  headerMenu: false,
  categoryMenu: false,
  mobMenu: false,
};

export const dropMenuSlice = createSlice({
  name: 'dropMenu',
  initialState,
  reducers: {
    menuSwitcher(state) {
      state.mobMenu = !state.mobMenu;
    },
    switchActiveMenu(
      state,
      action: PayloadAction<{
        categoriesIsVisible?: boolean;
        mobMenuProp?: boolean;
      }>,
    ) {
      if (action.payload.categoriesIsVisible) {
        state.categoryMenu = !state.categoryMenu;
        state.headerMenu = false;
        state.mobMenu = false;
      }
    },
    categoriesSwitcher(state) {
      state.headerMenu = !state.headerMenu;
      state.categoryMenu = false;
    },
    disableCatalog(state) {
      state.categoryMenu = false;
    },
    disableMobMenu(state) {
      state.mobMenu = false;
    },
    disableMenu(state) {
      state.headerMenu = false;
      state.categoryMenu = false;
      state.mobMenu = false;
    },
  },
});

export const {
  switchActiveMenu,
  disableMenu,
  menuSwitcher,
  categoriesSwitcher,
  disableCatalog,
  disableMobMenu,
} = dropMenuSlice.actions;

export default dropMenuSlice.reducer;
