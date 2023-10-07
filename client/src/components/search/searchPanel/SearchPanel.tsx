import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../utils/hook';
import styles from './SearchPanel.module.scss';

import SearchItem from '../searchItem/SearchItem';
import { IItemList } from '../Search';
import {
  setItemListAndQuery,
  versionSwitcher,
  clearItemListAndQuery,
} from '../../../redux/slices/searchSlice';

interface ISearchPanel {
  itemList: IItemList[];
  setSearchPanel: (searchPanel: boolean) => void;
  collapsed: boolean;
  value: string;
}

const SearchPanel: React.FC<ISearchPanel> = ({ itemList, setSearchPanel, collapsed, value }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {itemList.length > 0 ? (
          itemList.map((item, index) => {
            if (index >= 5) return;
            return (
              <SearchItem
                value={value}
                collapsed={collapsed}
                setSearchPanel={setSearchPanel}
                key={item.id}
                item={item}
              />
            );
          })
        ) : (
          <div
            style={{
              margin: '0 5px 15px',
              display: 'flex',
              justifyContent: 'center',
              color: '#fb9118',
            }}>
            Ничего не найдено
          </div>
        )}
      </div>
      <Link
        onClick={() => {
          if (collapsed) dispatch(versionSwitcher({ hand: false }));
          setSearchPanel(false);
          dispatch(setItemListAndQuery({ items: (itemList = []), query: value }));
        }}
        to={`search/`}>
        <div className={styles.show}>Показать все результаты</div>
      </Link>
    </div>
  );
};

export default SearchPanel;
