import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import balls from '../../assets/img/catalog/balls.jpg';
import pyrotechnics from '../../assets/img/catalog/pyro.jpg';
import equipment from '../../assets/img/catalog/equip.jpg';
import magazines from '../../assets/img/catalog/magaz.jpg';
import battery from '../../assets/img/catalog/akb.jpg';
import protection from '../../assets/img/catalog/protec.jpg';
import sparepart from '../../assets/img/catalog/sparepart.jpg';
import tuning from '../../assets/img/catalog/tun.jpg';
import gas from '../../assets/img/catalog/gas.webp';

type catItem = {
  value: string;
  href: string;
  group: number;
  images: string;
};

export interface IProducts {
  id: number;
  name: string;
  price: number;
  old_price: number;
  stock: number;
  images: string;
  first_sort: string;
  second_sort: string;
}

interface ICategories {
  categories: catItem[];

  data: { items: IProducts[] };
}

const initialState: ICategories = {
  categories: [
    { value: 'Пиротехника', href: '/pyrotechnics', group: 2, images: pyrotechnics },
    { value: 'Шары', href: '/balls', group: 1, images: balls },
    { value: 'Газ', href: '/gas', group: 5, images: gas },
    { value: 'Внешний тюнинг', href: '/tuning', group: 10, images: tuning },
    { value: 'Снаряжение', href: '/equipment', group: 7, images: equipment },
    { value: 'Защита', href: '/protection', group: 9, images: protection },
    { value: 'Магазины и лоудеры', href: '/magazines', group: 6, images: magazines },
    { value: 'АКБ и электроника', href: '/battery', group: 3, images: battery },
    { value: 'Запчасти', href: '/sparepart', group: 11, images: sparepart },
  ],

  data: { items: [] },
};

export const categorySlice = createSlice({
  name: 'categoryFull',
  initialState,
  reducers: {
    setNewData(
      state,
      action: PayloadAction<{
        res: { items: IProducts[] };
      }>,
    ) {
      state.data.items = action.payload.res.items;
    },
    setData(
      state,
      action: PayloadAction<{
        res: { items: IProducts[] };
      }>,
    ) {
      state.data.items = [...state.data.items, ...action.payload.res.items];
    },
    removeData(state) {
      state.data.items = [];
    },
  },
});

export const { setData, setNewData, removeData } = categorySlice.actions;

export default categorySlice.reducer;
