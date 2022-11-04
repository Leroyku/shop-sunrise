import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type sortItem = {
  category_name: string;
  first_sort_name: string;
  second_sort_name: string;
  first_sort_variants: string[];
  second_sort_variants: string[];
};

type sortedShop = {
  id: number;
  name: string;
  price: number;
  old_price: number;
  stock: number;
  images: string;
  first_sort: string;
  second_sort: string;
};

type sortedShopItems = {
  items: sortedShop[];
};

type checkedObj = {
  item: boolean;
};

interface ISort {
  allSort: sortItem[];
  currentSort: sortItem;
  sortArray: string[][];
  sortLength: number;
  currentItems: sortedShopItems;
  checked: checkedObj[][];
}

const initialState: ISort = {
  allSort: [
    {
      category_name: 'balls',
      first_sort_name: 'Производитель',
      second_sort_name: 'Вес шара',
      first_sort_variants: ['Azot Strike', 'BLS', 'ANGRY BB`s'],
      second_sort_variants: [
        '0,20',
        '0,25',
        '0,28',
        '0,30',
        '0,32',
        '0,36',
        '0,40',
        '0,43',
        '0,45',
      ],
    },
    {
      category_name: 'equipment',
      first_sort_name: 'Снаряжение',
      second_sort_name: 'Вид',
      first_sort_variants: ['Голова'],
      second_sort_variants: ['Очки', 'Маска'],
    },
    {
      category_name: 'tuning',
      first_sort_name: 'Re ghbdtn',
      second_sort_name: 're ghbdtn',
      first_sort_variants: ['Azot Strike', 'BLS', "ANGRY BB's"],
      second_sort_variants: [
        '0.20g',
        '0.25g',
        '0.28g',
        '0.30g',
        '0.36g',
        '0.40g',
        '0.43g',
        '0.45g',
      ],
    },
    {
      category_name: 'pyrotechnics',
      first_sort_name: 'Производитель',
      second_sort_name: 'Вид пиротехники',
      first_sort_variants: [
        'Страйк Арт',
        'БК',
        'Zeus',
        'Звезда',
        'A2Tech',
        'TagINN',
        'Azot Strike',
      ],
      second_sort_variants: ['Граната', 'Выстрел', 'Дымовая шашка'],
    },
    {
      category_name: 'gas',
      first_sort_name: 'Производитель',
      second_sort_name: 'Вид',
      first_sort_variants: ['KPS', 'Borner', 'FL airsoft'],
      second_sort_variants: ['Green Gas', 'CO2'],
    },
    {
      category_name: 'magazines',
      first_sort_name: 'Производитель',
      second_sort_name: 'Вид',
      first_sort_variants: ['Cyma', 'Arcturus'],
      second_sort_variants: ['Лоудер', 'Бункерный', 'Механический'],
    },
    {
      category_name: 'battery',
      first_sort_name: 'Электороника',
      second_sort_name: 'Вид электроники',
      first_sort_variants: ['АКБ', 'Заряд напряжения', 'Проводка'],
      second_sort_variants: ['АКБ 7.4v', 'АКБ 11.1v', 'Зарядник', 'Тестер', 'Переходник'],
    },
    {
      category_name: 'sparepart',
      first_sort_name: 'ytyerty',
      second_sort_name: 'tryyyert',
      first_sort_variants: ['Azot Strike', 'BLS', "ANGRY BB's"],
      second_sort_variants: [
        '0.20g',
        '0.25g',
        '0.28g',
        '0.30g',
        '0.36g',
        '0.40g',
        '0.43g',
        '0.45g',
      ],
    },
  ],
  currentSort: {
    category_name: '',
    first_sort_name: '',
    second_sort_name: '',
    first_sort_variants: [],
    second_sort_variants: [],
  },
  sortArray: [[], []],
  sortLength: 0,
  currentItems: {
    items: [],
  },
  checked: [[{ item: false }], [{ item: false }]],
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setCurrentSort(state, action) {
      state.allSort.map((item) => {
        if (item.category_name === action.payload.category) {
          state.currentSort = item;
        }
      });
    },
    sortChange(state, action) {
      const target = action.payload;

      if (target.checked) {
        const lowerCaseArray = state.currentSort.first_sort_variants.map((item) =>
          item.toLowerCase(),
        );

        if (lowerCaseArray.indexOf(target.label.toLowerCase()) != -1) {
          state.sortArray = [
            [...state.sortArray[0], target.label.toLowerCase()],
            state.sortArray[1],
          ];
        } else {
          state.sortArray = [
            state.sortArray[0],
            [...state.sortArray[1], target.label.toLowerCase()],
          ];
        }
        state.sortLength = state.sortLength + 1;
      }
      if (!target.checked) {
        const indexFirst = state.sortArray[0].indexOf(target.label.toLowerCase());
        const indexSecond = state.sortArray[1].indexOf(target.label.toLowerCase());

        if (indexFirst != -1) {
          state.sortArray[0].splice(indexFirst, 1);
        }

        if (indexSecond != -1) {
          state.sortArray[1].splice(indexSecond, 1);
        }
        state.sortLength = state.sortLength - 1;
      }
    },
    removeSort(state) {
      state.sortArray = [[], []];
      state.sortLength = 0;
    },
    setCurrentItems(
      state,
      action: PayloadAction<{
        res?: sortedShopItems;
        data?: sortedShopItems;
      }>,
    ) {
      if (action.payload.res) state.currentItems = action.payload.res;
      if (action.payload.data) state.currentItems = action.payload.data;
    },
    setSortArray(
      state,
      action: PayloadAction<{
        data: sortedShopItems;
        dataFull: sortedShopItems;
      }>,
    ) {
      if (state.sortLength > 0) {
        const newItems: sortedShopItems = { items: [] };
        action.payload.dataFull.items.map((item) => {
          let switchParam = 0;

          if (
            state.sortArray[0].indexOf(item.first_sort.toLowerCase()) != -1 ||
            state.sortArray[1].indexOf(item.second_sort.toLowerCase()) != -1
          )
            switchParam = 1;
          if (
            state.sortArray[0].indexOf(item.first_sort.toLowerCase()) != -1 &&
            state.sortArray[1].indexOf(item.second_sort.toLowerCase()) != -1
          )
            switchParam = 2;

          switch (switchParam) {
            case 1:
              if (state.sortArray[0].length > 0 && state.sortArray[1].length > 0) break;

              newItems.items.push(item);
              break;
            case 2:
              newItems.items.push(item);
              break;
          }
        });
        state.currentItems = newItems;

        return;
      }

      state.currentItems = action.payload.dataFull;
    },
    setChecked(state, action) {
      if (action.payload.i === 1)
        state.checked[0][action.payload.index].item = !state.checked[0][action.payload.index].item;
      if (action.payload.i === 2)
        state.checked[1][action.payload.index].item = !state.checked[1][action.payload.index].item;
    },
    removeChecked(state) {
      const newArr: checkedObj[][] = [[], []];
      state.currentSort.first_sort_variants.forEach(() => {
        newArr[0].push({ item: false });
      });
      state.currentSort.second_sort_variants.forEach(() => {
        newArr[1].push({ item: false });
      });
      state.checked = newArr;
    },
  },
});

export const {
  setCurrentSort,
  sortChange,
  removeSort,
  setSortArray,
  setCurrentItems,
  setChecked,
  removeChecked,
} = sortSlice.actions;

export default sortSlice.reducer;
